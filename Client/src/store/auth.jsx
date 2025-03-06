import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext()



export const AuthProvider = ({ children }) => {
    const [token, setToken ] = useState(localStorage.getItem("token"))
    const [ user, setUser ] = useState("")

    // function to store the token in local storage
    const storetokenInLS = (serverToken) => {
        localStorage.setItem("token", serverToken);
        setToken(serverToken); // Update state
    };
    


    // this is to get the value in either true or false in the original state of token
    let isLoggedIn = !!token
    // console.log("token", token)
    // console.log("isLoggedIn", isLoggedIn)


    // to check whether logged in or not
    const LogoutUser = () => {
        localStorage.removeItem("token");
        setToken(null); // Clear the token from state
    };
    
    const userAuthentication = async () => {
        if (!token) return; // Avoid making the request if token is null
    
        try {
            const response = await fetch("http://localhost:3001/api/auth/user", {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                setUser(data.userInfo);
            } else {
                console.error("Invalid token or session expired");
                LogoutUser(); // Clear invalid token
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    // const userAuthentication = async () => {
    //     try {
    //         const response = await fetch("http://localhost:3001/api/auth/user", {
    //             method: 'GET',
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         } )

    //         if (response.ok) {
    //             const data = await response.json()
    //             setUser(data.userInfo)
    //         } else {
    //             console.error("Error fetching user Data");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    useEffect(() => {
        if (token) userAuthentication();
    }, [token]);
    
    
    return (
        <AuthContext.Provider value={{ isLoggedIn, storetokenInLS, LogoutUser, user }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider")
    }

    return authContextValue
}








// import { createContext, useContext, useState } from "react";

// export const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {

//     const [ token, setToken ] = useState(localStorage.getItem("token+"))

//     const storetokenInLS = (serverToken) => {
//         return localStorage.setItem("token", serverToken)
//     }

//     let isLoggedIn = !!token
//     const LogoutUser = () => {
//         setToken("")
//         return localStorage.removeItem("token")
//     }

//     return (
//     <AuthContext.Provider value={{ isLoggedIn, storetokenInLS, LogoutUser }}>
//         {children}
//     </AuthContext.Provider>
//     )
// }

// export const useAuth = () => {
//     const authContextValue = useContext(AuthContext)
//     if (!authContextValue) {
//         throw new Error("useAuth used outside of App ")
//     }
//     return authContextValue
// }