const express = require('express')
const cors = require('cors')
const mainRouter = require('./routes/mainRoutes')

const app = express()
//This should in the above of mainRouter
app.use(cors());
app.use(express.json())
app.use("/api/v1", mainRouter);

const port = 3000 || process.env.PORT
app.listen(port, ()=>{
    console.log("Server started on port", port);
})