import Teacher from "../models/Teacher.js"

export const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find()
        if (teachers.length !== 0)
            res.status(200).json(teachers)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getTeacher = async (req, res) => {
    try {
        const { id } = req.params
        const teacher = await Teacher.findById(id)
        if (teacher)
            res.status(200).json(teacher)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const addTeacher = async (req, res) => {
    try {
        const { department_code, fullName, years, age } = req.body
        const newTeacher = await Teacher.create({
            department_code,
            fullName,
            years,
            age
        })
        const savedTeacher = await newTeacher.save()
        res.status(201).json({ id: savedTeacher._id })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteTeacher = async (req, res) => {
    try {
        await Teacher.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

export const updateTeacher = async (req, res) => {
    try {
        const filter = { _id: req.params.id }
        const { department_code, fullName, years, age } = req.body
        const update = { 
            department_code: department_code, 
            fullName: fullName, 
            years: years,
            age: age 
        }

        await Teacher.findOneAndUpdate(filter, update)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}