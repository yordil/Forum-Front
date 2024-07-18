import "./App.css";
import React, { useEffect, useState, createContext } from "react";
import {

	Route,
	Routes,
	useNavigate,
} from "react-router-dom";
import Home from "./Pages/Homepage";
import AskQuestion from "./Pages/Askquestion";
import axiosInstance from "./Utility/axios";
import SingleQuestion from "./Pages/Singlequestion";
import Login from "./Pages/Loginpage";

export const userState = createContext();

function App() {
	const [register, setRegister] = useState(true);
	const token = localStorage.getItem("token");
	const navigate = useNavigate();
	const [user, setUser] = useState({});

		const checkUser = async () => {
			try {
				const { data } = await axiosInstance.get("/users/check", {
					headers: {
						Authorization: "Bearer " + token,
					},
				});
				setUser(data);
			} catch (error) {
				console.log(error);
				navigate("/login");

			}
		};
	
		useEffect(() => {
	
		checkUser();
	}, [token]);

	return (
		<userState.Provider value={{ user, setUser, register, setRegister }}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/post-question" element={<AskQuestion />} />
				<Route path="/SingleQuestion/:id" element={<SingleQuestion />} />
			</Routes>
		</userState.Provider>
	);
}

export default App;
