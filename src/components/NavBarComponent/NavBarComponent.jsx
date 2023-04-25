import { NavLink, useLocation } from 'react-router-dom';
import "./NavBarComponent.css"
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from 'react';


const NavBarComponent = () => {
	const { user, logout, isAuthenticated } = useAuth0();
	const [showPath, setShowPath] = useState("All")
	const { pathname } = useLocation()

	const handleLogout = () => {
		logout({ logoutParams: { returnTo: window.location.origin } })
	}


	useEffect(() => {
		if (pathname.includes("active")) {
			setShowPath("Active")
		} else if (pathname.includes("completed")) {
			setShowPath("Completed")
		}
		else {
			setShowPath("All")
		}
	}, [pathname])



	return (
		isAuthenticated &&
		<nav className="navbar p-0 d-flex justify-content-center sticky-top">
			<div className="container-fluid bg-secondary" >
				<img src={user.picture} alt="Name of logged user" className='rounded img_style' />
				<div className='d-flex flex-row justify-content-center align-items-center gap-4 data_container'>

					<span className='fs-3'>Welcome {user.name}😀!</span>
				</div>
				<div className=' d-flex justify-content-end'>
					<button className='btn btn-dark text-secondary hover:text-dark ' onClick={handleLogout}>
						Log Out
					</button>
				</div>
			</div>
		</nav>
	)
};

export default NavBarComponent;
