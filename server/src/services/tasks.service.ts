import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export type Task = {
    name: string,
    description: string,
    content: string
}

export function createTask(task: Task) {
    return prisma.task.create({
        data: task
    })
}


export function findTask(id: number) {
    return prisma.task.findUnique({
        where: {
            id
        }
    })
}

export function allTasks() {
    return prisma.task.findMany()
}