import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");

	const navigate = useNavigate();

	const notifySuccess = () => toast.success(`Welcome ${username}! 🎉`);
	const notifyFailure = (msg: string) => toast.error(msg);

	const handleRegister = async () => {
		if (verifyPassword()) {
			try {
				const response = await axios.post(
					"http://localhost:1338/api/auth/local/register",
					{
						username,
						password,
						email,
					}
				);

				localStorage.setItem("jwt", response.data.jwt);
				navigate("/");
				notifySuccess();
			} catch (e: any) {
				switch (e.response.status) {
					case 400: {
						notifyFailure("Incorrect credentials format.");
						break;
					}
					default: {
						notifyFailure("Error occured while registering.");
					}
				}
			}
		} else {
			notifyFailure("Passwords do not match.");
		}
	};

	const verifyPassword = () => password === confirm;

	return (
		<div className='container h-screen mx-auto flex justify-center items-center'>
			<div className='container max-w-sm p-6 flex flex-col justify-around gap-9 shadow-md m-auto'>
				<h2 className='uppercase text-2xl'>register</h2>
				<div className='flex flex-col gap-3'>
					<input
						type='text'
						placeholder='username'
						value={username}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setUsername(e.target.value)
						}
						required
						className='px-1 py-2 border-solid border-b-2 border-slate-500 outline-0'
					/>{" "}
					<input
						type='text'
						placeholder='email'
						value={email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
						required
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
					<input
						type='text'
						placeholder='confirm password'
						value={confirm}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setConfirm(e.target.value)
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
						onClick={handleRegister}>
						Register
					</button>
				</div>
			</div>
		</div>
	);
};

export default Register;
