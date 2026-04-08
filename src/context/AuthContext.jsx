import {createContext, useState} from 'react';

export const AuthContext = createContext({});

function AuthContextProvider({children}){
    const [login, setLogin]= useState(false);

    const data = {
        login: login,
    }

    return (
        <AuthContext.Provider value={data}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;