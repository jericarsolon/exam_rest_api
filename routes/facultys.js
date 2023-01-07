import express from 'express'
import { getFaculty, getFacultys, addFaculty, updateFaculty, deleteFaculty } from '../controllers/facultys.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router({mergeParams: true})

router.get('/', verifyToken, getFacultys)
router.get('/:id', verifyToken, getFaculty)
router.post('/', verifyToken, addFaculty)
router.put('/:id', verifyToken, updateFaculty)
router.delete('/:id', verifyToken, deleteFaculty)

export default router