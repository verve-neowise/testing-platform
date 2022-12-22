import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export type Lecture = {
    name: string,
    content: string
}

export function createLecture(lecture: Lecture) {
    return prisma.lecture.create({
        data: {
            ...lecture
        }
    })
}

export function findLecture(lectureId: number) {
    return prisma.lecture.findFirst({
        where: {
            id: lectureId
        }
    })
}

export function findLectures() {
    return prisma.lecture.findMany()
}

export function deleteLecture(id: number) {
    return prisma.lecture.delete({
        where: {
            id
        }
    })
}