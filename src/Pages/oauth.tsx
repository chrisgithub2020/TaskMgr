import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../utility/axiosInstance";
import { useEffect, useState } from "react";

function OAuth() {
  const navigate = useNavigate();
  const [alertColor, setAlertColor] = useState<string>();
  const [alertText, setAlertText] = useState<string>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [params] = useSearchParams();
  const code = params.get("code");
  const state = params.get("state");

  useEffect(() => {
    const trash = async () => {
      const resp = await axiosInstance.post(
        `http://127.0.0.1:8000/fetch_token_google`,
        JSON.stringify({ code: code, state: state })
      );
      console.log(resp.data);
      if (resp.data["success"] === false) {
        setAlertColor("alert-warning");
        setAlertText("Email is already assigned to account");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate("/login");
        }, 2000);
      } else {
        setAlertColor("alert-warning");
        setAlertText("Email is already assigned to account");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate("/login");
        }, 2000);
        setAlertColor("alert-success");
        setAlertText("Account successfully created");
        setTimeout(() => {
          setShowAlert(false);
          navigate(`/home/${resp.data.data}`);
        }, 2000);
      }
    };
    trash();
  }, []);

  return (
    <div className="sidebar-bg-color d-flex flex-column align-items-center justify-content-center height-100">
      {showAlert && (
        <div className={`alert ${alertColor} fade show`} role="alert">
          {alertText}
        </div>
      )}
      <h3 className="text-white">Fetching required info...</h3>
      <span
        className="spinner-border spinner-border-l"
        style={{ color: "#5f5f85" }}
        role="status"
        aria-hidden="true"
      ></span>
    </div>
  );
}

export default OAuth;
