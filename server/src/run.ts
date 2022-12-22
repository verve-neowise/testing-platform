import { Router } from 'express'
import { findTask } from './services/tasks.service'
import { findCases } from './services/cases.service'
import { testCode } from './eval/eval'
import { findUserByToken } from './services/user.service'
import { createSolution } from './services/solutions.service'
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

router.post('/confirm', async (req, res) => {

    

    const runParams: Run = req.body

    console.log('confirm:', runParams);

    const task = (await findTask(runParams.taskId))!
    const cases = await findCases(runParams.taskId)

    const result = testCode(runParams.code, cases)

    const allPaseed = Array.isArray(result) && result.every(result => result.status == 'success')

    if (Array.isArray(result)) {
        const token = req.header('Authorization')!

        const user = await findUserByToken(token)
    
        if (user) {
            if (allPaseed) {
                await createSolution(runParams.code, task.id, user.id)
            }
        }
        else {
            return res.status(401).send({
                message: "User not found"
            })
        }
    }


    console.log('passed:', allPaseed);

    res.json({
        message: 'Test run',
        allPaseed,
        result
    })
})

export default router