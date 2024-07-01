import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { getToken } from '../utils'

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface FetchState<T> {
    data: T | null
    loading: boolean
    error: string | null
}

export function useRequest<T>(
    url: string,
    method: RequestMethod,
    body: Record<string, any> = {}
) {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: true,
        error: null,
    })

    useEffect(() => {
        const fetchData = async () => {
            setState({ data: null, loading: true, error: null })
            try {
                let response: AxiosResponse<T>

                const config = {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }

                switch (method) {
                    case 'GET':
                        response = await axios.get<T>(url, config)
                        break
                    case 'POST':
                        response = await axios.post<T>(url, body, config)
                        break
                    case 'PUT':
                        response = await axios.put<T>(url, body, config)
                        break
                    case 'DELETE':
                        response = await axios.delete<T>(url, config)
                        break
                    default:
                        throw new Error(`Unsupported request method: ${method}`)
                }

                setState({ data: response.data, loading: false, error: null })
            } catch (error) {
                setState({
                    data: null,
                    loading: false,
                    error: (error as Error).message,
                })
            }
        }

        fetchData()
    }, [])

    return state
}
