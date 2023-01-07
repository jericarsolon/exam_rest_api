import mongoose from 'mongoose'
import { SubjectSchema } from './Subject.js'

const FacultySchema = new mongoose.Schema(
    {
        section: { type: String, required: true, unique: true },
        year: { type: Number, required: true },
        teacherId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Teacher', 
            required: true 
        },
        subjects: [SubjectSchema]
    }, 
    { timestamps: true }
)

const Faculty = mongoose.model('Faculty', FacultySchema)
export default Faculty