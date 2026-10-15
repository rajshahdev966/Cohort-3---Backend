import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const useAuthContext = ()=> {
    const context = useContext(AuthContext);
    return context;
}

export default function AuthContextProvider({children}) {

    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);



    const value = {
        accessToken, setAccessToken, user, setUser
    }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

