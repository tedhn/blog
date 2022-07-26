import React from "react";
import { useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Blog from "../Main/Main";
import Input from "../Upload/Upload";

const Home = () => {
	const navigate = useNavigate();
	const jwtToken = localStorage.getItem("jwt") || undefined;

	const handleLogout = () => {
		localStorage.clear();
		navigate("/");
	};

	return (
		<div>
			<div className='container mx-auto flex justify-end gap-4 p-2'>
				{jwtToken ? (
					<>
						<button onClick={() => navigate("/upload")} className='text-black'>
							Upload
						</button>
						<button
							onClick={handleLogout}
							className='text-white bg-slate-900 px-4 py-2 rounded-md'>
							Log out
						</button>
					</>
				) : (
					<>
						<button onClick={() => navigate("/login")} className='text-black'>
							Login
						</button>
						<button
							onClick={() => navigate("/register")}
							className='text-white bg-slate-900 px-4 py-2 rounded-md'>
							Register
						</button>
					</>
				)}
			</div>

			<Main />
		</div>
	);
};

export default Home;
