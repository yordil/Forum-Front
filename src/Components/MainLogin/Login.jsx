import React, { useContext, useRef, useState } from "react";
import axiosInstance from "../../Utility/axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/evangadiblack.png";
import background from "../../assets/background.svg";
import Header from "../Header/Header";
import { userState } from "../../App";

import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
// import background from "../../assets/background.svg";

function Login() {
	//
	const userName = useRef(null);
	const firstName = useRef(null);
	const lastName = useRef(null);
	const emaill = useRef(null);
	const passwordd = useRef(null);
	const [res, setres] = useState(null);
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();

	const handleSubmitt = async (e) => {
		e.preventDefault();

		const userNamevalue = userName.current.value;
		const firstNamevalue = firstName.current.value;
		const lastNamevalue = lastName.current.value;
		const emailvalue = emaill.current.value;
		const passwordvalue = passwordd.current.value;

		if (
			!userNamevalue.trim() ||
			!firstNamevalue.trim() ||
			!lastNamevalue.trim() ||
			!emailvalue.trim() ||
			!passwordvalue.trim()
		) {
			setError("Please provide all field");
			return;
		}
		try {
			const response = await axiosInstance.post("/users/register", {
				username: userNamevalue,
				firstname: firstNamevalue,
				lastname: lastNamevalue,
				email: emailvalue,
				password: passwordvalue,
			});
			console.log(response, "*********");
			setRegister(!register);
			setError(null);
			navigate("/login");
		} catch (error) {
			if (error.response && error.response.data && error.response.data.msg) {
				setError(error.response.data.msg); // Set specific error message from backend
			} else {
				setError("Registration failed. Please try again."); // Generic error message
			}
			console.log(error);
		}
	};

	const email = useRef(null);
	const password = useRef(null);

	const { register, setRegister } = useContext(userState);

	const [error, setError] = useState(null);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const emailval = email.current.value;
		const passwordval = password.current.value;

		if (!emailval.trim() || !passwordval.trim()) {
			alert("all field is necessary");
			setError("Please provide all field");
		}

		try {
			const { data } = await axiosInstance.post("/users/login", {
				email: emailval,
				password: passwordval,
			});
			alert("Logegd in successfully");
			localStorage.setItem("token", data.token);
			navigate("/");
		} catch (err) {
			console.log(err);
			setError("Invalid email or password");
			navigate("/Login");
		}
	};

	return (
		// use an svg as a backgroud
		<div style={{ backgroundImage: `url(${background})` }} className="bg-no-repeat bg-cover">
			<div className="mt-56 mb-28 h-96 md: lg:ml-44 ">
				<div className="flex items-center  flex-grow gap-10  ">
					<div className=" lg:w-1/2 shadow-xl p-10 sm:w-[70%] mr-auto ml-auto ">
						{register ? (
							<div className="sm:w-[80%]">
								<div>
									<p className=" text-xl font-bold text-center text-blue-900 mb-2">
										Login into your account
									</p>
									<div className="text-center my-6">
										<span className="text-xl ">Don't have an account? </span>
										<Link
											className="text-xl text-orange-600"
											onClick={() => setRegister(!register)}
										>
											Register
										</Link>
									</div>
									<form className="flex-col" onSubmit={handleSubmit}>
										<input
											className="w-full  h-10 border-2 border-gray-400 rounded-md mb-4"
											type="email"
											ref={email}
											placeholder="Email"
										/>

										<br />
										<span className="relative">
											<input
												className="w-full h-10 pl-3 pr-10 border-2 border-gray-400 rounded-md mb-4"
												type={showPassword ? "text" : "password"}
												ref={password}
												placeholder="Password"
											/>
											{!showPassword ? (
												// Show eye icon if password is visible
												<EyeInvisibleOutlined
													className="absolute mt-3 right-4 cursor-pointer"
													onClick={() => setShowPassword(!showPassword)}
												/>
											) : (
												<EyeOutlined
													className="absolute mt-3 right-4 cursor-pointer"
													onClick={() => setShowPassword(!showPassword)}
												/>
											)}
										</span>

										<br />
										<p className="text-red-500">{error}</p>
										<button
											className="w-full h-10 border-2 bg-blue-600 rounded-md mb-2 text-white"
											type="submit"
										>
											Login
										</button>
									</form>
								</div>
							</div>
						) : (
							<section className="drop-shadow-lg shadow-outline h-96">
								<div className="text-center">
									<p className="text-xl font-bold text-center text-blue-900 mb-2">
										Join the Network
									</p>
									<p className="mb-5">
										Already have an account?{" "}
										<Link
											onClick={() => setRegister(!register)}
											className="text-orange-600"
											to="/login"
										>
											{" "}
											signin{" "}
										</Link>{" "}
									</p>
								</div>
								<form onSubmit={handleSubmitt}>
									<input
										className="w-full  h-10 border-2 border-gray-400 rounded-md mb-4"
										type="text"
										ref={userName}
										placeholder="Username"
									/>
									<br />
									<div className="flex h-7 gap-2">
										<input
											className="w-full h-10 border-2 border-gray-400 rounded-md"
											type="text"
											ref={firstName}
											placeholder="firstname"
										/>
										<br />
										<input
											className="w-full h-10 border-2 border-gray-400 rounded-md"
											type="text"
											ref={lastName}
											placeholder="lastName"
										/>
									</div>
									<br />

									<input
										className="w-full h-10 border-2 border-gray-400 rounded-md mb-2"
										type="email"
										ref={emaill}
										placeholder="email"
									/>
									<br />
									<span className="relative">
										<input
											className="w-full h-10 pl-3 pr-10 border-2 border-gray-400 rounded-md mb-4"
											type={showPassword ? "text" : "password"}
											ref={passwordd}
											placeholder="Password"
										/>
										{!showPassword ? (
											// Show eye icon if password is visible
											<EyeInvisibleOutlined
												className="absolute mt-3 right-4 cursor-pointer items-center"
												onClick={() => setShowPassword(!showPassword)}
											/>
										) : (
											<EyeOutlined
												className="absolute mt-3 right-4 cursor-pointer"
												onClick={() => setShowPassword(!showPassword)}
											/>
										)}
									</span>
									<br />
									<p className="text-red-500">{error}</p>
									<button
										className="w-full h-10 border-2 bg-blue-600 rounded-md mb-2 text-white"
										type="submit"
									>
										SignUp
									</button>
								</form>
								<div className="text-center text-orange-600">
									<Link onClick={() => setRegister(!register)}>
										Already have an account
									</Link>
								</div>
							</section>
						)}
					</div>
					<div className="w-1/2 sm:hidden lg:inline mr-44 ">
						<h2 className="text-yellow-600 text-3xl ">About</h2>
						<h2 className="h-14 text-4xl font-bold bg-gradient-to-r from-yellow-800 via-yellow-600 to-yellow-900 bg-clip-text text-transparent">
							Evangadi Networks
						</h2>
						<div className="text-md text-gray-500 :hidden">
							No matter what stage of life you are in, whether you’re just
							starting elementary school or being promoted to CEO of a Fortune
							500 company, you have much to offer to those who are trying to
							follow in your footsteps. <br />
							Weather you are willing to share your knowledge or you are just
							looking to meet mentors of your own, please start by joining the
							network here.
							<br />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
