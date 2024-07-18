import React from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
// importing image
import evangadi from "../../assets/evangadiwhite.png";
import { Link } from "react-router-dom";
const Footer = () => {
	return (
		<div className=" bg-slate-600  text-white h-52">
			<div className="">
				<div className="flex  justify-around items-center ">
					<div className=" items-center ">
						<img src={evangadi} alt="evangadi" />
						<br />
						<div className="flex justify-around ">
							<Link>
								<FacebookRoundedIcon />
							</Link>
							<Link>
								<InstagramIcon />
							</Link>
							<Link>
								<YouTubeIcon />
							</Link>
						</div>
					</div>
					<div>
						<p className="font-bold text-xl my-5">Useful Links</p>

						<div className=" text-xl  flex flex-col gap-1">
							<Link to="#">How it works</Link>
							<Link to="#">Terms and conditions</Link>
							<Link to="#">Privacy policy</Link>
						</div>
					</div>
					<div>
						<p className="font-bold my-5">Contact info</p>
					
						<div className="flex flex-col gap-1 text-xl">
							<Link to="evangadi.com">Evangadi Networks</Link>
							<Link to="#"> support@evangadi.com </Link>
							<Link to="#">+1 102 386 2702</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
