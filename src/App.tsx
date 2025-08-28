import { useState,useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css"
import axiosInstance from "./utility/axiosInstance";

//importing  utilty


function App() {
  const navigate = useNavigate()
  
  const [activeTab, setActiveTab] = useState("home")
  useEffect(()=>{
    const func = async ()=>{
      const resp = await axiosInstance.get("/check_sessions")
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
            <Outlet/>
          </div>
        </div>

      </div>
  );
}

export default App;
