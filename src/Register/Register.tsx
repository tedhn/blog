import axios from "axios";
import React, { useEffect, useState } from "react";

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleRegister = async () => {
		const response = await axios.post("http://localhost:1338/api/auth/local", {
			identifier: "dummy@gmail.com",
			password: "Password",
		});

  };

  const verifyPassword = (password:string)=>{}

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
			{/* <input
				type='text'
				placeholder='password'
				value={password}
			/> */}
			<input
				type='text'
				placeholder='password'
				value={password}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setPassword(e.target.value)
				}
			/>

			<button onClick={handleRegister}>Register</button>
		</div>
	);
};

export default Register;
