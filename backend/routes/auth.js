const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const fetchuser=require('../middleware/fetchuser')
const JWT_SECRET='sravan'

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email exists" })
        }
        const salt=await bcrypt.genSalt(10);
        const secpass=await bcrypt.hash(req.body.password,salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass
        })
        const data={
            user:{
                id:user.id
            }
        }
        const auth_token=jwt.sign(data,JWT_SECRET)
        res.json({auth_token})
        // .then(user=>res.json(user))
        // .catch(err=>{console.log(err)
        // res.json({error:"Please enter a unique value",message:err.message})})

        //    const user=User(req.body)
        //    user.save()
        //    res.send(req.body)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("External Server Error")
    }

})

//login

router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }).exists(),
], async (req, res) => {
    const errors=validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {email,password}=req.body
    try {
        let user=await User.findOne({email})
        if(!user){
            return res.status(400).json({errors:"Wrong Credentials"})
        }

        const passwordCompare=await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            return res.status(400).json({errors:"Wrong Credentials"})
        }
        const payload={
            user:{
                id:user.id
            }
        }
        const auth_token=jwt.sign(payload,JWT_SECRET)
        res.json({auth_token})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("External Server Error")
    }
})

//get login user details
router.post('/getuser',fetchuser, async (req, res) => { 
try {
    userId=req.user.id
    const user=await User.findById(userId).select("-password")
    res.send(user)
} catch (error) {
    console.log(error.message)
    res.status(500).send("External Server Error")
}
})

module.exports = router