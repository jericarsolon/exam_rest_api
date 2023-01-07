import mongoose from 'mongoose'

const TeacherSchema = new mongoose.Schema(
    {
        department_code: { type: String, required: true , unique: true},
        fullName: { type: String, required: true },
        years: { type: Number, required: true },
        age: { type: Number, required: true } 
    }, 
    { timestamps: true }
)

const Teacher = mongoose.model('Teacher', TeacherSchema)
export default Teacher