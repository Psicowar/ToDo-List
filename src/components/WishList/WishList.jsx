import Wish from "../Wish/Wish";
import emptyList from "../../assets/imgs/diary.ilustration.svg"
import "./WishList.css"
import { useEffect } from "react";
import { useWishListContext } from "../../context/WishListProvider.jsx";
import useTodo from "../../hooks/useTodo";


const WishList = ({ handleSetOverWrite }) => {
	const { getUsersTodos } = useTodo()
	const { wishList, setWishList } = useWishListContext()




	// useEffect(() => {
	// 		getUsersTodos().then(data => {
	// 			setWishList(data)
	// 		})
	// }, )


	if (wishList && wishList.length === 0) {
		return (
			<div className="d-flex justify-content-center align-items-center h-100">
				<img className="list__img" src={emptyList} alt="Diary ilustration" />
			</div>
		)
	} else {
		return (
			<ul className="d-flex flex-column overflow-hidden p-0" >
				{
					wishList && wishList.map(wish => {
						return (
							<li key={wish._id} className='m-0'>
								<Wish
									wish={wish}
									handleSetOverWrite={handleSetOverWrite}
								/>
							</li>
						)
					})
				}
			</ul>
		)
	}


};

export default WishList;
