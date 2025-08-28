import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
    headers: {
        "Access-Control-Allow-Origin": "https://localhost:5173",
        "Content-Type": "application/json"
    }
})
// "https://taskmgr-h3ow.onrender.com"
export default axiosInstance