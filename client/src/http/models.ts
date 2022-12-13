
export type Auth = {
    id: number
    username: string,
    password: string,
    name: string
    group: string
    token: string
}

export type Task = {
    id: number,
    name: string,
    description: string,
    content: string
}