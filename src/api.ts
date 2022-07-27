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

const createPost = async (imageId: number, caption: string) => {
	axios.post("http://localhost:1338/api/posts", {
		data: { caption, imageId, user: 4 },
	});
};

export { uploadImage, createPost };
