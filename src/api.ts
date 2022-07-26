import axios from "axios";

const uploadImage = async (image: File) => {
	let formData = new FormData();

	formData.append("files", image);

	const response = await axios.post(
		`http://localhost:1338/api/upload`,
		formData,
		{
			headers: { "Content-Type": "multipart/form-data" },
		}
	);

	return response.data[0].id;
};

const createPost = async (imageId: number, caption: string) => {
	axios.post("http://localhost:1338/api/posts", {
		data: { caption, imageId, user: 3 },
	});
};

export { uploadImage, createPost };
