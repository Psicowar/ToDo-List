
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";


const useTodo = () => {
    const { getIdTokenClaims, isAuthenticated } = useAuth0()
    const [token, setToken] = useState("")
    const { REACT_APP_SERVER_URL } = process.env;
    

    useEffect(() => {
        if (isAuthenticated) {
            getIdTokenClaims().then(data => {
                setToken(data.__raw)
            })
        }
    }, [getIdTokenClaims, isAuthenticated])




    const addTodo = async (text) => {
        try {
            const response = await fetch(`${REACT_APP_SERVER_URL}/todo/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ text })
            })
            const data = await response.json()
            return data.data


        } catch (error) {
            console.error(error)
        }
    }


    const getUsersTodos = async () => {
        try {
            const response = await fetch(`${REACT_APP_SERVER_URL}/todo/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })
            const data = await response.json()
            console.log(data);
            return data.data

        } catch (error) {
            console.error(error)
        }
    }


    
        const deleteALlTodos = async () => {
            
            try {
                const response = await fetch(`${REACT_APP_SERVER_URL}/todo/deleteAll/`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                })
                const data = await response.json()
                console.log(data);
            } catch (error) {
                console.error(error)
            }
        }


    const deleteTodo = async (taskID) => {
        try {
            const response = await fetch(`${REACT_APP_SERVER_URL}/todo/deleteOne/${taskID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })
            const data = await response.json()
            return data.data
        } catch (error) {
            console.error(error)
        }
    }



    const updateTodoText = async (taskID, text) => {
        try {
            const response = await fetch(`${REACT_APP_SERVER_URL}/todo/update/${taskID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    text: text
                })
            })
            const data = await response.json()
            return data.data

        } catch (error) {
            console.error(error)
        }
    }


    return {
        addTodo,
        getUsersTodos,
        deleteTodo,
        deleteALlTodos,
        updateTodoText
    }



}

export default useTodo