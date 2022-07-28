import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Register from "./Register/Register";
import Upload from "./Upload/Upload";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Post from "./Post/Post";
import Nav from "./Nav/Nav";

// TODO MOVE NAV TO APP.TSX
// TODO MAKE NEW ROUTE FOR MYPOSTS
// TODO ADD LOADING ANIMATIONS
// TODO make sure bg colors are all the same etc when no images are loaded

function App() {
	const [user, setUser] = useState(undefined);

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
				<Route path='/' element={<Home user={user} />} />
				<Route path='/login' element={<Login setUser={setUser} />} />
				<Route path='/register' element={<Register />} />
				<Route path='/upload' element={<Upload user={user} />} />
				<Route path='/post/:id' element={<Post />} />
			</Routes>
		</div>
	);
}

export default App;
