import axios from "axios";
import React, { useEffect } from "react";

const Blog = () => {
	useEffect(() => {
		getPost();
	}, []);

	const getPost = async () => {
		const jwtToken = localStorage.getItem("jwt");

		const reponse = await axios.get(
			`http://localhost:1338/api/posts?fields=caption&populate=image&Authorization=Bearer=${jwtToken}`
		);

		console.log(reponse);
	};

	return <div>Blog</div>;
};

export default Blog;
