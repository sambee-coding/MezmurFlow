const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/me",verifyToken,(req,res) =>{
    res.status(200).json({
        message:"user profile"
    })
});
module.exports = router;