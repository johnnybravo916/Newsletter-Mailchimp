const express = require("express");
const https = require("https")

const app = express();

app.get("/",(req, res)=>{
  res.send("up")
})

app.listen(3000, ()=>{
  console.log("server is running")
})