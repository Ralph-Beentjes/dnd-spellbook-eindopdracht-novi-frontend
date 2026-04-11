import {createContext, useEffect, useState} from 'react';
import Keycloak from "keycloak-js";
import {useNavigate} from "react-router-dom";
import { useRef } from "react";


export const AuthContext = createContext(null);

let initialAuth = {
    isAuth: false,
    token: null,
    user: null,
    status: 'pending'
}

function AuthContextProvider({children}) {

    const [auth, setAuth] = useState(initialAuth)
    const [keycloak, setKeycloak] = useState(null)

    const hasInitialized = useRef(false);

    useEffect(() => {

        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const keycloak = new Keycloak({
            url: "http://localhost:9090/",
            realm: "dnd-spellbook",
            clientId: "dnd-spellbook-frontend"
        });

        setKeycloak(keycloak);

        async function checkToken() {
            try {
                const authenticated = await keycloak.init({
                    onLoad: 'check-sso',
                    pkceMethod: 'S256',
                    checkLoginIframe: false,
                });

                if (!authenticated) {
                    setAuth({ ... initialAuth, status: 'done' });
                    return;
                }

                await keycloak.updateToken(5);
                const userInfo = await keycloak.loadUserInfo();

                setAuth({
                    isAuth: true,
                    token: keycloak.token,
                    user: userInfo,
                    status: 'done'
                })

            } catch (e) {
                console.error(e);
                setAuth({ ... initialAuth, status: 'done' });
            }
        }

        void checkToken();
    }, []);

    function login() {
        keycloak?.login()
    }

    function logout() {
        keycloak?.logout({
            redirectUri: window.location.origin + '/'
        });
    }

    const contextData = {
        auth,
        logout,
        login
    }

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;