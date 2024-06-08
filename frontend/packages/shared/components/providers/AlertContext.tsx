"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AlertContextType {
    pushAlert: (newAlert: AlertType) => void;
    alert: AlertType | null;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
}

type AlertType = {
    type: "success" | "info" | "warning" | "error"; // can be success, info (blue), warning(orange), error
    title: string;
    paragraph: string;
}

const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alert, setAlert] = useState<AlertType | null>(null);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const pushAlert = (newAlert: AlertType) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setAlert(newAlert);
        const id = setTimeout(() => {
            setAlert(null);
            setTimeoutId(null);
        }, 2000);
        setTimeoutId(id);
    }

    return (
        <AlertContext.Provider value={{ pushAlert, alert }}>
            {children}
        </AlertContext.Provider>
    );
};

export default AlertProvider;
