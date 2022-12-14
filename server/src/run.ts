import { Router } from 'express'
import { findTask } from './services/tasks.service'
import { findCases } from './services/cases.service'
import { testCode } from './eval/eval'
const router = Router()

export type Run = {
    code: string,
    taskId: number
}

router.post('/run', async (req, res) => {
    const runParams: Run = req.body

    const task = await findTask(runParams.taskId)
    const cases = await findCases(runParams.taskId)

    const result = testCode(runParams.code, cases)

    res.json({
        message: 'Test run',
        result
    })
})

export default router