import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SpinnerLoader } from "../components/General";

const IsAuth = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
        
        if (storedUserId) {
            setUser({ uid: storedUserId });
        } else {
            navigate('/login');
        }
        
        setLoading(false);
    }, [navigate]);

    if (loading) {
        return <SpinnerLoader />;
    }

    return user ? <>{children}</> : null;
};

export default IsAuth;
