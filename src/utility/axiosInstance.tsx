import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://taskmgr-h3ow.onrender.com",
    withCredentials: true,
    headers: {
        "Access-Control-Allow-Origin": "https://taskmgr-static.onrender.com",
        "Content-Type": "application/json"
    }
})
// "https://taskmgr-h3ow.onrender.com"
// "http://127.0.0.1:8000"
// "https://localhost:5173"
export default axiosInstance