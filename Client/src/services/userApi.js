import { userInstance } from "../axios/axiosInstance.js"

export const userLogin = ( data, role ) => {
    return userInstance.post(`/user/login?role=${role}`, data)
}