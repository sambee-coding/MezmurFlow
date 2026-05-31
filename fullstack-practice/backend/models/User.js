const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({

    username:{
        type:"string",
        required:true,
        unique:true
    },
    email:{
        type:"string",
        required:true,
        unique:true
    },
    password:{
        type:"string",
        required:true
    }},{
        Timestamps:true
    }
);

userSchema.pre("save" , async function(next){
    if(!this.isModified("password"))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // this.password = await bcrypt.hash(this.password, 1o);
    next();
});

module.exports = mongoose.model("user" , userSchema);