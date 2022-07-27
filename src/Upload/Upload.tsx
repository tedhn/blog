import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPost, uploadImage } from "../api";

const Upload = () => {
	const [image, setImage] = useState<any>();
	const [caption, setCaption] = useState("");

	const navigate = useNavigate();

	const notifySuccess = () => toast.success(`Image uploaded successfully! 😄`);

	const notifyFailure = (msg: string) => toast.error(msg);

	const handleUpload = async () => {
		try {
			const response = await uploadImage(image);
			createPost(response.data[0].id, caption);
			navigate("/");
			notifySuccess();
		} catch (e: any) {
			switch (e.response.status) {
				default: {
					notifyFailure("Error occured while Uploading.");
				}
			}
		}
	};

	return (
		<div className='container h-screen mx-auto flex justify-center items-center '>
			<div className='flex flex-col justify-around items-center gap-6 shadow-xl p-6 rounded-md bg-white'>
				{image ? (
					<>
						<img src={URL.createObjectURL(image)} alt='' className='max-w-xs' />{" "}
						<input
							type='text'
							placeholder={"Enter your captions here"}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setCaption(e.target.value)
							}
							className='px-1 py-2 border-solid border-b-2  border-slate-500 outline-0'
						/>
						<div className='flex justify-evenly gap-4'>
							<button onClick={() => navigate("/")} className='text-black'>
								Back
							</button>
							<button
								onClick={handleUpload}
								className='text-white bg-slate-900 px-4 py-2 rounded-md'>
								Upload
							</button>
						</div>
					</>
				) : (
					<>
						<input
							type='file'
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setImage(e.target.files![0])
							}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default Upload;
