import { createContext, useContext, useEffect, useState } from "react";
import { clearAccessToken, getAccessToken, setAccessToken } from "../utils/token";
import { getMe } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (userData, token) => {
        setUser(userData);
        setAccessToken(token);
    }

    const logout = () => {
        setUser(null);
        clearAccessToken();
    }

    async function fetchMe() {
        const token = getAccessToken();

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const res = await getMe();
            setUser(res.data.user || res.data)
        }
        catch (error) {
            clearAccessToken();
            setUser(null);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);