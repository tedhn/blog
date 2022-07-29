import React, { useEffect, useState } from "react";
import { getPost, getUserPost } from "../../api";
import axios from "axios";
import { toast } from "react-toastify";
import Post from "../../Components/Post/Post";

interface propsTypes {
	user?: any;
}

const PostBoard: React.FC<propsTypes> = ({ user }) => {
	const [posts, setPosts] = useState<Array<any>>();

	useEffect(() => {
		loadPosts();
	}, [user]);

	const loadPosts = async () => {
		if (user) {
			const userPostsData = await getUserPost(user.id);
			setPosts(userPostsData);
		} else {
			const postsData = await getPost();
			setPosts(postsData);
		}
	};

	const deletePost = async (imageId: number) => {
		const jwtToken = localStorage.getItem("jwt");

		try {
			const { data } = await axios.delete(
				`http://localhost:1338/api/posts/${imageId}`,
				{
					headers: {
						Authorization: `Bearer ${jwtToken}`,
					},
				}
			);

			loadPosts();
			toast.success(`Post deleted!`);
		} catch (e: any) {
			toast.error("Error Occured while deleting the post.");
		}
	};

	return (
		<div className='py-10'>
			{posts ? (
				<div className='container mx-auto flex flex-wrap justify-around gap-y-4'>
					{posts.map((post, index) => {
						const { caption, url, id } = post;
						return (
							<div className='flex flex-col items-center gap-4'>
								{user && (
									<span
										className='bg-red-500 py-2 px-4 rounded-md text-white text-[12px] hover:bg-red-700 active:bg-red-900 hover:cursor-pointer'
										onClick={() => deletePost(id)}>
										Delete Post
									</span>
								)}
								<Post caption={caption} url={url} id={id} />
							</div>
						);
					})}
				</div>
			) : <div className="container mx-auto">Loading Posts</div>}
		</div>
	);
};

export default PostBoard;
