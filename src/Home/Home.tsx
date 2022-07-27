import React from "react";
import { useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import { toast } from "react-toastify";

const Home = () => {
	const navigate = useNavigate();
	const jwtToken = localStorage.getItem("jwt") || undefined;

	const notify = () => toast(`See you next time!👋`);

	const handleLogout = () => {
		localStorage.clear();
		navigate("/");
		notify();
	};

	return (
		<div>
			<div className='container mx-auto flex justify-between items-center gap-4 p-2'>
				<div className='flex justify-around gap-4'>
					<div>Home</div>
					<div>My Posts</div>
				</div>

				{jwtToken ? (
					<div className='flex justify-around gap-4'>
						<button onClick={() => navigate("/upload")} className='text-black'>
							Upload
						</button>
						<button
							onClick={handleLogout}
							className='text-white bg-slate-900 px-4 py-2 rounded-md'>
							Log out
						</button>
					</div>
				) : (
					<div className='flex justify-around gap-4'>
						<button onClick={() => navigate("/login")} className='text-black'>
							Login
						</button>
						<button
							onClick={() => navigate("/register")}
							className='text-white bg-slate-900 px-4 py-2 rounded-md'>
							Register
						</button>
					</div>
				)}
			</div>

			<Main />
		</div>
	);
};

export default Home;
