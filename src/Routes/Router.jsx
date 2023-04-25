import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBarComponent from "../components/NavBarComponent/NavBarComponent.jsx"
import AllWishesPage from "../Pages/AllWishesPage.jsx"
import CompletedWishesPage from "../Pages/CompletedWishesPage.jsx"
import ActiveWishesPage from "../Pages/ActiveWishesPage.jsx"
import { Puff } from "react-loader-spinner"
import { useAuth0 } from "@auth0/auth0-react"
import LoginPage from "../Pages/LoginPage.jsx"
import ErrorPage from "../Pages/ErrorPage.jsx"
import PrivateRoute from "./Private/Private.Routes.js"



const Router = () => {
  const { isLoading } = useAuth0()


  if (isLoading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-secondary">
        <Puff
          height="80"
          width="80"
          radius="9"
          ariaLabel="loading"
          color="#212529"
        />
      </div>
    )
  }
  
  return (
    <BrowserRouter>
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/wishes/all" element={<AllWishesPage status='all' />} />
          <Route path="/wishes/active" element={<ActiveWishesPage status='active' />} />
          <Route path="/wishes/completed" element={<CompletedWishesPage status='completed' />} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router