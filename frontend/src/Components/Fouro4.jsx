import React from "react";
import { Link} from "react-router-dom";

function Fouro4(){
    return (
        <>
        <h1>404 Not Found</h1>
        <p>The Page You Are Looking For Do Not Exist</p>
        <Link to="/">
        <button>Go to Home Page</button>
        </Link>
        </>
    )
}

export default  Fouro4;