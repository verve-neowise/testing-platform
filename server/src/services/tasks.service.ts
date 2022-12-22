import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export type Task = {
    name: string,
    description: string,
    content: string,
    id?: number
    isComplete?: boolean,
    solution?: string
}

export function createTask(lectureId: number, task: Task) {
    return prisma.task.create({
        data: {
            ...task,
            lectureId
        }
    })
}


export function findTask(id: number) {
    return prisma.task.findUnique({
        where: {
            id
        }
    })
}

export function allTasks(lectureId: number) {
    return prisma.task.findMany({
        where: {
            lectureId
        }
    })
}

export function deleteTask(id: number) {
    return prisma.task.delete({
        where: {
            id
        }
    })
}