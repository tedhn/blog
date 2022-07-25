import React from "react";
import { useNavigate } from "react-router-dom";
import Blog from "../Blog/Blog";

const Home = () => {
	const navigate = useNavigate();
	const jwtToken = localStorage.getItem("jwt") || undefined;

	return (
		<div>
			<div className='signup'>
				<button onClick={() => navigate("/login")}>Login</button>
				<button onClick={() => navigate("/register")}>Register</button>
			</div>

			{jwtToken && <Blog />}
		</div>
	);
};

export default Home;
