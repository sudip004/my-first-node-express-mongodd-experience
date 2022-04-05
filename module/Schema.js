const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
})



// hasing password ata akta pre function call korbe jata akta midleware ar moto kaj kobe
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hash(this.password, 12);
    }
    next();

})

//we are generating token
userSchema.methods.generateAuthToken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id }, "hiamisudipbasak")
        this.tokens = this.tokens.concat({ token: token })
        // console.log(this.token)
        // console.log(token)
         console.log(this.tokens)
        // console.log(this._id)
        await token.save()
         console.log(token)

    } catch (error) {
        console.log("this an error")
    }
}


const User = mongoose.model("USER", userSchema);
module.exports = User;