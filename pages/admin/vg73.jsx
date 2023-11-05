import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import styles from '../../styles/Admin.module.css';
import AjouterPhoto from '../../components/AjouterPhoto';
import AjouterTechnologie from '../../components/AjouterTechnologie';
import Modifier from '../../components/Modifier';
import SupprimerProjet from '../../components/SupprimerProjet';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import Users from '../../components/Users';
import AjouterContenu from '../../components/AjouterContenu';
import Spinner from '../../components/Spinner';

const Admin = () => {
	const router = useRouter();
	const [attendre, setAttendre] = useState(false);
	const [sessionExpirer, setSessionExpirer] = useState(false);
	const [succes, setSucces] = useState(false);
	const toggleSucces = () => {
		setSucces(!succes);
	};
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
				console.log("connexion expirée après 10 minutes d'inactivité");
				return false;
			} else {
				// Le token est valide et n'a pas expiré
				return true;
			}
		} else {
			// L'horodatage n'est pas présent, déconnecter
			setUser(null);
			setSessionExpirer(true);
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

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const element = {
		ajouter_projet: 'Ajouter',
		modifier_projet: 'Mettre a jour ',
		supprimer_projet: 'Supprimer',
		utilisateur: 'Utilisateur',
	};
	const [elementAffiche, setElementAffiche] = useState(element.ajouter_projet);

	const changeElement = (element) => {
		setElementAffiche(element);
		localStorage.setItem('elementAffiche', element);
	};
	useEffect(() => {
		const savedElementAffiche = localStorage.getItem('elementAffiche');
		if (savedElementAffiche) {
			setElementAffiche(savedElementAffiche);
		}
	}, []);

	const [projets, setProjets] = useState([]);
	useEffect(() => {
		async function fetchProjet() {
			let response = await fetch(`/api/projets`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});
			const data = await response.json();
			if (response.ok) {
				setProjets(data);
			}
		}
		fetchProjet();
	}, []);

	const ajouterProjet = async (data) => {
		setAttendre(true);
		try {
			let response = await fetch(`/api/ajouterProjet`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			if (response.ok) {
				toggleSucces();
				reset();
			}
		} catch (error) {
			console.error(error);
		} finally {
			setAttendre(false);
		}
	};
	function tronquerTexte(texte, limite) {
		if (texte.length <= limite) {
			return texte;
		}
		return texte.substring(0, limite) + '...';
	}

	return (
		<>
			<Head>
				<title>Admin</title>
				<meta charSet='UTF-8'></meta>
				<meta name='description' content='Page administration du site accessible seulement au créateur du site web' />
				<meta name='theme-color' content='#212529' />
				<meta property='og:title' content='Page administration du site accessible seulement au créateur du site web' />
				<meta property='og:description' content='Page admin' />
				<meta property='og:image' content='http://localhost:3000/images/logoU.png' />
			</Head>
			<div className={`${styles.container} animate__animated animate__fadeIn `}>
				{succes && (
					<div className={`${styles.maske} animate__animated animate__fadeIn`}>
						<div className={styles.popup}>
							<div className={styles.titre}>Opération effectuer avec succès</div>
							<svg
								width='46'
								height='46'
								fill='none'
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='1.5'
								viewBox='0 0 24 24'>
								<path d='m21.75 6-10.5 12-4.5-4.5'></path>
								<path d='m6.75 18-4.5-4.5'></path>
								<path d='m17.25 6-6.375 7.313'></path>
							</svg>
							<div
								onClick={() => {
									toggleSucces();
									window.location.reload();
								}}
								className={styles.button}>
								OK
							</div>
						</div>
					</div>
				)}
				{sessionExpirer ? (
					<div className={`${styles.maske} animate__animated animate__fadeIn animate__bounceIn`}>
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
							<div onClick={() => router.push('/connexion')} className={styles.button}>
								OK
							</div>
						</div>
					</div>
				) : user?.email === 'vezelykant@gmail.com' ? (
					<div className={styles.contenu}>
						<h1>Bienvenue {user?.prenom}</h1>
						<div className={styles.entete}>
							<ul>
								<li
									className={elementAffiche === element.ajouter_projet ? styles.active : ''}
									onClick={() => {
										changeElement(element.ajouter_projet);
									}}>
									{element.ajouter_projet}
								</li>
								<li
									className={elementAffiche === element.modifier_projet ? styles.active : ''}
									onClick={() => {
										changeElement(element.modifier_projet);
									}}>
									{element.modifier_projet}
								</li>
								<li
									className={elementAffiche === element.supprimer_projet ? styles.active : ''}
									onClick={() => {
										changeElement(element.supprimer_projet);
									}}>
									{element.supprimer_projet}
								</li>
								<li
									className={elementAffiche === element.utilisateur ? styles.active : ''}
									onClick={() => {
										changeElement(element.utilisateur);
									}}>
									{element.utilisateur}
								</li>
							</ul>
						</div>

						{elementAffiche === element.ajouter_projet && (
							<>
								<div className={styles.contenuP}>
									<div className={`${styles.formulaire} animate__animated animate__fadeIn`}>
										<h2>Ajouter un projet </h2>
										<form className={styles.form} onSubmit={handleSubmit(ajouterProjet)}>
											<div className={`${styles.section} animate__animated animate__fadeIn`}>
												<label>
													<span className={styles.obligatoire}>Titre du projet : </span>
													<input
														type='text'
														{...register('titre', { required: 'Le titre du projet doit avoir au moins 5 caractères' })}
														placeholder='Titre du projet'
														name='titre'
														autoFocus
													/>
													{errors.titre && (
														<p className={`${styles.erreur} animate__animated animate__headShake`}>{errors.titre.message}</p>
													)}
												</label>
												<label>
													<span>Lien : </span>
													<input type='text' {...register('lien')} placeholder='Lien du projet' name='lien' />
												</label>
											</div>
											<div className={styles.section}>
												<label>
													<span className={styles.obligatoire}>Description : </span>
													<textarea
														{...register('description', {
															required: 'La description est requise',
															minLength: {
																value: 15,
																message: 'La description doit avoir au moins 15 caractères',
															},
														})}
														placeholder='La description du projet ici...'></textarea>

													{errors.description && (
														<p className={`${styles.erreur} animate__animated animate__headShake`}>{errors.description.message}</p>
													)}
												</label>
											</div>

											<div className={styles.submit}>
												<span></span>
												{attendre ? (
													<Spinner />
												) : (
													<button className={styles.button} type='submit'>
														Ajouter
													</button>
												)}
											</div>
										</form>
									</div>
									<div className={`${styles.projet} animate__animated animate__fadeIn`}>
										<h2>Projets existants</h2>

										<div className={styles.containerBox}>
											<div className={styles.titre}>
												<div>Nom</div>

												<div className={styles.hiddenOnSmallScreen}>Id</div>
												<div>Likes</div>
											</div>
											{projets.map((projet) => (
												<Link href={`/projet/${projet.id_projet}`} className={styles.projetBox} key={projet.id_projet}>
													{projet.image_url1 ? (
														<div className={styles.photo}>
															<Image
																priority={true}
																src={projet.image_url1}
																width={projet.width1}
																height={projet.height1}
																alt='image du projet'
															/>
														</div>
													) : (
														<div className={styles.photo}>
															<Image priority={true} src='/images/projet/defaut.jpg' width={1280} height={836} alt='image du projet' />
														</div>
													)}

													<div>{tronquerTexte(projet.titre, 10)}</div>
													<div className={styles.hiddenOnSmallScreen}>{projet.id_projet}</div>
													<div>{projet.nbLike}</div>
												</Link>
											))}
										</div>
									</div>
								</div>
								<div className={styles.contenuP}>
									<AjouterPhoto succes={toggleSucces} projets={projets} />
								</div>
								<div className={styles.contenuP}>
									<AjouterTechnologie succes={toggleSucces} projets={projets} />
								</div>
								<div className={styles.contenuP}>
									<AjouterContenu />
								</div>
							</>
						)}

						{elementAffiche === element.modifier_projet && (
							<div className={styles.contenuP}>
								<Modifier />
							</div>
						)}
						{elementAffiche === element.supprimer_projet && (
							<div className={styles.contenuP}>
								<SupprimerProjet />
							</div>
						)}
						{elementAffiche === element.utilisateur && (
							<div className={styles.contenuP}>
								<Users />
							</div>
						)}
					</div>
				) : (
					<div className={`${styles.maske} animate__animated animate__fadeIn animate__bounceIn`}>
						<div className={styles.popup}>
							<div className={styles.titre}>Vous n&apos;avez pas l&apos;autorisation requise! </div>
							<svg
								width='46'
								height='46'
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
							<div onClick={() => router.push('/blogs')} className={styles.button}>
								OK
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Admin;
