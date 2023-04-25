import { useAuth0 } from "@auth0/auth0-react"

const LoginPage = () => {
    const { loginWithRedirect } = useAuth0()

    return (
        <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white gap-5">
            <h1>Welcome to your TO-DO app </h1>
            <button className="btn btn-secondary" onClick={loginWithRedirect}>Login</button>
        </div>
    )
}

export default LoginPage