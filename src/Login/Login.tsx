import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
	const [email, setEmail] = useState("ted@gmail.com");
	const [password, setPassword] = useState("123123");
	const navigate = useNavigate();

	const notifySuccess = (user: string) =>
		toast.success(`Welcome back, ${user}! 😄`);
	const notifyFailure = (msg: string) => toast.error(msg);

	const handleLogin = async () => {
		try {
			const response = await axios.post(
				"http://localhost:1338/api/auth/local",
				{
					identifier: email,
					password: password,
				}
			);

			console.log(response.data);

			localStorage.setItem("jwt", response.data.jwt);
			navigate("/");
			notifySuccess(response.data.user.username);
		} catch (e: any) {
			switch (e.response.status) {
				case 400: {
					notifyFailure("Incorrect credentials.");
					break;
				}
				default: {
					notifyFailure("Error occured while logging in.");
				}
			}
		}
	};

	return (
		<div className='container h-screen mx-auto flex justify-center items-center'>
			<div className='container w-1/3 min-w- max-w-sm p-6 flex flex-col justify-around gap-9 shadow-xl m-auto'>
				<h2 className='uppercase text-2xl'>Login</h2>
				<div className='flex flex-col gap-3'>
					<input
						type='text'
						placeholder='email'
						value={email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
						className='px-1 py-2 border-solid border-b-2 border-slate-500 outline-0'
					/>
					<input
						type='text'
						placeholder='password'
						value={password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPassword(e.target.value)
						}
						className='px-1 py-2 border-solid border-b-2 border-slate-500 outline-0'
					/>
				</div>

				<div className='flex justify-around mt-3'>
					<button className='text-black' onClick={() => navigate("/")}>
						Back
					</button>
					<button
						className='text-white bg-slate-900 px-4 py-2 rounded-md'
						onClick={handleLogin}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
