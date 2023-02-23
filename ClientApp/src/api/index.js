import axiosLib from "axios";
import AuthService from "../services/AuthService";

const axios = axiosLib.create({
    baseURL: 'api/'
})

export const publicAxios = axiosLib.create({
    baseURL: 'api/'
})

export default axios

axios.interceptors.request.use(
    (config) => {
        const token = AuthService.getToken()?.token
        if(token) {
            config = {
                ...config,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const resInterceptor = (onLogout) => {
    axios.interceptors.response.use(
        (response) => {
            if(response.status === 401) {
                AuthService.deleteToken()
                onLogout()
                return Promise.reject(response)
            }

            return response
        },
        (error) => {
            if(error.response?.status === 401) {
                AuthService.deleteToken()
                onLogout()
                return Promise.reject(error)
            }

            return Promise.reject(error)
        }
    )
}