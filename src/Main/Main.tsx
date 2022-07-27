import axios from "axios";
import React, { useEffect, useState } from "react";

const Main = () => {
	const [posts, setPosts] = useState<Array<any>>();
	const [images, setImages] = useState<Array<any>>();

	useEffect(() => {
		getPost();
		getImage();
	}, []);

	const getPost = async () => {
		const jwtToken = localStorage.getItem("jwt");

		const { data } = await axios.get(
			`http://localhost:1338/api/posts?fields=caption,imageId&populate=user&Authorization=Bearer=${jwtToken}`
		);

		getImage();
		console.log(data)
		setPosts(data.data);
	};

	const getImage = async () => {
		const { data } = await axios.get(`http://localhost:1338/api/upload/files`);
		console.log(data);
		setImages(data);
	};

	return (
		<div className='py-10'>
			{posts && images && (
				<div className='container mx-auto flex flex-wrap justify-around gap-y-4'>
					{posts?.map((post, index) => {
						const { image, caption } = post.attributes;
						return (
							<div className='h-auto rounded-md p-6 flex flex-col justify-center items-center shadow-md bg-white' key={post.id}>
								<img
									className='max-w-xs w-48	 max-h-xs object-cover'
									src={`http://localhost:1338${images![index].url}`}
									alt=''
								/>
								<div className='mt-2'>{caption}</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Main;
