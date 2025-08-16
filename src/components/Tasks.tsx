import { useEffect, useState } from "react";

import TaskCard from "./TaskCard";
import axiosInstance from "../utility/axiosInstance";


type TaskProp = {
  title: string;
  id: string;
  description: string;
  pic: string;
  status: boolean;
}

const Home = () => {
  const [tasks, setTasks] = useState<Array<TaskProp>>()
  useEffect(()=>{
    const dummy = async ()=>{
      const result = await axiosInstance.get("http://127.0.0.1:8000/get_tasks")
      setTasks(result.data)
    }
    dummy()
  },[])

  return (
    <div>
      <nav className="navbar navbar-dark shadow bg-dark p-2 justify-content-between">
        <a className="navbar-brand">Tasks</a>
        <form className="form-inline">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </nav>
      <div className="row sidebar-bg-color py-1 d-flex justify-content-between overflow-auto">
        { tasks &&
          tasks?.map((value)=>{
            return <TaskCard status={value.status} key={value.id} id={value.id} title={value.title} logo={value.pic} text={value.description}/>
          })
        }       
      </div>
    </div>
  );
};

export default Home;
