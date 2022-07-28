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
		<div className='container mx-auto my-10 flex justify-center items-center '>
			<div className='container max-w-md min-w-sm p-6 flex flex-col justify-around gap-9 m-auto shadow-md bg-slate-50 '>
				<h2 className='uppercase text-2xl'>register</h2>
				<div className='flex flex-col gap-3'>
					<div className='flex flex-col'>
						<label htmlFor='username' className='text-xs'>
							Username
						</label>
						<input
							type='text'
							id='username'
							placeholder='Username'
							value={username}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setUsername(e.target.value)
							}
							required
							className='input-primary'
						/>
					</div>
					<div className='flex flex-col'>
						<label htmlFor='email' className='text-xs'>
							Email
						</label>
						<input
							type='text'
							id='email'
							placeholder='Email'
							value={email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setEmail(e.target.value)
							}
							required
							className='input-primary'
						/>
					</div>
					<div className='flex flex-col'>
						<label htmlFor='password' className='text-xs'>
							Password
						</label>
						<input
							type='text'
							id='password'
							placeholder='Password'
							value={password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setPassword(e.target.value)
							}
							className='input-primary'
						/>
					</div>
					<div className='flex flex-col'>
						<label htmlFor='confirm' className='text-xs'>
							Confirm
						</label>

						<input
							type='text'
							id='confirm'
							placeholder='Confirm'
							value={confirm}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setConfirm(e.target.value)
							}
							className='input-primary'
						/>
					</div>
				</div>

				<div className='flex justify-around mt-3'>
					<button onClick={() => navigate("/")}>Back</button>
					<button onClick={handleRegister} className='btn-primary'>
						Register
					</button>
				</div>
			</div>
		</div>
	);
};

export default Register;
