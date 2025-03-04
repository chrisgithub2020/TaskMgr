import { useSearchParams } from "react-router-dom"
import axiosInstance from "../utility/axiosInstance"
import { useEffect, useState } from "react"

function OAuth() {
    const [params] = useSearchParams()
    const code = params.get("code")
    const state = params.get("state")
    
    useEffect(()=>{
        const trash = async () =>{
            const resp = await axiosInstance.post(`http://127.0.0.1:8000/fetch_token_google`,
                JSON.stringify({code:code, state: state})
            )
        }
        trash()
    },[])


    return (
        <div className="sidebar-bg-color d-flex flex-column align-items-center justify-content-center height-100">
            <h3 className="text-white">Fetching required info...</h3>
            <span
          className="spinner-border spinner-border-l"
          style={{color:"#5f5f85"}}
          role="status"
          aria-hidden="true"
        ></span>
        </div>
    )
}

export default OAuth