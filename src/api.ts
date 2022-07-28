import axios from "axios";

const uploadImage = async (image: File) => {
	try {
		let formData = new FormData();

		formData.append("files", image);

		const response = await axios.post(
			`http://localhost:1338/api/upload`,
			formData,
			{
				headers: { "Content-Type": "multipart/form-data" },
			}
		);

		return response;
	} catch (e: any) {
		return e;
	}
};

const createPost = async (imageId: number, caption: string, userId: number) => {
	axios.post("http://localhost:1338/api/posts", {
		data: { caption, imageId, user: userId },
	});
};

const getPost = async () => {
	const jwtToken = localStorage.getItem("jwt");

	const { data } = await axios.get(
		`http://localhost:1338/api/posts?fields=caption,imageId&populate=user&Authorization=Bearer ${jwtToken}`
	);

	getImage();
	console.log(data);
	// setPosts(data.data);
	return data.data;
};

const getImage = async () => {
	const { data } = await axios.get(`http://localhost:1338/api/upload/files`);
	console.log(data);

	return data;
};
const getThatImage = async (imageId: number) => {
	const { data } = await axios.get(
		`http://localhost:1338/api/upload/files/${imageId}`
	);
	console.log(data);

	return data;
};

const getUserPost = async (userId: number) => {
	const { data } = await axios.get(
		`http://localhost:1338/api/users/${userId}?populate=posts`
	);

	const imageData = await data.posts.map(async (post: any, index: number) => {
		const image = await getThatImage(post.imageId);

		return image;
	});

	return imageData;
};
export {
	uploadImage,
	createPost,
	getPost,
	getImage,
	getUserPost,
	getThatImage,
};
