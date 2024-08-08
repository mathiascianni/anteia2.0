import { createContext, useContext } from "react";

const UserContext = createContext();

const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser debe ser utilizado dentro de un UserProvider");
    }
    return context;
};

export { UserContext, useUser };