import express from "express"
import authMiddleware from "../middleware/authorization.js"
import Notes from "../models/notesModel.js"

const router = express.Router()

router.post("/", authMiddleware, async (req,res) => {
    try {
        const {title, content, tags} = req.body

        if(!title)
            return res.status(400).json({message: "Insufficient info"})

        const Note = await Notes.create({
            title,
            content,
            tags,
            user: req.user.id
        })

        res.status(201).json(Note)

    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.get("/", authMiddleware, async (req, res) => {
  try {
    const search = req.query.search;

    let query = { user: req.user.id };

    if (search) {
      query = {
        user: req.user.id,
        title: { $regex: search, $options: "i" }
      };
    }

    const notes = await Notes.find(query);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", authMiddleware, async (req,res) => {
    try {

        const { title, content, tags } = req.body;

        const note = await Notes.findOneAndUpdate(
            {user: req.user.id, _id: req.params.id},
            { title, content, tags },
            {new: true}
        )

        if(!note)
            return res.status(404).json({message: "Note not found"})

        res.json(note)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.delete("/:id", authMiddleware, async (req,res) => {
    try {
        const note = await Notes.findOneAndDelete({
            user: req.user.id, _id: req.params.id
        })

        if(!note)
            return res.status(404).json({message: "Note not found"})

        res.json({message: "Note deleted"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

export default router