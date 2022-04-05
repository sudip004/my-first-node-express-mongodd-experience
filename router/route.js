const express = require("express");
const router = new express.Router();
require("../src/mongo")
const User = require("../module/Schema");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


// async method

router.post("/post", async (req, res) => {

    const { name, email, password } = req.body;


    if (!name || !email || !password) {
        return res.json({ error: "please fill all" })
    }

    try {

        const userExits = await User.findOne({ email: email })
        if (userExits) {
            return res.json({ message: "user already exits" })
        }


        const user = new User({ name, email, password });
        await user.save();
        res.json({ message: "successfully saved" })
    } catch (error) {
        console.log("this is an error")
    }

})

// user when singin from
router.post("/singin", async (req, res) => {
    try {
        let token;
        const { name, email, password } = req.body;

        if (!email || !password) {
            return res.json({ message: "please fill full" })
        }

        const userlogin = await User.findOne({ email: email })

        if (userlogin) {
            const userlog = await bcrypt.compare(password, userlogin.password)
            token = await userlogin.generateAuthToken()
           //cookie
           res.cookie("test",token,{
               expires:new Date(date.now())
           })

            if (!userlog) {
                res.json({ message: "user login successfully" })
            }
            else {
                res.json({ message: "Invalid carincitial" })
            }
        }
        else {
            res.json({ message: "Invalid cradiantial" })
        }

        // if(userlogin){

        //        res.json({message:"user login successfully"})
        //    }
        //    else{
        //        res.json({message:"first you can singup and then singin"})
        //    }

        // using promises
        // .then((find)=>{
        //     if(find){
        //         return res.json({message:"user login successfully"})
        //     }
        // })

    } catch (error) {
        console.log("error")
    }
})

router.get("/get", (req, res) => {
    console.log("hellow")
    res.send("hellow this is route page")
})



module.exports = router;



//using promises

// const { name, email, password } = req.body;

// // console.log(name);
// //  res.json({massage: req.body})
// if (!name || !email || !password) {
//     return res.json({ error: "please fill all" })
// }
// User.findOne({ email: email })
//     .then((userExits) => {
//         if (userExits) {
//             return res.json({ error: "user exits" })
//         }
//     })

//   const user = new User({ name, email, password });
//   user.save().then(() => {
//     res.json({ message: "user registered successfuly" })
//   }).catch((err) => {
//     res.json({ message: "this is user" })
// }).catch(err=>{console.log(err)
//      })

