const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { authMiddleware } = require("../middleware");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

dotenv.config();
const router = express.Router();

const prisma = new PrismaClient();

const signupBody = zod.object({
  name: zod.string().min(3),
  phone: zod.string().min(10).max(10),
  email: zod
    .string()
    .email()
    .min(3)
    .max(30)
    .transform((val) => val.toLowerCase()),
  password: zod.string().min(6),
});

router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Cannot Parse Request Body",
    });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: req.body.email }, { phone: req.body.phone }],
      },
    });
    if (existingUser) {
      return res.status(411).json({
        message: "Email / Phone Number Already Taken",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
  const hashedPassword = await bcrypt
    .hash(req.body.password, 10)
    .catch((err) => {
      console.log(err);
    });
  const dbUser = await prisma.user
    .create({
      data: {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        createdAt : new Date(),
      },
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something Went Wrong",
      });
    });
  const userId = dbUser.id;
  /// ----- Create new account ------

  await prisma.account
    .create({
      data: {
        userId: userId,
        name: "Wallet",
        balance: 1 + Math.random() * 10000,
      },
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Something Went Wrong",
      });
    });

  try {
    const token = jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET,{
        expiresIn: "1h",
      }
    );

    res.json({
      message: "User created successfully",
      token: token,
    });
  } catch {
    (err) => {
      return res.status(500).json({
        message: "Something Went Wrong",
      });
    };
  }
});

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Please enter the correct password",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn : "1h"
      }
    );

    return res.json({
      token: token,
    });
  } catch (err) {
    console.error("Error during signin:", err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

let otpSave = 0;

router.post("/get-otp", async (req, res) => {
  const phone = req.body.number;
  try {
    const user = await prisma.user.findUnique({
      where: {
        phone: phone,
      },
    });
    if (!user) {
      return res.json({
        message: "No user found with this phone number",
      });
    }
  } catch {
    () => {
      res.json({
        message: "Some Went Wrong",
      });
    };
  }
  const otp = Math.round(Math.random() * (9999 - 1112) + 1112);
  try {
    await twilio.messages.create({
      body: `${otp} is your One Time Password(OTP) for signin at PayHere. Don't share with anyone.`,
      from: process.env.TWILIO_NUMBER,
      to: "+91" + phone,
    });

    if (otp) {
      otpSave = otp;
      res.json({
        message: "OTP sent successfully",
      });
    }
  } catch {
    (err) => {
      res.json({
        message: "Error during signin via otp",
        err,
      });
    };
  }
});

router.post("/signin-via-otp", async (req, res) => {
  const otp = req.body.otp;
  const phone = req.body.phone;
  if (otpSave == otp) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          phone: phone,
        },
      });
      if (user) {
        const token = jwt.sign({
          userId : user.id
        }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.json({
          message: "Signin via otp successful",
          token,
        });
      }
      else {
        return res.json({
          message: "User not found",
        })
      }
    } catch {
      () => {
        res.json({
          message: "Error while signin via otp",
        });
      };
    }
  } else {
    return res.json({
      message: "Please enter a valid OTP",
    })
  }
});
router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const normalizedFilter = filter.trim().toLowerCase();

  try {
    const relatedUser = await prisma.relationship.findMany({
      where: {
        userId: req.userId,
      },
      include: {
        relatedUser: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
    const users = relatedUser.map((relation) => {
      return ({
        type : relation.type,
        user: relation.relatedUser
      })
    });
    if (users.length > 0) {
      const filteredUsers = users.filter((user) => {
        if (
          user.user.name.toLowerCase().includes(normalizedFilter) ||
          user.user.phone.includes(normalizedFilter)
        ) {
          return true;
        }
      });

      if (filteredUsers.length > 0) {
        res.json({
          users: filteredUsers,
        });
      } else {
        return res.json({
          users: filteredUsers,
        });
      }
    } else {
      return res.json({
        users: [],
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  const user = await prisma.user
    .findUnique({
      where: {
        id: req.userId,
      },
    })
    .catch((err) => {
      res.json({ message: "Something Went Wrong" });
    });
  if (user) {
    res.json({
      email: user.email,
      name: user.name,
      phone: user.phone,
    });
  }
});

const updateBody = zod.object({
  password: zod.string().optional(),
  name: zod.string().optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  const hashedPassword = await bcrypt
    .hash(req.body.password, 10)
    .catch((err) => {
      console.log(err);
    });
  if (hashedPassword) {
    await prisma.user
      .update({
        where: {
          id: req.userId,
        },
        data: {
          password: hashedPassword,
          name: req.body.name,
        },
      })
      .catch((err) => {
        res.json({
          message: "Something Went Wrong",
        });
      });
  }

  res.json({
    message: "Updated successfully",
  });
});

router.put("/update-relationship-type", authMiddleware, async (req, res) => {
  const { recipientId, newType } = req.body;

  try {
    const relationship = await prisma.relationship.updateMany({
      where: {
        userId: req.userId,
        relatedUserId: recipientId,
      },
      data: {
        type: newType,
      },
    });

    if (relationship.count === 0) {
      return res.status(404).json({ message: "Relationship not found" });
    }

    res.status(200).json({ message: "Relationship type updated successfully" });
  } catch (err) {
    console.error("Error updating relationship:", err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

router.post("/search-by-phone", authMiddleware, async (req, res) => {
  const phone = req.body.phone;
  try {
    const user = await prisma.user.findUnique({
      where : {
        phone : phone
      },
    })

    if(user) {
      return res.json({
        id: user.id,
        name: user.name,
      });
    } else {
      return res.json({
        message: "No users found"
      })
    }
  } catch {() => {
    res.json({
      message : "Error while fecthing user"
    })
  }}
})

router.post("/users-by-category", authMiddleware, async (req, res) => {
  const category = req.body.category;
  try {
    const users = await prisma.relationship.findMany({
      where: {
        userId: req.userId,
        type : category
      },
      include : {
        relatedUser : {
          select : {
            name : true,
            email: true,
            phone: true,
          }
        }
      }
    })

    if(users.length > 0){
      return res.json({
        users : users
      })
    } else {
      return res.status(404).json({
        messsage : "No user found"
      })
    }
  } catch {() => {
    res.status(403).json({
      message : "Error while fetching user..."
    })
  }}
})

router.get("/category-count", authMiddleware, async (req, res) => {
  try {
    const users = await prisma.relationship.findMany({
      where: {
        userId : req.userId
      },
      include : {
        relatedUser : {
          select : {
            name :true
          }
        }
      }
    })
    if(users.length > 0){
      const groupedUsers = users.reduce((category, user) => {
        const type = user.type;
        if(!category[type]){
          category[type] = []
        }
        category[type].push(user.relatedUser.name)
        return category
      }, {})
      return res.json(groupedUsers)
    }else {
      return res.json({
        message : "No users found"
      })
    }
  } catch{() => {
    res.status(403).json({
      message : "Error while fecthing users"
    })
  }}
})

module.exports = router;
