import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Blogs.module.css';
import Blogs from '../components/blogs';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
const BlogsP = () => {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const token = Cookies.get('jwtToken');

	const checkAuthorization = () => {
		const timestamp = Cookies.get('timestamp');
		if (timestamp) {
			const currentTime = new Date().getTime();
			const loginTime = new Date(timestamp).getTime();
			const minutesPassed = (currentTime - loginTime) / (1000 * 60); // minutes

			// Plus de 10 minutes d'inactivité, déconnecter
			if (minutesPassed > 10) {
				Cookies.remove('jwtToken');
				Cookies.remove('timestamp');
				setUser(null);
				console.log("connexion expirée après 10 minutes d'inactivité");
				return false;
			} else {
				// Le token est valide et n'a pas expiré
				return true;
			}
		} else {
			// L'horodatage n'est pas présent, déconnecter
			setUser(null);
			return false;
		}
	};

	useEffect(() => {
		// Vérifier l'autorisation lors du chargement de la page
		if (checkAuthorization()) {
			Cookies.set('timestamp', new Date().toString());
			const decoded = jwt.decode(token);
			setUser(decoded);
		}
	}, [token]);

	return (
		<>
			<Head>
				<title>Blogs</title>
				<meta charSet='UTF-8'></meta>
				<meta name='description' content='Page contenant tous les blogs publier par les utilisateurs' />
				<meta name='theme-color' content='#212529' />
				<meta property='og:title' content='Page contenant tous les blogs publier par les utilisateurs' />
				<meta property='og:description' content='Page blogs' />
				<meta property='og:image' content='http://localhost:3000/images/logoU.png' />
			</Head>
			<div className={styles.container}>
				<video className={styles.fond} autoPlay loop muted>
					<source src='/images/vf1.mp4' type='video/mp4' />
				</video>
				<div className={styles.contenu}>
					<h1>L&apos;Ère de l&apos;Intelligence Artificielle et de la Révolution Technologique</h1>
					<Blogs token={user} />
				</div>
			</div>
		</>
	);
};

export default BlogsP;
