import React from 'react';
import Header from '../Components/Header/Header';
import Login from '../Components/MainLogin/Login';
import Footer from '../Components/Footer/Footer';

const Loginpage = () => {
  return (
		<div className="flex flex-col flex-grow" >
			{/* <Header /> */}
			<Login />
			<Footer />
		</div>
	);
}

export default Loginpage;
