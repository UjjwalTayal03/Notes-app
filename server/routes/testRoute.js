import express from "express"
import authMiddleware from "../middleware/authorization.js"

const router = express.Router()

router.get("/protected",authMiddleware, (req, res) => {
    res.status(201).json({
        message: "You are allowed",
        user: req.user
    })
})

export default router