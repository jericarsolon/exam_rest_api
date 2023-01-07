import express from 'express'
import { getSubject, getSubjects, addSubject, updateSubject, deleteSubject } from '../controllers/subjects.js' 
import { verifyToken } from '../middleware/auth.js'

const router = express.Router({mergeParams: true})

router.get('/', verifyToken, getSubjects)
router.get('/:id', verifyToken, getSubject)
router.post('/', verifyToken, addSubject)
router.put('/:id', verifyToken, updateSubject)
router.delete('/:id', verifyToken, deleteSubject)

export default router