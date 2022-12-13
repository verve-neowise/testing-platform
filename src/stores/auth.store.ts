import { writable } from "svelte/store"

export type Auth = {
    id: string,
    username: string
}

const initialValue: Auth | null = JSON.parse(localStorage.getItem('auth'))

export const authStore = writable<Auth | null>(initialValue)

export const setAuth = (auth: Auth | null) => {
    authStore.set(auth)
    localStorage.setItem('auth', JSON.stringify(auth))
}