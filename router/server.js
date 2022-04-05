const express=require("express");
const router=new express.Router();

router.get("/home",(req,res)=>{
    res.send("this is a server page")
    let date = Date.now()
    console.log(date)
});

module.exports=router;
