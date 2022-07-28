import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPost, uploadImage } from "../api";

interface propsTypes {
	user: any;
}

const Upload: React.FC<propsTypes> = ({user}) => {
	const [image, setImage] = useState<any>();
	const [caption, setCaption] = useState("");

	const navigate = useNavigate();

	const notifySuccess = () => toast.success(`Image uploaded successfully! 😄`);

	const notifyFailure = (msg: string) => toast.error(msg);

	const handleUpload = async () => {
		try {
			const response = await uploadImage(image);
			createPost(response.data[0].id, caption, user.id);
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
							<button onClick={() => navigate("/")} className='btn-secondary'>
								Back
							</button>
							<button onClick={handleUpload} className='btn-primary'>
								Upload
							</button>
						</div>
					</>
				) : (
					<div className='flex gap-4 justify-around items-center'>
						<input
							type='file'
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setImage(e.target.files![0])
							}
							className='m-5'
						/>

						<button onClick={() => navigate("/")} className='btn-primary'>
							Close
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Upload;
