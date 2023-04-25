import React from 'react'
import { Link } from 'react-router-dom'
import errorPageImg from "../assets/imgs/undraw_page_not_found_re_e9o6.svg"

const ErrorPage = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100 fs-1 bg-secondary'>
        <img src={errorPageImg} alt="Error 404 ilustration"></img>
        <p>Page doesn't exist, go back</p>
        <Link to={"/"}><button className="btn btn-dark btn-lg">Go back</button></Link>
    </div>
  )
}

export default ErrorPage