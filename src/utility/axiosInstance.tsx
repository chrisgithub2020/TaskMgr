import axios from "axios"

const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        "Access-Control-Allow-Origin": "http://127.0.0.1:8000",
        "Content-Type": "application/json"
    }
})

export default axiosInstance