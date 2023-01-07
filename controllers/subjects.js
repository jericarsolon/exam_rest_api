import Faculty from "../models/Faculty.js"

export const getSubjects = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.facultyId)
        const { year, semester } = req.query

        if (year) {
            faculty.subjects = faculty.subjects.filter((item) => item.year == year)
        }
        if (semester) {
            faculty.subjects = faculty.subjects.filter((item) => item.semester == semester)
        }

        if (faculty.subjects.length !== 0)
            res.status(200).json(faculty.subjects)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getSubject = async (req, res) => {
    try {
        const {facultyId, id } = req.params
        const faculty = await Faculty.findById(facultyId)
        const subject = faculty.subjects.id(id)
        if (subject)
            res.status(200).json(subject)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const addSubject = async (req, res) => {
    try {
        const newSubject = req.body
        const faculty = await Faculty.findById(req.params.facultyId)
        faculty.subjects.push(newSubject)
        await faculty.save()
        const idNewSubject = faculty.subjects[faculty.subjects.length-1]._id
        res.status(201).json({ id: idNewSubject })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteSubject = async (req, res) => {
    try {
        const {facultyId, id } = req.params
        const faculty = await Faculty.findById(facultyId)
        faculty.subjects.id(id).remove();
        await faculty.save()
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

export const updateSubject = async (req, res) => {
    try {
        const {facultyId, id } = req.params
        const faculty = await Faculty.findById(facultyId)

        const {department_code, course_subject, semester, year, lectureHours } = req.body
        faculty.subjects.id(id).department_code = department_code
        faculty.subjects.id(id).course_subject = course_subject
        faculty.subjects.id(id).semester = semester
        faculty.subjects.id(id).year = year
        faculty.subjects.id(id).lectureHours = lectureHours
       
        await faculty.save()
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}