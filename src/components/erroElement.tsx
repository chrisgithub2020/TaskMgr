import { Link } from "react-router-dom"

function ErrorElement() {
    return (
        <div className="container">
            404 Not Found
            <Link to={"./"}>Go home</Link>
        </div>
    )
}

export default ErrorElement