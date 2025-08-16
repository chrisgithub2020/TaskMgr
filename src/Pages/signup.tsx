import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// importing utilities
import axiosInstance from "../utility/axiosInstance.tsx";
import HashString from "../utility/hash.ts"


function SignUp() {
  const navigate = useNavigate()
  const [alertColor, setAlertColor] = useState<string>();
  const [alertText, setAlertText] = useState<string>();
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [sendSMS, setSendSMS] = useState<boolean>(false)
  const [sendEmail, setSendEmail] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(setSendEmail, setSendSMS)

  ///check if session already exist
  async function checkSession () {
    try {
      const resp = await axiosInstance.get("check_sessions")
      let result = await resp.data
      console.log(result)
  
      if (result === false){
      } else {      
        navigate(`/home/${result}`)
      }

    } catch (err) {
      setAlertText("Please fill the forms appropriately")
      setAlertColor("alert-warning")
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  }
  useEffect(()=>{
    checkSession()
  }, [])


  const signInWithGoogle = async () =>{
    const resp = await axiosInstance.get("oauth_google")
    window.location.href = resp.data.url
  }


  // Handling signup
  const handleSignUp = async () => {
    if (
      email?.trim() == undefined ||
      phone?.trim() == undefined ||
      username?.trim() == undefined ||
      password?.trim() == undefined
    ) {
      return 0;
    }
    let passwordHash = await HashString(password)
    setIsLoading(true);
    let details = {
      email: email,
      phone: phone,
      username: username,
      password: passwordHash,
      sendEmail: sendEmail,
      sendSMS:sendSMS,
    };
    try {
      const resp = await axiosInstance.post(
        "signup",
        JSON.stringify(details)
      );
      setAlertColor("alert-success")
      setAlertText("Successfully signed up")
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      const resp_json = await resp.data;
      if (resp_json["success"] === true){
        navigate(`/home/${resp_json["data"]}`)
      } else {
        if (resp_json["result"] == "!account"){
          setAlertText("Email is already assigned to an account")
          setAlertColor("alert-warning")
          setShowAlert(true);

          setTimeout(() => {
            setShowAlert(false);
          }, 2000);
        }
      }
    } catch (err) {
        // show warning alert
      setAlertText("Please fill the forms appropriately")
      setAlertColor("alert-warning")
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
    setIsLoading(false);
  };
  //////

  // shows loading on create account button when clicked
  function showLoading() {
    return (
      <>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <span className="sr-only">Loading...</span>
      </>
    );
  }
  //////

  return (
    <div className="sidebar-bg-color d-flex flex-column align-items-center justify-content-center height-100">
      {showAlert && (
        <div className={`alert ${alertColor} fade show`} role="alert">
          {alertText}
        </div>
      )}
      

      <div className="row text-center">
        <h3>TaskMgr</h3>
      </div>
      <div className="card shadow-lg bg-dark text-white w-25 my-4">
        <div className="card-body">
          <h5 className="cart-title text-center">Sign Up</h5>
          <div className="row">
            <div className="form-group">
              <label htmlFor="first-name">Full name: </label>
              <input
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                type="text"
                name="first-name"
                id="first-name"
                className="form-control text-white bg-dark border border-info"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="first-name">Email: </label>
            <input
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              type="email"
              name="email"
              id="email"
              className="form-control text-white bg-dark border border-info"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone: </label>
            <input
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              type="tel"
              name="phone"
              id="phone"
              className="form-control text-white bg-dark border border-info"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              type="password"
              name="password"
              id="password"
              className="form-control text-white bg-dark border border-info "
            />
          </div>

          <p className="card-text text-center">
            Already have an account? <Link to={"/login"}>log in</Link>
          </p>
        </div>
        <button
          onClick={handleSignUp}
          className="btn btn-primary m-2"
          disabled={isLoading}
        >
          {isLoading ? showLoading() : "Create Account"}
        </button>
      </div>
      
      <a onClick={signInWithGoogle} className="btn btn-primary m-2">
          Sign In with Google
        </a>
    </div>
  );
}

export default SignUp;
