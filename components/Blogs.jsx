import React, { useEffect, useState } from 'react';
import styles from '../styles/Blogs.module.css';
import BlogCart from './BlogCart';
import { useRouter } from 'next/router';
const Blogs = () => {
	const [blogs, setBlogs] = useState([]);
	const router = useRouter();
	const [isBlog, setIsblog] = useState(true);
	useEffect(() => {
		async function fetchCommentaire() {
			let response = await fetch('/api/getAllBlogs', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});
			const data = await response.json();
			setBlogs(data);
		}
		fetchCommentaire();
	}, []);
	useEffect(() => {
		if (router.pathname == '/blogs') {
			setIsblog(false);
		} else {
			setIsblog(true);
		}
	}, [router.pathname]);

	return (
		<>
			{isBlog && (
				<h2
					style={{
						textShadow: '2px 2px 4px #000',
					}}>
					Blogs
				</h2>
			)}

			<div className={`${isBlog ? styles.contenu2 : styles.contenu}`}>
				<div className={styles.blogsContainer} style={{ width: isBlog && 'max-content' }}>
					{Array.isArray(blogs) && blogs.length > 0 && (
						<>
							{blogs?.map((blog, index) => (
								<BlogCart blog={blog} key={index} />
							))}
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default Blogs;
