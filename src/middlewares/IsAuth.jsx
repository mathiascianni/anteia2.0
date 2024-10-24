import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { SpinnerLoader } from "../components/General";

const IsAuth = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const storedUserId = localStorage.getItem('userId') || sessionStorage.getItem('userId')
    useEffect(() => {

        if (storedUserId) {
            setUser({ uid: storedUserId });
        }

        if (!storedUserId) {
            return navigate('/login');  ;
        }

        setLoading(false);
    }, []);

    if (loading) {
        return <SpinnerLoader />;
    }


    if (!user) {
        return navigate('/login');
    }


    return <>{children}</>;
};

export default IsAuth;
