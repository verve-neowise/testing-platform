import { PrismaClient } from '@prisma/client'
import md5 from 'md5'

const prisma = new PrismaClient()

export type User = {
    id: number
    username: string,
    password: string,
    name: string
    group: string

    token: string
}

export async function findUser(username: string) {
    return prisma.user.findFirst({
        where: {
            username
        }
    })
}

export async function findUserByToken(token: string) {
    return prisma.user.findFirst({
        where: {
            token
        }
    })
}

export async function createUser(user: User) {
    return prisma.user.create({
        data: {
            username: user.username,
            password: user.password,
            group: user.group,
            name: user.name,
            token: md5(user.username + user.password)
        }
    })
}