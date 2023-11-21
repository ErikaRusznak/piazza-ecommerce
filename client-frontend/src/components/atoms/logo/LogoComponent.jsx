import React from "react";
import {Link} from "react-router-dom";
import {ReactComponent as Logo} from "./icon.svg";
const LogoComponent = () => {
    return (
        <Link to='/' className="-m-1.5 p-1.5">
            <Logo className="h-8 w-auto"/>
        </Link>
    )
}

export default LogoComponent;