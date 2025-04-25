import { userInstance } from "../axios/axiosInstance"


export const getFoods = () => {
    return userInstance.get("/food/list-food")
}