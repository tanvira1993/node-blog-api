const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const cors = require("cors");
const PORT = process.env.PORT || 5000
const {MONGODB} = require('./config/config')
const blogRouter = require("./routes/routes");

mongoose.connect(MONGODB,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log("conneted to DB")
})
mongoose.connection.on('error',(error)=>{
    console.log("error connection",error)
})

app.use(cors());
app.use(express.json())
app.get("/", (req, res) => {
    res.json({
      key: "I am value"
    });    
  });
app.use("/api", blogRouter);

app.listen(PORT,()=>{
    console.log("server running on",PORT)
})

