import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
const { REACT_APP_SERVER_URL } = process.env;


const useUser = () => {
    const { getIdTokenClaims, user, isAuthenticated } = useAuth0()
    const [token, setToken] = useState("")

    useEffect(() => {
        isAuthenticated &&
            getIdTokenClaims().then(data => {
                if (data.__raw !== undefined)
                    setToken(data.__raw)
            })
            console.log(token);
    }, [getIdTokenClaims, isAuthenticated, token])

    

    
    const checkUser = useCallback(
        async () => {
            try {
                if (token && isAuthenticated) {
                    const response = await fetch(`${REACT_APP_SERVER_URL}/user/check`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({ name: user.name, email: user.email, picture: user.picture })
                    })
                    const data = await response.json()
                    console.log(data);
                    return data.data
                }

            } catch (error) {
                console.error(error)
            }
        },
        [token, user, isAuthenticated]
    )

    return checkUser
    
}

export default useUser
