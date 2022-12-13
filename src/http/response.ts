import { writable } from 'svelte/store';
import type { AxiosResponse } from 'axios'

export type Response<T> = {
    status: 'pending' | 'error' | 'success',
    data?: T
}

export function apiCall<T>(apiCall: () => Promise<AxiosResponse<T>>) {

    const store = writable<Response<T>>({
        status: 'pending',
        data: null
    })

    apiCall().then(response => {
        store.set({
            status: 'success',
            data: response.data
        })
    }).catch(err => {
        store.set({
            status: 'error',
            data: null
        })
    })

    return store
}