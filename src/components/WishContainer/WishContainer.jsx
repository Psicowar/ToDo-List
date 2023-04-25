import WishList from "../WishList/WishList.jsx";
import CountAllWishes from "../CountAllWishes/CountAllWishes.jsx";
import { ListButton } from "../ButtonComponent/ButtonComponent.jsx";
import useTodo from "../../hooks/useTodo.jsx"
import { NavLink } from "react-router-dom";
import { useWishListContext } from "../../context/WishListProvider.jsx";
import "./WishContainer.css"
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";


const WishContainer = ({ status }) => {
	const { wishList, setWishList } = useWishListContext()
	const { addTodo, getUsersTodos, deleteALlTodos } = useTodo();
	const { register, handleSubmit, reset } = useForm()

	const onSubmit = async (data) => {
		const newTask = {
			text: data.text,
			status: "active",
		}
		if (newTask.text === '') {
			Swal.fire({
				icon: 'error',
				title: "You can't add a blank task",
				color: '#212529',
				confirmButtonColor: '#212529',
				background: '#6c757d'
			});
			return;
		} else {
			await addTodo(data.text)
			const userTodos = await getUsersTodos()
			setWishList(userTodos)
			reset()
		}
	}

	const handleSetDeleteAll = async () => {
		if (wishList.length > 0) {
			Swal.fire({
				title: 'Are you sure you want to delete everything??',
				showDenyButton: true,
				confirmButtonText: 'Delete',
				denyButtonText: `Cancel`,
				confirmButtonColor: '#892716',
				denyButtonColor: '#212529',
				color: '#212529',
				background: '#6c757d'
			}).then((result) => {
				if (result.isConfirmed) {
					deleteALlTodos()
					setWishList([])
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



	return (
		<div className="min-vh-100 d-flex bg-dark">
			<div className="container d-flex flex-column mw-100 p-3 border border-secondary" >
				<h6 className="text-secondary text-center m-0 p-2 fs-3">TO-DO List (React-App)</h6>
				<div className="d-flex justify-content-between p-2">
					<CountAllWishes />
					<div className="d-flex align-items-center justify-content-between ">
						<button className='delete__completed text-secondary m-2 btn border border-secondary' onClick={() => handleSetDeleteAll()}>
							Delete Completed
						</button>
					</div>
				</div>
				<div className="m-3  border-secondary">
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							type="text"
							className="input__wish bg-secondary text-dark w-100 p-1 "
							placeholder="Add new to-do"
							{...register("text")}
						/>
					</form>
				</div>
				<WishList status={status} />
			</div>
		</div>
	)
};

export default WishContainer;  
