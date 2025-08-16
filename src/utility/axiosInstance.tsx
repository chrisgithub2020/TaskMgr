import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://taskmgr-h3ow.onrender.com/",
    withCredentials: true,
    headers: {
        "Access-Control-Allow-Origin": "https://taskmgr-h3ow.onrender.com",
        "Content-Type": "application/json"
    }
})

export default axiosInstance