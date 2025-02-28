import { useState } from "react";

interface TaskCardProps {
    id: string;
    title: string;
    text: string;
    logo: string;
    status: boolean;
}

function TaskCard ({id, title, text, logo, status}: TaskCardProps) {
    const [completeButton, setCompleteButton] = useState<string>("btn btn-primary")
    if (status === true){
        setCompleteButton("btn btn-primary disabled")
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
                <a href="#" className={completeButton} onClick={()=>{
                    console.log(id)
                    setCompleteButton("btn btn-primary disabled")
                }}>Completed</a>
            </div>

        </div>
    )
}

export default TaskCard