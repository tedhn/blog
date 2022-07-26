import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Register from "./Register/Register";
import "./App.css";
import Upload from "./Upload/Upload";

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/upload' element={<Upload />} />
			</Routes>
		</div>
	);
}

export default App;
