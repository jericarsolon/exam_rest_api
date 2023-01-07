import express from 'express'
import { getTeacher, getTeachers, addTeacher, updateTeacher, deleteTeacher } from '../controllers/teachers.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, getTeachers)
router.get('/:id', verifyToken, getTeacher)
router.post('/', verifyToken, addTeacher)
router.put('/:id', verifyToken, updateTeacher)
router.delete('/:id', verifyToken, deleteTeacher)

export default router
