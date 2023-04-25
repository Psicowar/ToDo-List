import { useContext, createContext, useEffect } from "react";
import { useState } from "react";
import useTodo from "../hooks/useTodo"

export const WishListContext = createContext(null)

const WishListProvider = ({ children }) => {

	const [wishList, setWishList] = useState([])


	
	
	return (
		<WishListContext.Provider value={{ wishList, setWishList }}>
			{children}
		</WishListContext.Provider>
	)
};


export const useWishListContext = () => {
	const context = useContext(WishListContext)
	if (!context) {
		throw new Error('Error provider')
	}
	return context
}


export default WishListProvider;

