import { writable } from 'svelte/store';
import type { AxiosError, AxiosResponse } from 'axios'

export type Result<T> = {
    status: 'pending' | 'error' | 'success',
    message: string,
    data?: T
}

export function apiCall<T>(apiCall: () => Promise<AxiosResponse<any>>) {

    const store = writable<Result<T>>({
        status: 'pending',
        message: '',
        data: null
    })

    apiCall().then(response => {
        store.set({
            status: 'success',
            message: response.data.message,
            data: response.data.user
        })
    }).catch((err: AxiosError<any>) => {
        store.set({
            status: 'error',
            message: err.response.data.message,
            data: null
        })
    })

    return store
}


export function tasksApiCall<T>(apiCall: () => Promise<AxiosResponse<any>>) {

    const store = writable<Result<T>>({
        status: 'pending',
        message: '',
        data: null
    })

    apiCall().then(response => {
        store.set({
            status: 'success',
            message: response.data.message,
            data: response.data.tasks
        })
    }).catch((err: AxiosError<any>) => {
        store.set({
            status: 'error',
            message: err.response.data.message,
            data: null
        })
    })

    return store
}