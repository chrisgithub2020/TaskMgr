import { Link } from "react-router-dom"

function ErrorElement() {
    return (
        <div className="container">
            <p>404 Not Found</p>
            <p>Probably might be a server side problem. Go back and try again</p>
            <Link to={"./"}>Go home</Link>
        </div>
    )
}

export default ErrorElement