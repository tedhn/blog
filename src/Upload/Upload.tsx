import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost, uploadImage } from "../api";

const Upload = () => {
	const [image, setImage] = useState<any>();
	const [caption, setCaption] = useState("");

	const navigate = useNavigate();

	const handleUpload = async () => {
		const imageId = await uploadImage(image);
		createPost(imageId, caption);

		navigate("/");
	};

	return (
		<div className='container h-screen flex justify-center items-center'>
			<div className='flex flex-col justify-around items-center gap-6'>
				<input
					type='text'
					placeholder={"Enter your captions here"}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setCaption(e.target.value)
					}
					className='px-1 py-2 border-solid border-b-2 border-slate-500 outline-0'
				/>
				<input
					type='file'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setImage(e.target.files![0])
					}
				/>
				{image && <img src={URL.createObjectURL(image)} alt='' />}
				<button onClick={handleUpload}>upload</button>
			</div>
		</div>
	);
};

export default Upload;
