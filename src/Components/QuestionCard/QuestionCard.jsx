import React from "react";
import avatar from "../../assets/avatar.svg";
import { Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";

const QuestionCard = ({ id, username, title }) => {
	return (
		<>
		<Link to={`/singleQuestion/${id}`}>
		<div className="question-card   mt-8 rounded-md hover:shadow-lg p-4  mx-auto border border-t-0 xl:w-[80%] ">
			<div className="flex items-center  justify-between p-4">
				<div className="avatar">
					<img src={avatar} alt="Avatar" />
					<h2 className="font-semibold text-xl">{username}</h2>
				</div>
				<div className="question-title  text-2xl font-semibold ">
					{title}
				</div>
				<div className="">
					<MdNavigateNext size={50} />
				</div>
			</div>
		</div>
		</Link>
		</>
	);
};

export default QuestionCard;
