import { useEffect, useState } from "react";
import logo from "../images/task.jpg"
import axiosInstance from "../utility/axiosInstance";
import { useNavigate } from "react-router-dom";

function AddTaskModal() {
  const navigate = useNavigate()
  const [image, setImage] = useState<any>()
  const [taskTitle, setTaskTitle] = useState<string>()
  const [taskDesc, setTaskDesc] = useState<string>()
  const [taskDueDate, setTaskDueDate] = useState<string>()
  const [taskDueTime, setTaskDueTime] = useState<string>()
  useEffect(()=>{
    const dummy = async ()=>{
      const taskImage = await fetch(logo)
      if (taskImage.ok){
        const reader = new FileReader()

        // read image blob as base64
        let blob = await taskImage.blob()
        reader.readAsDataURL(blob)

        // set image
        reader.onload = ()=>{
          setImage(reader.result)
        }
        //any err
        reader.onerror = (err)=>{
          console.log(err)
        }
      }      
    }
    dummy()
  },[])

  let info = {
    title: taskTitle,
    desc: taskDesc,
    date: taskDueDate,
    time: taskDueTime,
    image: image
  }
  const handleSubmit = async ()=>{
    if (image === undefined){
      console.log("image")
      return 0
    }
    console.log(info)
    const result = await axiosInstance.post("http://127.0.0.1:8000/add_task", JSON.stringify(info))
    console.log(result.data)
    if (result.data) {
      location.reload()
    }
  }
  return (
    <div className="sidebar-bg-color overflow-auto h-100 d-flex justify-content-around p-3">
      <div className="card bg-dark shadow-lg text-white w-75">
            <div className="card-body">
                <h5 className="card-title">
                    Add a task
                </h5>
                <div className="text-center">
                  <img src={image} alt="" className="image-h-w rounded-circle border border-success"/>
                  <span>
                    <input onChangeCapture={(event)=>{
                      // convert selected image to base64
                      let target = event.target as HTMLInputElement
                      const file = target.files[0]
                      const reader = new FileReader()
                      reader.readAsDataURL(file)
                      reader.onload = ()=>{
                        setImage(reader.result?.toString())
                      }
                      reader.onerror = (err)=>{
                        console.log(err)
                      }
                    }} style={{backgroundColor:"green"}} id="task-pic" className="rounded-circle form-control" type="file" name="task-pic" accept="image/*" onChange={(event)=>{
                      console.log(event)
                    }}/>
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="task-title" className="col-form-label">Task Title: </label>
                  <input type="text" name="task-name" id="task-name" className="form-control" onChange={(event)=>{
                    setTaskTitle(event.target.value)
                  }}/>
                </div>
                <div className="form-group">
                  <label htmlFor="description" className="col-form-label">Task Description: </label>
                  <textarea className="form-control" id="description-text" onChange={(event)=>{
                    setTaskDesc(event.target.value)
                  }}/>
                </div>
                <div className="form-group">
                  <label htmlFor="date" className="col-form-label">Select date: </label>
                  <input className="form-control" type="date" onChange={(event)=>{
                    setTaskDueDate(event.target.value)
                  }}/>
                </div>
                <div className="form-group">
                  <label htmlFor="time" className="col-form-label">Select time: </label>
                  <input className="form-control" type="time" onChange={(event)=>{
                    setTaskDueTime(event.target.value)
                  }}/>
                </div>
                <a href="#" className="btn btn-primary m-2" onClick={handleSubmit}>ADD</a>
            </div>
        </div>
    </div>
  );
}

export default AddTaskModal;
