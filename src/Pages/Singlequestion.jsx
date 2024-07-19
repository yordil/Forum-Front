import React, { useContext, useEffect, useState, useRef } from "react";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import { Link } from "react-router-dom";
import { userState } from "../App";
import axiosInstance from "../Utility/axios";
import { useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Answercard from "../Components/AnswerCard/Answercard";
import Snackbar from "@mui/material/Snackbar";



const Singlequestion = () => {

	 const [open, setOpen] = useState(false);

		
		
		const handleClose = (event, reason) => {
			if (reason === "clickaway") {
				return;
			}
			setOpen(false);
		};


	const [text , setText] = useState("")

	const [question, setQuestion] = useState(null);
	const [answers, setAnswers] = useState(null);
	const [error , setError] = useState(null);
	const id = useParams().id;
	const ans = useRef();
	async function handleSubmit(e) {
		e.preventDefault();
		const answerValue = ans.current.value;
		if (!answerValue.trim()) {
			setError("Please write the answer");
			return;
		}

		try {
			

			setText("")
			const token = localStorage.getItem("token");
			await axiosInstance.post(
				`/answer/${id}`,
				{
					answer: answerValue,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setOpen(true);
			setTimeout(function () {
				window.location.reload();
			}, 3000);
			
		} catch (err) {
			console.log(err);
		}
		setAnswers([...answers, { answer: answerValue }]);
		
		

	}

	const fetchQuestion = async () => {
		try {
			const response = await axiosInstance.get(`/questions/${id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			
			setQuestion(response.data.question);
			setAnswers(response.data.answers);
			
		} catch (err) {
			console.log(err);
		}
	};

	
	// add the effect when post answer button clicked
	useEffect(() => {
		fetchQuestion();
	}, [] , );

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<div className="flex-grow">
				<div>
					{console.log(answers)}
					<div>
						{/* Displaying question title and description */}
						{question && (
							<div className="w-[70%] ml-auto mr-auto mb-8">
								<div className="text-xl mb-6 font-serif">Question</div>
								<div className="flex gap-2 items-center text-3xl font-semibold  ">
									<FaArrowRight />
									<h2>{question[0].title}</h2>
								</div>

								<p className="px-10 mt-3 text-xl ml-10">
									{question[0].description}
								</p>
							</div>
						)}

						<div className="w-[70%] ml-auto mr-auto mb-8">
							<hr className="w-[90%] border-1 border-gray-600"></hr>
							<div className="mt-2 mb-2">Answers From The Community</div>
							<hr className="w-[90%] border-1 border-gray-600"></hr>
						</div>

						{/* Displaying answer */}
						{answers && answers.length > 0 ? (
							answers.map((answer, index) => (
								<Answercard
									key={index}
									username={answer.username}
									answer={answer.answer}
								/>
							))
						) : (
							<div>
								<p className="text-4xl text-center font-serif text-gray-700">
									Be the first to answer this question
								</p>
							</div>
						)}

						{/* Form to post answer */}

						<form onSubmit={handleSubmit} className="mx-auto w-4/5">
							<p className="text-3xl text-center my-10 font-serif text-gray-700">
								Type Your Answer Here
							</p>
							<textarea
								style={{ resize: "none" }}
								ref={ans}
								type= "text"
								id="answer"
								name="answer"
								className="w-full h-40 placeholder-slate-500 hover:to-blue-600 rounded-lg border border-gray-900 focus:shadow-outline focus:border-blue-500"
								placeholder="write your answer here"
							/>
							{error && <p className="text-red-500">{error}</p>}

							<div>
								<button
									className="text-2xl font-serif text-white bg-blue-500 w-full text-center h-14 rounded-md hover:bg-blue-600 my-10"
									type="submit"
									onClick={handleSubmit}
								>
									POST YOUR ANSWER
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<Footer className="mt-auto" />
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={open}
				onClose={handleClose}
				message=" Your answer Posted successfully"
				autoHideDuration={3000}
				key={"topcenter"}
			/>
			;
		</div>
	);
};

export default Singlequestion;
