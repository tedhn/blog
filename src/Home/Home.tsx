import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostBoard from "../PostBoard/PostBoard";

interface propsType {
	user: any;
}

const Home: React.FC<propsType> = ({ user }) => {
	useEffect(() => {
		console.log(user);
	});

	return (
		<div>
			<PostBoard />
		</div>
	);
};

export default Home;
