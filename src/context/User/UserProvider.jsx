import { useState, useEffect } from "react";
import { auth, db } from "../../config/config.firebase";
import { UserContext } from "./UserContext";
import { getDoc, doc } from "firebase/firestore";

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            setUser(authUser);
        })

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const getUserRole = async () => {
            if (user) {
                try {
                    const docSnap = await getDoc(doc(db, "users", user.uid));
                    console.log(docSnap.data());
                    setUserRole(docSnap.data().role);
                } catch (error) {
                    console.error('Error al obtener datos de usuario:', error);
                }
            }
            setLoading(false);
        }
        getUserRole();

    }, [user])

    const value = {
        user,
        userRole,
        loading
    };

    return (
        <UserContext.Provider
            value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;