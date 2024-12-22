const express = require("express");
const { authMiddleware } = require("../middleware");
const zod = require("zod");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await prisma.account.findUnique({
    where: {
      userId: req.userId,
    },
  });

  res.json({
    balance: account.balance,
  });
});

const transferSchema = zod.object({
  recipientId: zod.string(),
  amount: zod.number().positive(),
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const { success, data, error } = transferSchema.safeParse(req.body);

  if (!success) {
    return res
      .status(411)
      .json({ message: "Invalid input", error: error.errors });
  }

  const { recipientId, amount } = data;

  try {
    const senderAccount = await prisma.account.findUnique({
      where: {
        userId: req.userId,
      },
    });
    const recipientAccount = await prisma.account.findUnique({
      where: { userId: recipientId },
    });

    if (!senderAccount || !recipientAccount) {
      return res
        .status(404)
        .json({ message: "Sender or recipient account not found" });
    }

    if (senderAccount.balance < amount) {
      return res.status(403).json({ message: "Insufficient balance" });
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.account.update({
        where: { userId: req.userId },
        data: { balance: senderAccount.balance - amount },
      });

      await prisma.account.update({
        where: { userId: recipientId },
        data: { balance: recipientAccount.balance + amount },
      });

      await prisma.transaction.create({
        data: {
          amount: amount.toString(),
          status: "transferred",
          billingAddress: "N/A",
          accountId: recipientAccount.id,
          userId: req.userId,
          createdAt: new Date(),
        },
      });

      await prisma.transaction.create({
        data: {
          amount: amount.toString(),
          status: "received",
          billingAddress: "N/A",
          accountId: senderAccount.id,
          userId: recipientId,
          createdAt : new Date(),
        },
      });

      const receiver = await prisma.user.findUnique({
        where: { id: recipientId },
        select: { category: true },
      });

      const sender = await prisma.user.findUnique({
        where: { id: req.userId },
        select: { category: true },
      });

      if (!receiver || !sender) {
        return res.status(404).json({ message: "Sender/Receiver not found" });
      }

      const existingRelation1 = await prisma.relationship.findFirst({
        where: {
          userId: req.userId,
          relatedUserId: recipientId,
        },
      });

      if (!existingRelation1) {
        await prisma.relationship.create({
          data: {
            userId: req.userId,
            relatedUserId: recipientId,
            type: receiver.category,
            createdAt: new Date(),
          },
        });
      }

      const existingRelation2 = await prisma.relationship.findFirst({
        where: {
          userId: recipientId,
          relatedUserId: req.userId,
        },
      });

      if (!existingRelation2) {
        await prisma.relationship.create({
          data: {
            userId: recipientId,
            relatedUserId: req.userId,
            type: sender.category,
            createdAt: new Date(),
          },
        });
      }
    });

    res.status(200).json({ message: "Transfer successful" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

router.get("/transaction-details", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: userId,
    },
    include: {
      account : {
        select:{ 
          user : {
            select: { 
              name :true,
              phone : true,
              relationships : {
                select: {
                  type : true
                }
              }
            }
          }
        }
      }
    }
  });
  res.json(transactions);
});
module.exports = router;
