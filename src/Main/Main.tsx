import axios from "axios";
import React, { useEffect, useState } from "react";
import { getImage, getPost, getUserPost } from "../api";

interface propsTypes {
	userId: number;
}

const Main: React.FC<propsTypes> = ({  userId }) => {
	const [posts, setPosts] = useState<Array<any>>();
	const [images, setImages] = useState<Array<any>>();

	useEffect(() => {
		console.log('123')
		loadPosts();
	}, [ ]);

	const loadPosts = async () => {

		const postsData =	 await getPost();
		

		const imageData = await getImage();

		setPosts(postsData);
		setImages(imageData);
	};

	return (
		<div className='py-10'>
			{posts && images && (
				<div className='container mx-auto flex flex-wrap justify-around gap-y-4'>
					{posts?.map((post, index) => {
						const { caption } = post.attributes;
						return (
							<div
								className='h-auto rounded-md p-6 flex flex-col justify-center items-center shadow-md bg-white'
								key={post.id}>
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
