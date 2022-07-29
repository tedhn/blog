import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Nav = () => {
	const navigate = useNavigate();

	const jwtToken = localStorage.getItem("jwt");

	const notify = () => toast(`See you next time!👋`);

	const handleLogout = () => {
		localStorage.clear();
		navigate("/");
		notify();
	};

	return (
		<div className='sticky top-0 bg-amber-50 shadow-md'>
			<div className='container mx-auto flex justify-between items-center gap-4 p-2'>
				<div className='flex justify-around gap-4'>
					<div onClick={() => navigate("/") } className='btn-secondary'>Home</div>
					{jwtToken && <div onClick={() => navigate("/mypost")} className='btn-secondary'>My Posts</div>}
				</div>

				{jwtToken ? (
					<div className='flex justify-around gap-4'>
						<button
							onClick={() => navigate("/upload")}
							className='btn-secondary'>
							Upload
						</button>
						<button onClick={handleLogout} className='btn-primary'>
							Log out
						</button>
					</div>
				) : (
					<div className='flex justify-around gap-4'>
						<button
							onClick={() => navigate("/login")}
							className='btn-secondary'>
							Login
						</button>
						<button
							onClick={() => navigate("/register")}
							className='btn-primary'>
							Register
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Nav;
