const express = require('express');
const router = express.Router();
const user = require('../models/User');

router.post('/signup', async (req, res) =>{
    try{
        const {username , email , password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                message:"please fill all the fields"
            });
        }
        const existingUser = await user.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"user already exists"
            });
        }

      const newUser = await new User.create({
        username,email,password
      });
      const token = jwt.sign({
        id:newUser._id,
        username:newUser.username,
        email:newUser.email
      } ,
      process.env.JWT_SECRET,
      {expiresIn:"1hr"}
      );
      return res.status(201).json({
        message:"user created successfully",
        user:newUser,
        token:token
      });
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({
            message:"internal server error"
        });
    }
router.post('/Signin', async (req, res) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"please fill all the fields"
            })
        }
        const existingUser = await user.findOne({email});
        if(!existingUser){
            return res.status(400).json({
                message:"user not found please sign up"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        
        if(!isPasswordValid){
            return res.status(400).json({
                message:"invalid credentials"
            })
        }

        const token = jwt.sign({
            id:existingUser._id,
            username:existingUser.username,
            email:existingUser.email
        },
        process.env.JWT_SECRET,
        {expiresIn:"1hr"}
    );
    res.status(200).json({
        message:"user signed in successfully"
    })

    }
     catch(error){
        console.error("Error during signin:",error);
        return res.status(500).json({
            message:"internal server error"
        })
     }
    });
    module.exports = router;
});