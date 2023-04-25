import closeSVG from "../../assets/imgs/close.icon.svg";
import editSVG from "../../assets/imgs/edit.icon.svg";
import "./Wish.css";
import { useWishListContext } from "../../context/WishListProvider.jsx";
import useTodo from "../../hooks/useTodo";
import Swal from "sweetalert2";


const Wish = ({ wish }) => {

	const { wishList, setWishList } = useWishListContext()
	const { deleteTodo, updateTodoText } = useTodo()

	
	const handleSetDeleteWish = (e) => {
		if (wishList.length > 0) {
			Swal.fire({
				title: 'Are you sure you want to delete this task??',
				showDenyButton: true,
				confirmButtonText: 'Delete',
				denyButtonText: `Cancel`,
				confirmButtonColor: '#892716',
				denyButtonColor: '#212529',
				color: '#212529',
				background: '#6c757d'
			}).then((result) => {
				if (result.isConfirmed) {
					deleteTodo(e)
					Swal.fire({
						title: 'Saved!',
						background: '#6c757d',
						icon: 'success',
						confirmButtonColor: '#212529',
					})
				} else if (result.isDenied) {
					Swal.fire({
						title: 'Changes are not saved',
						confirmButtonColor: '#212529',
						background: '#6c757d',
						icon: 'info'
					})
				}
			})
		} else {
			Swal.fire({
				icon: 'info',
				title: "Nothing to delete",
				background: '#6c757d',
				color: '#212529',
				confirmButtonColor: '#212529',
			});
		}
	}


	const handleEditModal = async (e) => {
		const { value } = await Swal.fire({
			title: 'Edit task',
			input: 'text',
			inputValue: wish.text,
			background: '#6c757d',
			color: '#212529',
			confirmButtonColor: '#212529',
		})
		if (value) {
			const updatedWishList = wishList.map(item => {
				if (item._id === e) {
					wish.text = value
				};
				return item
			})
			updateTodoText(e, value)
			setWishList(updatedWishList)

		} else {
			Swal.fire({
				icon: 'error',
				title: "You can't add a blank task",
				background: '#6c757d',
				color: '#212529',
				confirmButtonColor: '#212529',
			});
		}
	}


	return (

		<div className="d-flex align-items-center justify-content-between">
			<div className="d-flex align-items-center justify-content-between border-bottom border-secondary w-100 rounded-1 p-1">
				<p className={"m-0 p-2 text-secondary w-100 " + (wish.done && "text-decoration-line-through")}>
					{wish.text}
				</p>
				<img onClick={() => handleEditModal(wish._id)} className="edit__icon m-2" src={editSVG} alt="Edit icon" />
				<img onClick={() => handleSetDeleteWish(wish._id)} className="close__icon m-2" src={closeSVG} alt="Close icon" />
			</div>
		</div>

	)
};

export default Wish;
