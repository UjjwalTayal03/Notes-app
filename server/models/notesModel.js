import mongoose, { Schema } from "mongoose";
import User from "./userModel.js";

const notesSchema = new mongoose.Schema({
    title: {type: String,
        required: true
    },
    content: {type: String, default: ""},
    tags: {type: [String],default:[], trim:true, lowercase: true},
    user: {type: Schema.Types.ObjectId, ref: "User", required: true}
},
{timestamps: true})

const Notes = mongoose.model("Notes", notesSchema)

export default Notes