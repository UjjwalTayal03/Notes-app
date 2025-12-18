import express from "express"
import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        const {name, email, password} = req.body

        const existing = await User.findOne({email})

        if(existing)
            return res.status(400).json({message: "User already exists"})

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: hashed
        })

        res.status(201).json({message: "User created successfully"})
    } catch (err) {
        res.status(500).json({message: "Server error"})
    }
})

router.post("/login", async (req,res) => {
    try {
        const {email, password} = req.body

        const existing = await User.findOne({email})

        if(!existing)
            return res.status(400).json({message: "User doesn't exist"})

        const isMatch = await bcrypt.compare(password, existing.password)
        if(!isMatch)
            return res.status(400).json({message: "Invalid credentials"})

        const token = jwt.sign({
            id: existing._id,
        },
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    )
    res.json({token})

    } catch (err) {
        res.status(500).json({message: "Server error"})
    }
})

export default router