import {createContext, useEffect, useState} from 'react';
import Keycloak from "keycloak-js";
import { useRef } from "react";
import axios from "axios";


export const AuthContext = createContext(null);

let initialAuth = {
    isAuth: false,
    token: null,
    user: null,
    profileId: null,
    roles: [],
    status: 'pending'
}

function AuthContextProvider({children}) {

    const [auth, setAuth] = useState(initialAuth);
    const keycloakRef = useRef(null);
    const hasInitialized = useRef(false);

    useEffect(() => {

        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const keycloak = new Keycloak({
            url: "http://localhost:9090/",
            realm: "dnd-spellbook",
            clientId: "dnd-spellbook-frontend"
        });

        keycloakRef.current = keycloak;

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

                const profileResponse = await axios.post(
                    'http://localhost:8080/users/me',
                    {},
                    { headers: { Authorization: `Bearer ${keycloak.token}` } }
                );

                const roles = keycloak.resourceAccess?.['dnd-spellbook-backend']?.roles ?? [];

                setAuth({
                    isAuth: true,
                    token: keycloak.token,
                    user: userInfo,
                    profileId: profileResponse.data.id,
                    roles: roles,
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
        keycloakRef.current?.login();
    }

    function logout() {
        keycloakRef.current?.logout({
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