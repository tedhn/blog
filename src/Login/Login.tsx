import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async () => {
		const response = await axios.post("http://localhost:1338/api/auth/local", {
			identifier: "dummy@gmail.com",
			password: "Password",
		});

		localStorage.setItem("jwt", response.data.jwt);

		navigate("/");
	};

	return (
		<div>
			<input
				type='text'
				placeholder='username'
				value={username}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setUsername(e.target.value)
				}
			/>
			<input
				type='text'
				placeholder='password'
				value={password}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setPassword(e.target.value)
				}
			/>

			<button onClick={handleLogin}>Login</button>
		</div>
	);
};

export default Login;
