import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Upload from "./Upload/Upload";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Nav from "./Nav/Nav";
import PostBoard from "./PostBoard/PostBoard";

// TODO change authroized members for diff users
// TODO ADD LOADING ANIMATIONS

function App() {
	const [user, setUser] = useState(undefined);

	useEffect(() => {
		localStorage.clear();
	

	}, []);
	


	return (
		<div className='h-screen bg-amber-50'>
			<ToastContainer
				position='top-center'
				autoClose={2000}
				hideProgressBar
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
			/>
			<Nav/>
			<Routes>
				<Route path='/' element={<PostBoard />} />
				<Route path='/login' element={<Login setUser={setUser} />} />
				<Route path='/register' element={<Register />} />
				<Route path='/upload' element={<Upload user={user} />} />
				<Route path='/mypost' element={<PostBoard user={user} />} />
			</Routes>
		</div>
	);
}

export default App;
