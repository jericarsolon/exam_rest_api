import Faculty from '../models/Faculty.js'

export const getFacultys = async (req, res) => {
    try {
        const facultys = await Faculty
            .find({ teacherId: req.params.teacherId })
            .populate('teacherId')
            .select('section year teacherId')
        if (facultys.length !== 0)
            res.status(200).json(facultys)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getFaculty = async (req, res) => {
    try {
        const { id } = req.params
        const faculty = await Faculty.findById(id)
            .populate('teacherId')
            .select('section year teacherId')
        if (faculty)
            res.status(200).json(faculty)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const addFaculty = async (req, res) => {
    try {
        const { section, year } = req.body
        const teacherId = req.params.teacherId
        const newFaculty = await Faculty.create({
            section,
            year,
            teacherId
        })
        const savedFaculty = await newFaculty.save()
        res.status(201).json({ id: savedFaculty._id })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteFaculty = async (req, res) => {
    try {
        await Faculty.deleteOne({ 
            teacherId: req.params.teacherId, 
            _id: req.params.id 
        })
        res.status(204).send()
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const updateFaculty = async (req, res) => {
    try {
        const filter = { 
            teacherId: req.params.teacherId, 
            _id: req.params.id 
        }
        const { section, year } = req.body
        const update = { 
            section: section, 
            year: year
        }

        await Faculty.findOneAndUpdate(filter, update)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}