import { useState } from "react";
import axiosInstance from "../utility/axiosInstance";

interface TaskCardProps {
    id: string;
    title: string;
    text: string;
    logo: string;
    status: boolean;
}

function TaskCard ({id, title, text, logo, status}: TaskCardProps) {
    const [completed, setCompleted] = useState<boolean>(status)
    const completeTask = async ()=>{
        const response = await axiosInstance.get(`complete_task/${id}`)
        if(response.data == true) {
            setCompleted(true)
        } else {
            alert("There was an error")
        }
    }

    return (
        <div className="card bg-dark shadow text-white w-25 h-50 m-1">
            <img className="card-img-top" src={logo} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">
                    {title}
                </h5>
                <p className="card-text">
                    {text}
                </p>
                {!completed ? <a href="#" className="btn btn-primary" onClick={()=>{
                    completeTask()
                }}>Complete</a>: <p><b>Completed</b></p>}
            </div>

        </div>
    )
}

export default TaskCard