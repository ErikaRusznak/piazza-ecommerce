import {createContext, useContext, useState} from "react";
import { Alert } from "@mui/material";

interface AlertContextType {
    pushAlert: (newAlert: any) => void;
    clearAlert: () => void;
}
const AlertContext = createContext<AlertContextType | undefined>(undefined)
export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext);
    if(!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
}

type AlertType = {
    type: any; // can be success, info (blue), warning(orange), error
    title: string;
    paragraph: string;
}

const AlertProvider = ({children} : {children : React.ReactNode}) => {

    const [alert, setAlert] = useState<AlertType |null>(null);
    const [timeoutId, setTimeoutId] = useState(0);

    const pushAlert = (newAlert:any) => {
        if(!!timeoutId){
            clearTimeout(timeoutId);
        }
        setAlert(newAlert)
        if(newAlert.type==='success'){
            // @ts-ignore
            // TODO - fix
            setTimeoutId(setTimeout(()=>setAlert(null), 2000));
        }
    }

    const clearAlert = () => {
        setAlert(null)
    }
// TODO - add title and paragraph too
    return(

        <AlertContext.Provider value={{pushAlert, clearAlert}}>
            {!!alert &&
            <Alert severity={alert.type}>{alert.title}</Alert>}
            {children}
        </AlertContext.Provider>
    );
};

export default AlertProvider;