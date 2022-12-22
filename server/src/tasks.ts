import { Router } from "express";
import { Case, createCases, deleteCases, findCases } from "./services/cases.service";
import { findLecture } from "./services/lectures.service";
import { findSolutions } from "./services/solutions.service";
import { allTasks, createTask, deleteTask, findTask, Task } from "./services/tasks.service";
import { findUserByToken } from "./services/user.service";

const router = Router()

router.post('/lectures/:lectureId/tasks', async (req, res) => {
    console.log(req.body);

    const lectureId = +req.params.lectureId
    
    const lecture = await findLecture(lectureId)

    console.log(`create lecture ${lectureId}`);

    if (!lecture) {
        return res.status(404).json({
            message: "Lecture " + lectureId + " not found"
        })
    }

    const task: Task = req.body.task

    const cases: Case[] = req.body.cases

    const newTask = await createTask(lectureId, task)
    const newCases = await createCases(cases, newTask.id)

    res.json({
        message: 'Task created',
        task: newTask,
        cases: newCases
    })
})

router.get('/lectures/:lectureId/tasks', async (req, res) => {

    const lectureId = +req.params.lectureId

    const lecture = await findLecture(lectureId)

    console.log(`get lecture tasks ${lectureId}`);

    if (!lecture) {
        return res.status(404).json({
            message: "Lecture " + lectureId + " not found"
        })
    }
    
    let tasks = await allTasks(lectureId)

    const token = req.header('authorization')

    if (token) {
        const user = await findUserByToken(token)

        if (user) {
            const solutions = await findSolutions(user!.id)
            const mappedTasks: Task[] = tasks.map(task => (
                {
                    id: task.id,
                    name: task.name,
                    content: task.content,
                    description: task.description,
                    lectureId: task.lectureId,
                    isComplete: solutions.find(solution => solution.taskId == task.id) != undefined,
                    solution: solutions.find(solution => solution.taskId == task.id)?.solution
                }
            ))
            return res.json({
                message: 'All tasks',
                tasks: mappedTasks
            })
        }
    }

    res.json({
        message: 'All tasks',
        tasks: tasks.map(task => (
            {
                id: task.id,
                name: task.name,
                content: task.content,
                description: task.description,
                isComplete: false
            }
        ))
    })
})


router.get('/tasks/:id', async (req, res) => {

    const id = +req.params.id
    const task = (await findTask(id))!
    const cases = await findCases(id)

    if (!task) {
        return res.status(404).json({
            message: "Task " + id + " not found"
        })
    }

    const token = req.header('authorization')

    if (token) {
        const user = await findUserByToken(token)

        if (user) {
            const solutions = await findSolutions(user!.id)
            const mappedTask = 
                {
                    id: task.id,
                    name: task.name,
                    content: task.content,
                    description: task.description,
                    lectureId: task.lectureId,
                    isComplete: solutions.find(solution => solution.taskId == task.id) != undefined,
                    solution: solutions.find(solution => solution.taskId == task.id)?.solution
                }
            return res.json({
                message: 'Get tasks',
                tasks: mappedTask
            })
        }
    }


    res.json({
        message: 'Retrive task',
        task: {
            id: task.id,
            name: task.name,
            content: task.content,
            description: task.description,
            isComplete: false
        },
        cases
    })
})


router.delete('/tasks/:id', async (req, res) => {

    const id = +req.params.id
    const task = await deleteTask(id)
    const cases = await deleteCases(id)

    res.json({
        message: 'Delete task',
        task
    })
})

export default router