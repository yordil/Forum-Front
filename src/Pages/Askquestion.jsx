import React, { useRef  , useState} from "react";
import axiosInstance from "../Utility/axios";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";


const AskQuestion = () => {
	const navigate = useNavigate();
	const title = useRef(null);
	const question = useRef(null);
	const [error, setError] = useState(null);

	async function handleSubmit(e) {
		e.preventDefault();
		const titleValue = title.current.value;
		const questionValue = question.current.value;

		if (!titleValue.trim() || !questionValue.trim()) {
			
			setError("Please provide all field");
			return;
		}
		const token = localStorage.getItem("token");
		try {
			await axiosInstance.post(
				"/questions/post-question",
				{
					title: titleValue,
					question: questionValue,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div>
			<Header />
			<div className="font-serif p-16 text-zinc-800">
				<div>
					<p className="text-2xl text-neutral-600 px-40">
						Steps To Ask A Good Question
					</p>
					<br />

					<div className="flex gap-2 flex-col font-mono text-l font-bold px-16">
						<span className="flex gap-3  items-center">
							<FaArrowRight />
							<p>Summarize your problems in a one-line title.</p>
						</span>
						<span className="flex gap-3 items-center">
							<FaArrowRight /> <p>Describe your problem in more detail.</p>
						</span>
						<span className="flex gap-3 items-center">
							<FaArrowRight />{" "}
							<p>Describe what you tried and what you expected to happen</p>
						</span>
						<span className="flex gap-3 items-center">
							<FaArrowRight />{" "}
							<p>Review your question and post it to the site</p>
						</span>
					</div>
				</div>
				<p className="text-3xl opacity-1 text-blue-950 font-serif text-center m-10">
					{" "}
					Post Your Question
				</p>
				<div className="w-4/5 mx-auto">
					<form action="" onSubmit={handleSubmit}>
						<div>
							<label htmlFor="title" id="title" name="title"></label>
							<input
								ref={title}
								type="text"
								id="title"
								name="title"
								placeholder="Title"
								className="w-full h-10 px-3 text-base  placeholder-slate-500 hover:to-blue-600 rounded-lg border border-gray-900 focus:shadow-outline focus:border-blue-500"
							/>

							<br></br>
							<br />
							<textarea
								style={{ resize: "none" }}
								maxLength="200"
								className="w-full h-60 px-3 text-base placeholder-slate-500 hover:to-blue-600 rounded-lg border border-gray-900 focus:shadow-outline focus:border-blue-500"
								ref={question}
								type="text"
								id="question"
								name="question"
								placeholder="write your question in 200 characters"
							/>
							<br></br>
							<p className="text-red-500">{error}</p>
							<button
								type="submit"
								className="my-10  w-full bg-blue-600 text-white h-11 rounded-md hover:bg-blue-700 "
							>
								Post your Question
							</button>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default AskQuestion;
