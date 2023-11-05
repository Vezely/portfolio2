import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/Admin.module.css';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Spinner from './Spinner';

const ModifierBlog = (id_utilisateur) => {
	const [succes, setSucces] = useState(false);
	const [attendre, setAttendre] = useState(false);
	const toggleSucces = () => {
		setSucces(!succes);
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const [formData, setFormData] = useState({
		titre: '',
		lien: '',
		contenu: '',
	});
	const initialFormData = {
		titre: '',
		lien: '',
		contenu: '',
	};
	const [blogs, setBlogs] = useState([]);
	const [idBlog, setIdBlog] = useState('');
	useEffect(() => {
		async function fetchBlogs() {
			let response = await fetch(`/api/getBlogsByUser?id_utilisateur=${id_utilisateur.id_utilisateur}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});
			const data = await response.json();
			if (response.ok) {
				setBlogs(data);
			}
		}
		fetchBlogs();
	}, [id_utilisateur.id_utilisateur]);
	console.log(id_utilisateur);
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const modifierBlog = async (data) => {
		try {
			let response = await fetch(`/api/modifierBlog?id_blog=${idBlog}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			if (response.ok) {
				setFormData(initialFormData);
				setAttendre(true);
				toggleSucces();
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
	const getBlog = async (id_blog) => {
		let response = await fetch(`/api/getBlogById?id_blog=${id_blog}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await response.json();
		if (response.ok) {
			setFormData(data[0]);
			setIdBlog(id_blog);
		}
	};

	return (
		<>
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

			<div className={styles.contenuP}>
				<div className={`${styles.formulaire} animate__animated animate__fadeIn`}>
					<h2>Modifier un blog </h2>
					<form className={styles.form} onSubmit={handleSubmit(modifierBlog)}>
						<div className={`${styles.section} animate__animated animate__fadeIn`}>
							<label>
								<div className={styles.obligatoire}>Sélectionnez le blog : </div>
								<select
									name='id_blog'
									onChange={(e) => {
										getBlog(e.target.value);
									}}>
									<option value=''>Sélectionnez le blog</option>
									{blogs.map((blog) => (
										<option key={blog.id_blog} value={blog.id_blog}>
											{blog.titre}
										</option>
									))}
								</select>
							</label>
						</div>
						<div className={`${styles.section} animate__animated animate__fadeIn`}>
							<label>
								<span className={styles.obligatoire}>Titre du blog : </span>
								<input
									type='text'
									value={formData.titre || ''}
									{...register('titre', { required: 'Le titre du blog doit avoir au moins 5 caractères' })}
									onChange={(e) => {
										handleInputChange(e);
									}}
									placeholder='Titre du blog '
									name='titre'
									autoFocus
								/>

								{errors.titre && <p className={`${styles.erreur} animate__animated animate__headShake`}>{errors.titre.message}</p>}
							</label>
							<label>
								<span>Lien : </span>
								<input
									value={formData.lien || ''}
									type='text'
									{...register('lien', { required: 'Le lien est obligatoire' })}
									onChange={(e) => {
										handleInputChange(e);
									}}
									placeholder='Lien du projet '
									name='lien'
								/>
								{errors.lien && <p className={`${styles.erreur} animate__animated animate__headShake`}>{errors.lien.message}</p>}
							</label>
						</div>

						<div className={styles.section}>
							<label>
								<span className={styles.obligatoire}>Contenu : </span>
								<textarea
									value={formData.contenu || ''}
									{...register('contenu', {
										required: 'Le contenu est requis',
										minLength: {
											value: 15,
											message: 'Le contenu doit avoir au moins 15 caractères',
										},
									})}
									onChange={(e) => {
										handleInputChange(e);
									}}
									placeholder='Le contenu du blug ici...'
									name='contenu'></textarea>

								{errors.contenu && <p className={`${styles.erreur} animate__animated animate__headShake`}>{errors.contenu.message}</p>}
							</label>
						</div>

						<div className={styles.submit}>
							<span></span>
							{attendre ? (
								<Spinner />
							) : (
								<button className={styles.button} type='submit'>
									Modifier
								</button>
							)}
						</div>
					</form>
				</div>
				<div className={`${styles.projet} animate__animated animate__fadeIn`}>
					<h2>Vos blogs existants</h2>

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
												<Image priority={true} src={blog.image_url} width={blog.width} height={blog.height} alt='image du blog' />
											</div>
										) : (
											<div className={styles.photo}>
												<Image priority={true} src='/images/blogs/defaut.png' width={1024} height={596} alt='image du blog' />
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
		</>
	);
};

export default ModifierBlog;
