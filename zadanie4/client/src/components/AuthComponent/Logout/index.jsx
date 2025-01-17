import { useEffect } from "react";

export function Logout() {
    useEffect(() => {
        localStorage.removeItem("token")
        window.location = "/login"
    }, [])
}