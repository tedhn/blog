import React from "react";

interface propsType {
	caption: string;
	url: string;
  id:number;
}

const Post: React.FC<propsType> = ({ caption, url , id }) => {
	return (
		<div
			className='rounded-md p-6 flex flex-col justify-center items-center shadow-md bg-white'
			key={id}>
			<img
				className='max-w-xs w-48	 max-h-xs object-cover'
				src={`http://localhost:1338${url}`}
				alt='404'
			/>
			<div className='mt-2'>{caption}</div>
		</div>
	);
};

export default Post;
