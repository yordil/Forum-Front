import React from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userState } from "../App";
import axiosInstance from "../Utility/axios";
import Header from "../Components/Header/Header";
import QuestionCard from "../Components/QuestionCard/QuestionCard";
import Footer from "../Components/Footer/Footer";

function Homepage() {
	const { user } = useContext(userState);
	const location = useLocation();
	
	const [data, setData] = useState([]);
	const [singleQuestion, setSingleQuestion] = useState(null);
	async function allquestions() {
		try {
			const { data } = await axiosInstance.get("/questions/all-questions", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			setData(data);
			data.sort((a, b) => b.id - a.id);
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	}

	function logout() {
		localStorage.removeItem("token");
		window.location.reload();
	}

	useEffect(
		() => {
			allquestions();
		},
		[],
		[location]
	);

	return (
		<div>
			<Header />

			<div className="sm-block mt-10 md:flex w-[70%] ml-auto mr-auto mb-8 justify-between ">
				<div className="sm:hidden md:inline bg-blue-600 w-40 text-l rounded-md text-white h-8 text-center ">
					<p className="mt-1 ">Welcome {user.username}</p>
				</div>
				<Link className to="/post-question">
					<button className="sm:items-center md:inline bg-blue-600 w-40 text-l rounded-md text-white h-8">
						Ask Question
					</button>
				</Link>
			</div>

			{/* sorting by id number reversly */}

			{data && data.length > 0 ? (
				data.map((item, key) => (
					<QuestionCard
						id={item.questionid}
						username={item.username}
						title={item.title}
					/>
				))
			) : (
				<p>no data</p>
			)}

			<div className="mt-10">
				<Footer />
			</div>
		</div>
	);
}
export default Homepage;
