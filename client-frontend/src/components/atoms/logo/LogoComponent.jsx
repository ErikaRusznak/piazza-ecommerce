import React from "react";
import {Link} from "react-router-dom";
import {ReactComponent as Logo} from "./icon.svg";
import {useAuth} from "../../../api/auth/AuthContext";

const LogoComponent = () => {

    const { isAuthenticated } = useAuth();
    const linkedTo = isAuthenticated ? "/welcome" : "/";

    return (
        <Link to={linkedTo} className="-m-1.5 p-1.5">
            <Logo className="h-8 w-auto"/>
        </Link>
    )
}

export default LogoComponent;