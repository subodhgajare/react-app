import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <>
            <h1>Page Not Found</h1>
            <Link className="btn btn-primary" to="/"> Home</Link>
        </>
    )
}

export default PageNotFound;