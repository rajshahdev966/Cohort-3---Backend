import axios from "axios"
import { useAuthContext } from "../context/authContext"

export default function useApi() {
    const api = axios.create({
        baseURL: "http://localhost:5173/api",
        withCredentials: true
    })

    api.interceptors.response.use((config)=> {
        config.headers.Authorization = `Bearer ${useAuthContext.accessToken}`
        return config
    })

    return api;
} 
