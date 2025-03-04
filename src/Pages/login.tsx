import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//Importing utilities
import HashString from "../utility/hash";
import axiosInstance from "../utility/axiosInstance";

function Login() {
  const navigate = useNavigate();
  const [alertText, setAlertText] = useState<string>();
  const [alertColor, setAlertColor] = useState<string>();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>("");

  const handleLogIn = async () => {
    if (email === undefined || password === undefined) {
      return 0;
    }
    let passwordHash = await HashString(password);
    const details = {
      password: passwordHash,
      email: email,
    };
    try {
      const resp = await axiosInstance.post(
        "http://127.0.0.1:8000/login",
        JSON.stringify(details)
      );

      // decision on logging in
      const result = await resp.data;
      if (result["success"] === true) {

        //showing success alert
        setAlertText("Successfully signed in")
        setAlertColor("alert-success")
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);

        //navigating to page
        navigate(`/home/${result["id"]}`);
      } else {
        // if logins does not match any user
        if (result["result"] == "!password") {
          // Password mismatch
          setAlertText("Password does not match");
          setAlertColor("alert-warning")
          setShowAlert(true);
        } else if (result["result"] == "!user") {
          // Email mismatch
          setAlertText("Email does not exist");
          setAlertColor("alert-warning")
          setShowAlert(true);
        }

        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      }
      /////
    } catch (err) {
      // show err alert incase of any error
      setAlertText("Please fill the forms appropriately")
      setAlertColor("Please fill the forms appropriately")
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  ///check if session already exist
  async function checkSession() {
    try {
      const resp = await axiosInstance.get(
        "http://127.0.0.1:8000/check_sessions"
      );
      let result = await resp.data;
      console.log(result);

      if (result === false) {
      } else {
        navigate(`/home/${result}`);
      }
    } catch (err) {
      /// alert incase of any error
      setAlertText("Please fill the forms appropriately")
      setAlertColor("Please fill the forms appropriately")
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  }
  useEffect(() => {
    checkSession();
  }, []);
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
          <h5 className="cart-title text-center">Sign In</h5>
          <div className="form-group">
            <label htmlFor="first-name">Email: </label>
            <input
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              type="text"
              name="email"
              id="email"
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
              className="form-control text-white bg-dark border border-info"
            />
          </div>

          <p className="card-text text-center">
            Don't have an account? <Link to={"/signup"}>Sign Up</Link>
          </p>
        </div>
        <a onClick={handleLogIn} href="#" className="btn btn-primary m-2">
          Log in
        </a>
      </div>
    </div>
  );
}

export default Login;
