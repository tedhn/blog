import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import { toast } from "react-toastify";

interface propsType {
	user: any;
}

const Home: React.FC<propsType> = ({ user }) => {
	const navigate = useNavigate();


;

	useEffect(() => {
		console.log(user);
	});

	return (
		<div>
		

			<Main userId={user?.id} />
		</div>
	);
};

export default Home;
