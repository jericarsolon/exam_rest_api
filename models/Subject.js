import mongoose from 'mongoose'

export const SubjectSchema = new mongoose.Schema(
    {
        department_code: { type: String, required: true, unique: true },
        course_subject: { type: String, required: true },
        semester: { type: Number, required: true },
        year: { type: Number, required: true },
        lectureHours: { type: Number, required: true }
    }, 
    { timestamps: true }
)

const Subject = mongoose.model('Subject', SubjectSchema)
export default Subject