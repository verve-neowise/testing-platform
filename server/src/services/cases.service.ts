import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export type Case = {
    name: string,
    input: string,
    expect: string
}

export async function createCases(cases: Case[], taskId: number) {
    const newCases: Case[] = []
    for (const _case of cases) {
        const newCase = await prisma.case.create({
            data: {
                ..._case,
                taskId
            }
        })
        newCases.push(newCase)
    }
}

export function findCases(taskId: number) {
    return prisma.case.findMany({
        where: {
            taskId
        }
    })
}