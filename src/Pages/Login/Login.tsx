import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import { toast } from "react-toastify";

interface propsType {
	setUser: any;
}

const Login: React.FC<propsType> = ({ setUser }) => {
	const [email, setEmail] = useState("ted@gmail.com");
	const [password, setPassword] = useState("123123");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const notifySuccess = (user: string) =>
		toast.success(`Welcome back, ${user}! 😄`);
	const notifyFailure = (msg: string) => toast.error(msg);

	const handleLogin = async () => {
		setIsLoading(true);
		try {
			const response = await axios.post(
				"http://localhost:1338/api/auth/local",
				{
					identifier: email,
					password: password,
				}
			);

			localStorage.setItem("jwt", response.data.jwt);
			localStorage.setItem("user", response.data.user.id);
			navigate("/");
			notifySuccess(response.data.user.username);
			setUser(response.data.user);
			setIsLoading(false);
		} catch (e: any) {
			switch (e.response.status) {
				case 400: {
					setIsLoading(false);
					notifyFailure("Incorrect credentials.");
					break;
				}
				default: {
					setIsLoading(false);
					notifyFailure("Error occured while logging in.");
				}
			}
		}
	};

	return (
		<div className='container mx-auto my-10 flex justify-center items-center'>
			<div className='container max-w-md min-w-sm  p-6 flex flex-col justify-around gap-9 mx-auto bg-slate-50 shadow-xl'>
				<h2 className='uppercase text-2xl mx-auto'>Login</h2>
				<div className='flex flex-col gap-3'>
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
							className='input-primary'
						/>
					</div>
					<div className='flex flex-col'>
						<label htmlFor='password' className='text-xs'>
							Password
						</label>
						<input
							type='text'
							placeholder='Password'
							value={password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setPassword(e.target.value)
							}
							className='input-primary'
						/>
					</div>
				</div>

				{isLoading ? (
					<div className='mx-auto'>
						<ClimbingBoxLoader size={10}/>
					</div>
				) : (
					<div className='flex justify-around mt-3'>
						<button className='btn-secondary' onClick={() => navigate("/")}>
							Back
						</button>
						<button className='btn-primary' onClick={handleLogin}>
							Login
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Login;
