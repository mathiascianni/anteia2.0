import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { SpinnerLoader } from "../components/General";

const IsAuth = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let storedUserId = localStorage.getItem('userId');
        if (!storedUserId) {
            storedUserId = sessionStorage.getItem('userId');
        }

        if (storedUserId) {
            setUser({ uid: storedUserId });
        }

        setLoading(false); 
    }, []);

    if (loading) {
        return <SpinnerLoader />;
    }

   
    if (!user) {
        return <Navigate to="/login" />;
    }


    return <>{children}</>;
};

export default IsAuth;
