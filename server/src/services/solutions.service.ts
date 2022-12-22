import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function findSolutions(clientId: number) {
    return prisma.solution.findMany({
        where: {
            userId: clientId
        }
    })
}

export async function createSolution(solution: string, taskId: number, userId: number) {
    return prisma.solution.create({
        data: {
            userId,
            taskId,
            solution
        }
    })
}