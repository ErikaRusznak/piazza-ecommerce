import { useCallback, useEffect, useState } from "react"

export const useSessionStorage = (key: any, initialValue: any) => {
    const initialize = (key:any) => {
        try {
            const item = sessionStorage.getItem(key);
            if (item && item !== "undefined") {
                return JSON.parse(item);
            }

            sessionStorage.setItem(key, JSON.stringify(initialValue));
            return initialValue;
        } catch {
            return initialValue;
        }
    }

    const [state, setState] = useState(initialValue);

    useEffect(() => {
        setState(initialize(key))
    }, []);

    const setValue = useCallback(
        (value: any) => {
            try {
                const valueToStore = value instanceof Function ? value(state) : value
                setState(valueToStore)
                sessionStorage.setItem(key, JSON.stringify(valueToStore))
            } catch (error) {
                console.log(error)
            }
        },
        [key, setState]
    );

    const remove = useCallback(() => {
        try {
            sessionStorage.removeItem(key)
        } catch (error) {
            console.log(error)
        }
    }, [key])

    return [state, setValue, remove]
};
