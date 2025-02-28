import { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css"
import axiosInstance from "./utility/axiosInstance";

//importing  utilty


function App() {
  const navigate = useNavigate()
  let params = useParams<{id: any}>()
  
  const [activeTab, setActiveTab] = useState("home")
  useEffect(()=>{
    const func = async ()=>{
      const resp = await axiosInstance.get("http://127.0.0.1:8000/check_sessions")
      const data = resp.data

      if (data === false){
        navigate("/login")
      }

    }
    func()
  },[])
  
  
  return (
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-md-3 p-0">
            <NavBar activeTab={activeTab} tabClick={setActiveTab}/>
          </div>
          <div className="col-md-9 p-0">
            <SideBar data={params.id} activeTab={activeTab}/>
          </div>
        </div>

      </div>
  );
}

export default App;
