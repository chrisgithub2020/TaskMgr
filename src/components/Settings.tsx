import { useState, useEffect } from "react"
import logo from "../images/task.jpg"

// importing utility
import axiosInstance from "../utility/axiosInstance"
import HashString from "../utility/hash"


interface InfoProp {
    first_name: string,
    phone: string,
    email: string,
    other_name:string,
    sendSMS: boolean,
    sendEmail: boolean,
}

interface SettingsProp {
    id: string
}
function Settings({id}:SettingsProp) {
    const [info, setInfo] = useState<InfoProp>({other_name:"",first_name:"", phone:"", email:"", sendEmail: false, sendSMS: false})
    const [saveChangesClass, setSaveChangesClass] = useState<string>("btn btn-primary m-2 disabled")
    let update = {
        phone: info.phone,
        first_name: info.first_name,
        other_name:info.other_name,
        email: info.email,
        sendEmail: info.sendEmail,
        sendSMS: info.sendSMS,
        password:"",
    }
    const [changeInfo, setChangeInfo] = useState<any>(update)


    useEffect(()=>{
        const getDetails = async ()=>{
          const resp = await axiosInstance.get(`dashboard/${id}`)
          console.log(resp.data)
          let names:Array<string> = resp.data.username.split(" ",2)
          console.log(names)
          if (names.length == 1) names.push(" ")
          const data :InfoProp = {first_name:names[0],other_name:names[1], email:resp.data.email, phone:resp.data.phone, sendEmail:resp.data.sendEmail, sendSMS: resp.data.sendSMS}
          setInfo(data)
        }
        getDetails()
    },[])

    const updateDetails = async ()=>{
        console.log(changeInfo)
        const result = await axiosInstance.post("http://127.0.0.1:8000/change_info", changeInfo)
        console.log(result.data)
        window.location.reload()
    }

    

    return (
        <div className="sidebar-bg-color overflow-auto d-flex justify-content-around p-3 height-100">
            <div className="card shadow-lg bg-dark text-white w-75">
                <div className="card-body">
                    <h5 className="cart-title">
                        Settings
                    </h5>
                    <div className="text-center">
                        <img src={logo} alt="" className="image-h-w rounded-circle border border-success"/>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="first-name">First name: </label>
                            <input onChange={(event)=>{
                                if (event.target.value !== info.first_name){
                                    setSaveChangesClass("btn btn-primary m-2")
                                } else {
                                    setSaveChangesClass("btn btn-primary m-2 disabled")
                                }
                                setChangeInfo({...changeInfo, first_name: event.target.value})
                            }} defaultValue={info.first_name} type="text" name="first-name" id="first-name" className="form-control"/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="first-name">Other names: </label>
                            <input onChange={(event)=>{
                                if (event.target.value !== info.other_name){
                                    setSaveChangesClass("btn btn-primary m-2")
                                } else {
                                    setSaveChangesClass("btn btn-primary m-2 disabled")
                                }
                                setChangeInfo({...changeInfo, other_name: event.target.value})
                            }} defaultValue={info.other_name} type="text" name="other-names" id="other-names" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="first-name">Email: </label>
                        <input onChange={(event)=>{
                            if (event.target.value !== info.email){
                                setSaveChangesClass("btn btn-primary m-2")
                            } else {
                                setSaveChangesClass("btn btn-primary m-2 disabled")
                            }
                            setChangeInfo({...changeInfo, email: event.target.value})
                        }} defaultValue={info.email} type="text" name="email" id="email" className="form-control"/>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="password">Password: </label>
                            <input onChange={(event)=>{
                                if (event.target.value !== info.email){
                                    setSaveChangesClass("btn btn-primary m-2")
                                } else {
                                    setSaveChangesClass("btn btn-primary m-2 disabled")
                                }
                                (async ()=>{
                                    let passwordHash = await HashString(event.target.value)
                                    setChangeInfo({...changeInfo, password: passwordHash})
                                })()
                            }} defaultValue={"12345678910"} type="password" name="password" id="password" className="form-control"/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="phone">Phone: </label>
                            <input onChange={(event)=>{
                                if (event.target.value !== info.phone){
                                    setSaveChangesClass("btn btn-primary m-2")
                                } else {
                                    setSaveChangesClass("btn btn-primary m-2 disabled")
                                }
                                setChangeInfo({...changeInfo, phone: event.target.value})
                            }} defaultValue={info.phone} type="text" name="phone" id="phone" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-check m-2">
                        <input onChange={(event)=>{
                            if (event.target.checked !== info.sendEmail){
                                setSaveChangesClass("btn btn-primary m-2")
                            } else {
                                setSaveChangesClass("btn btn-primary m-2 disabled")
                            }
                            setChangeInfo({...changeInfo, sendEmail: event.target.checked})
                        }} className="form-check-input" value="" id="sendEmail-reminders-checkBox" type="checkBox" checked={info.sendEmail}/>
                        <label className="form-check-label" htmlFor="email-reminder">Recieve email reminder of Task</label>
                    </div>
                    <div className="form-check m-2">
                        <input onChange={(event)=>{
                            if (event.target.checked !== info.sendSMS){
                                setSaveChangesClass("btn btn-primary m-2")
                            } else {
                                setSaveChangesClass("btn btn-primary m-2 disabled")
                            }
                            setChangeInfo({...changeInfo, sendSMS: event.target.checked})
                        }} className="form-check-input" value="" id="sendSMS-reminders-checkBox" type="checkBox" checked={info.sendSMS}/>
                        <label className="form-check-label" htmlFor="sendSMS-reminder">Recieve SMS reminder of Task</label>
                    </div>
                </div>
                <a href="#" className={saveChangesClass} onClick={updateDetails}>Save Changes</a>
            </div>

        </div>
    )
}

export default Settings