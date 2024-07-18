import React, { useContext } from "react";
import evangadi from "../../assets/evangadiblack.png";
import { Link, useNavigate } from "react-router-dom";
import { userState } from "../../App";

const Header = () => {
	const navigate = useNavigate();
	const { user } = useContext(userState);
	console.log(user)
	function logout() {
		localStorage.removeItem("token");
		window.location.reload();
		user = {};
		navigate("/Login");
	}

	const { register,  setregister } = useContext(userState);
	console.log(user , "*********");

	return (
		<div className="flex justify-around items-center mt-10 shadow-xl">
			<Link to={user ? "/" : "/login"}>
				<img src={evangadi} className="m-3" alt="evangadilogo" />
			</Link>
			<Link  to="/" className=" text-2xl font-mono font-semibold sm:hidden md:inline">
				How it works
			</Link>
			{user.username ? (
				<button
					onClick={logout}
					className="w-20 h-8 rounded-md bg-blue-600 text-white text-l"
				>
					<Link onClick={() => setregister(!register)}>Logout</Link>
				</button>
			) : (
				<button className="w-24 h-10 rounded-md bg-blue-600 text-white text-xl">
					
					<Link onClick={() => setregister(!register)}>Login</Link>
				</button>
			)}
		</div>
	);
};

export default Header;
