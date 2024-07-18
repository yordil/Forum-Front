import React from 'react';
import avatar  from "../../assets/avatar.svg";
const answercard = ({ username , answer}) => {
  return (
    <>
		<div>
			<div className="w-[70%] ml-auto mr-auto">
				<div className="flex items-center text-center">
					<div>
						<img src={avatar}></img>
						{username && <h2 className="">{username}</h2>}
					</div>
					<div className="ml-10 text-xl">{answer && <p>{answer}</p>}</div>
				</div>
				<hr className='w-[90%] border-1 border-gray-600"'></hr>
			</div >
		</div>
    <div className='mb-4'>

    </div>
    </>
   
	);
}

export default answercard;
