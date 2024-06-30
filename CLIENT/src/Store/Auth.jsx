import React, {createContext, useContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';


export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get('accessToken'))
    const [user, setUser] = useState("")
    const authoriztionToken = `Bearer ${token}`


    const storeTokenInCookie = (generateToken) => {
        setToken(generateToken)
        return Cookies.set('accessToken', generateToken, { expires: 1 });  //mean 1 day
    }

    let isLoggedIn = !!token;

    const logoutUser = () => {
        setToken("");
        setUser("")
        return Cookies.remove('accessToken')
    }

    const userAuthentication = async() => {
        try {
            const response = await fetch(`todo-server-liard-omega.vercel.app/api/todo/users/getuser`, {
                method: "GET",
                headers: {
                    Authorization: authoriztionToken, 
                },

            });

            if(response.ok){
                const data = await response.json();
                // console.log(data.userData)
                setUser(data.userData);
            } else {
                setUser("")
            }
        } catch (error) {
            console.log("Error fetching  user data",error)     
        }
    }
    

    useEffect(() => {
        userAuthentication()
    }, [])

    

    return (
        <AuthContext.Provider value={{storeTokenInCookie, logoutUser, isLoggedIn, 
            authoriztionToken, user, setUser, setToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}
