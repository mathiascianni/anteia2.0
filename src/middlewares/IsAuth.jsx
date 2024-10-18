import useAuth from "../hooks/useAuth"
import { Navigate } from "react-router-dom"
import { useUser } from "../context/User/UserContext"

const IsAuth = ({ children }) => {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/login" />
    }

    return (
        <>
            {children}
        </>
    )
}

export default IsAuth