import { writable } from "svelte/store"
import type { Auth } from "../http/models"

const initialValue: Auth | null = JSON.parse(localStorage.getItem('auth'))

export const authStore = writable<Auth | null>(initialValue)

export const setAuth = (auth: Auth | null) => {
    authStore.set(auth)
    localStorage.setItem('auth', JSON.stringify(auth))
}