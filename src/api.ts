import axios from "axios";

const uploadImage = async (image: File) => {
	const jwtToken = localStorage.getItem("jwt");

	try {
		let formData = new FormData();

		formData.append("files", image);

		const response = await axios.post(
			`http://localhost:1338/api/upload`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${jwtToken}`,
				},
			}
		);

		return response;
	} catch (e: any) {
		return e;
	}
};

const createPost = async (imageId: number, caption: string, userId: number) => {
	const jwtToken = localStorage.getItem("jwt");
	axios.post(
		"http://localhost:1338/api/posts",
		{
			data: { caption, imageId, user: userId },
		},
		{
			headers: {
				Authorization: `Bearer ${jwtToken}`,
			},
		}
	);
};

const getPost = async () => {
	const jwtToken = localStorage.getItem("jwt");

	const postData = await axios.get(
		`http://localhost:1338/api/posts?fields=caption,imageId&populate=user&Authorization=Bearer ${jwtToken}`
	);

	const imageData = await getImage();

	const posts = postData.data.data.map((post: any, index: number) => ({
		caption: post.attributes.caption,
		url: imageData[index].url,
		id: post.id,
	}));

	return posts;
};

const getImage = async () => {
	const { data } = await axios.get(`http://localhost:1338/api/upload/files`);

	return data;
};
const getThatImage = async (imageId?: number) => {
	const { data } = await axios.get(
		`http://localhost:1338/api/upload/files/${imageId}`
	);
	return data;
};

const getUserPost = async (userId: number) => {
	const { data } = await axios.get(
		`http://localhost:1338/api/users/${userId}?populate=posts`
	);

	const postData = await Promise.all(
		data.posts.map(async (post: any, index: number) => {
			const imageData = await getThatImage(post.imageId);

			return { caption: post.caption, url: imageData.url, id: post.id };
		})
	);

	return postData;
};
export {
	uploadImage,
	createPost,
	getPost,
	getImage,
	getUserPost,
	getThatImage,
};
