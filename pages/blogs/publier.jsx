import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Admin.module.css';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import AjouterBlog from '../../components/AjouterBlog';
import ModifierBlog from '../../components/ModifierBlog';
import SupprimerBlog from '../../components/SupprimerBlog';
import AjouterPhotoBlog from '../../components/AjouterPhotoBlog';

const Publier = () => {
	const router = useRouter();
	const [sessionExpirer, setSessionExpirer] = useState(false);
	const element = {
		ajouter_blog: 'Ajouter un nouveau blog',
		modifier_blog: 'Mettre a jour un blog',
		supprimer_blog: 'Supprimer un blog',
	};
	const [elementAffiches, setElementAffiches] = useState(element.ajouter_blog);
	// const changeElement = (element) => {
	// 	setElementAffiches(element);
	// };
	const changeElement = (element) => {
		setElementAffiches(element);
		localStorage.setItem('elementAffiches', element);
	};
	useEffect(() => {
		const savedElementAffiche = localStorage.getItem('elementAffiches');
		if (savedElementAffiche) {
			setElementAffiches(savedElementAffiche);
		}
	}, []);

	const [user, setUser] = useState(null);
	const token = Cookies.get('jwtToken');

	const checkAuthorization = () => {
		const timestamp = Cookies.get('timestamp');
		if (timestamp) {
			const currentTime = new Date().getTime();
			const loginTime = new Date(timestamp).getTime();
			const minutesPassed = (currentTime - loginTime) / (1000 * 60); // minutes

			if (minutesPassed > 10) {
				// Plus de 30 minutes d'inactivité, déconnecter
				Cookies.remove('jwtToken');
				setUser(null);
				setSessionExpirer(true);
				console.log("Token expiré après 30 minutes d'inactivité");
				return false;
			} else {
				// Le token est valide et n'a pas expiré
				console.log('Token valide');
				return true;
			}
		} else {
			// L'horodatage n'est pas présent, déconnecter
			setUser(null);
			setSessionExpirer(true);
			console.log('Horodatage non trouvé');
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

	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		async function fetchBlogs() {
			if (user?.id_utilisateur) {
				let response = await fetch(`/api/getBlogsByUser?id_utilisateur=${user.id_utilisateur}`, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				});
				const data = await response.json();
				if (response.ok) {
					setBlogs(data);
				}
			}
		}
		fetchBlogs();
	}, [user?.id_utilisateur]);
	function tronquerTexte(texte, limite) {
		if (texte.length <= limite) {
			return texte;
		}
		return texte.substring(0, limite) + '...';
	}
	return (
		<>
			<Head>
				<title>Publier</title>
				<meta charSet='UTF-8'></meta>
				<meta name='description' content='Page permettant aux utilisateurs de : ajouter, modifier et supprimer les blogs ' />
				<meta name='theme-color' content='#212529' />
				<meta property='og:title' content='Page permettant aux utilisateurs de : ajouter, modifier et supprimer les blogs' />
				<meta property='og:description' content='Page publier' />
				<meta property='og:image' content='http://localhost:3000/images/logoU.png' />
			</Head>
			<div className={`${styles.container} animate__animated animate__fadeIn `}>
				{sessionExpirer ? (
					<div className={`${styles.maske} animate__animated animate__fadeIn`}>
						<div className={styles.popup}>
							<div className={styles.titre}>Votre session a expiré. Veuillez-vous reconnecter </div>
							<svg
								width='30'
								height='30'
								fill='none'
								stroke='currentColor'
								strokeLinecap='round'
								strokeWidth='1.5'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'>
								<path d='m18.75 6.938-.99-1.152A8.973 8.973 0 0 0 11.25 3c-4.969 0-9 4.031-9 9s4.031 9 9 9a9.004 9.004 0 0 0 8.488-6'></path>
								<path
									fill='currentColor'
									stroke='none'
									d='M21.75 4.565v5.183a.75.75 0 0 1-.75.75h-5.184a.75.75 0 0 1-.53-1.28l5.184-5.184a.75.75 0 0 1 1.28.53Z'></path>
							</svg>
							<div
								onClick={() => {
									router.push('/connexion');
								}}
								className={styles.button}>
								OK
							</div>
						</div>
					</div>
				) : (
					<div className={styles.contenu}>
						<h1>Bienvenue {user?.prenom} </h1>
						<p style={{ padding: '0 1rem', margin: '0', fontWeight: '400', lineHeight: '1.5' }}>
							Votre voix compte, partagez vos idées, vos connaissances et votre passion avec le monde en publiant un blog. Vous avez le pouvoir
							d&apos;inspirer, d&apos;informer et de faire la différence. Lancez-vous et laissez votre créativité s&apos;épanouir ! 🚀
						</p>
						<div className={styles.entete}>
							<ul>
								<li
									className={elementAffiches === element.ajouter_blog ? styles.active : ''}
									onClick={() => {
										changeElement(element.ajouter_blog);
									}}>
									{element.ajouter_blog}
								</li>
								<li
									className={elementAffiches === element.modifier_blog ? styles.active : ''}
									onClick={() => {
										changeElement(element.modifier_blog);
									}}>
									{element.modifier_blog}
								</li>
								<li
									className={elementAffiches === element.supprimer_blog ? styles.active : ''}
									onClick={() => {
										changeElement(element.supprimer_blog);
									}}>
									{element.supprimer_blog}
								</li>
							</ul>
						</div>
						{elementAffiches === element.ajouter_blog && (
							<>
								<div className={styles.contenuP}>
									<AjouterBlog />
									<div className={`${styles.projet} animate__animated animate__fadeIn`}>
										<h2>Vos Blogs existants</h2>

										<div className={styles.containerBox}>
											<div className={styles.titre}>
												<div>Nom</div>

												<div className={styles.hiddenOnSmallScreen}>Id</div>
												<div>Likes</div>
											</div>
											{blogs.length > 0 ? (
												<>
													{blogs.map((blog) => (
														<Link href={`/blogs`} className={styles.projetBox} key={blog.id_blog}>
															{blog.image_url ? (
																<div className={styles.photo}>
																	<Image
																		priority={true}
																		src={blog.image_url}
																		width={blog.width}
																		height={blog.height}
																		alt='image du blog'
																	/>
																</div>
															) : (
																<div className={styles.photo}>
																	<Image
																		priority={true}
																		src='/images/blogs/defaut.png'
																		width={1024}
																		height={596}
																		alt='image du blog'
																	/>
																</div>
															)}

															<div>{tronquerTexte(blog.titre, 10)}</div>
															<div className={styles.hiddenOnSmallScreen}>{blog.id_blog}</div>
															<div>{blog.nbLike_blog}</div>
														</Link>
													))}
												</>
											) : (
												<div style={{ margin: 'auto' }}>
													Votre store de blog est vide! <div>Merci d&apos;ajouter au moins un 😉</div>
												</div>
											)}
										</div>
									</div>
								</div>

								<AjouterPhotoBlog id_utilisateur={user?.id_utilisateur} />
							</>
						)}
						{elementAffiches === element.modifier_blog && <ModifierBlog id_utilisateur={user?.id_utilisateur} />}
						{elementAffiches === element.supprimer_blog && <SupprimerBlog blogs={blogs} />}
					</div>
				)}
			</div>
		</>
	);
};

export default Publier;
