import { Router } from "express";
import { Case, createCases, findCases } from "./services/cases.service";
import { allTasks, createTask, findTask, Task } from "./services/tasks.service";

const router = Router()

router.post('/tasks', async (req, res) => {
    console.log(req.body);
    
    const task: Task = req.body.task
    const cases: Case[] = req.body.cases

    const newTask = await createTask(task)
    const newCases = await createCases(cases, newTask.id)

    res.json({
        message: 'Task created',
        task: newTask,
        cases: newCases
    })
})

router.get('/tasks', async (req, res) => {

    const tasks = await allTasks()

    res.json({
        message: 'All tasks',
        tasks
    })
})


router.get('/tasks/:id', async (req, res) => {

    const id = +req.params.id
    const task = await findTask(id)
    const cases = await findCases(id)

    res.json({
        message: 'Retrive task',
        task,
        cases
    })
})


export default router