import { Lecture } from '@prisma/client'
import { Router } from 'express'
import { createLecture, findLectures } from './services/lectures.service'

const router = Router()

router.get('/lectures', async (req, res) => {
    const lectures: Lecture[] = await findLectures() 

    res.json({
        message: 'All Lectures',
        lectures
    })
})

router.post('/lectures', async (req, res) => {
    const { name, content } = req.body

    const lecture: Lecture = await createLecture({ name, content })

    res.json({
        message: "Lecture created",
        lecture
    })
})

export default router