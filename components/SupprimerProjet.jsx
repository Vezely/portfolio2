import React, { useEffect, useState } from 'react';
import styles from '../styles/Admin.module.css';
import { useForm } from 'react-hook-form';
import Spinner from './Spinner';

const Modifier = () => {
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

	const [projets, setProjets] = useState([]);
	const [technologies, setTechnologies] = useState([]);
	const [idProjet, setIdProjet] = useState('');
	const [idContenu, setIdContenu] = useState('');
	const [idBlog, setIdBlog] = useState('');
	const [idCommentaire, setIdCommentaire] = useState('');
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

	const [contenus, setContenus] = useState([]);
	const [blogs, setBlogs] = useState([]);
	const [commentaires, setCommentaires] = useState([]);
	useEffect(() => {
		async function fetchProjet() {
			let response = await fetch(`/api/getAllContenu`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});
			const data = await response.json();
			if (response.ok) {
				setContenus(data);
			}
		}
		fetchProjet();
	}, []);
	useEffect(() => {
		async function fetchBlog() {
			let response = await fetch(`/api/getAllBlogs`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});
			const data = await response.json();
			if (response.ok) {
				setBlogs(data);
			}
		}
		fetchBlog();
	}, []);
	const getTechnologieByProjet = async (idProjet) => {
		let response = await fetch(`/api/getTechnologieByProjet?id_projet=${idProjet}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await response.json();
		if (response.ok) {
			setTechnologies(data);
		}
	};

	const supprimerProjet = async (event) => {
		event.preventDefault();
		setAttendre(true);
		try {
			let response = await fetch(`/api/supprimerProjet?id_projet=${idProjet}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				// body: JSON.stringify(data),
			});
			if (response.ok) {
				reset();
				toggleSucces();
			}
		} catch (error) {
			console.error(error);
		} finally {
			setAttendre(false);
		}
	};
	const supprimerTechnologie = async (data) => {
		setAttendre(true);
		try {
			let response = await fetch(`/api/supprimerTechnologie`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			if (response.ok) {
				reset();
				toggleSucces();
			}
		} catch (error) {
			console.error(error);
		} finally {
			setAttendre(false);
		}
	};

	const getProjet = async (idProjet) => {
		let response = await fetch(`/api/projet?id_projet=${idProjet}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		// const data = await response.json();
		if (response.ok) {
			setIdProjet(idProjet);
		}
	};

	const supprimerContenu = async (event) => {
		event.preventDefault();
		setAttendre(true);
		try {
			let response = await fetch(`/api/supprimerContenu?id_contenu=${idContenu}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			});

			if (response.ok) {
				reset();
				toggleSucces();
			}
		} catch (error) {
			console.error(error);
		} finally {
			setAttendre(false);
		}
	};
	const getIdContenu = (idContenu) => {
		setIdContenu(idContenu);
	};

	const supprimerBlog = async (event) => {
		event.preventDefault();
		setAttendre(true);
		try {
			let response = await fetch(`/api/supprimerBlog?id_blog=${idBlog}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			});

			if (response.ok) {
				reset();
				toggleSucces();
			}
		} catch (error) {
			console.error(error);
		} finally {
			setAttendre(false);
		}
	};
	const getIdBlog = (id) => {
		setIdBlog(id);
	};

	useEffect(() => {
		async function fetchBlog() {
			let response = await fetch(`/api/getAllCommentaires`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});
			const data = await response.json();
			if (response.ok) {
				setCommentaires(data);
			}
		}
		fetchBlog();
	}, []);
	const supprimerCommentaire = async (event) => {
		event.preventDefault();
		setAttendre(true);
		try {
			let response = await fetch(`/api/supprimerCommentaire?id_commentaire=${idCommentaire}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			});

			if (response.ok) {
				reset();
				toggleSucces();
			}
		} catch (error) {
			console.error(error);
		} finally {
			setAttendre(false);
		}
	};
	const getIdCommentair = (id) => {
		setIdCommentaire(id);
	};
	function tronquerTexte(texte, limite) {
		if (texte.length <= limite) {
			return texte;
		}
		return texte.substring(0, limite) + '...';
	}
	return (
		<>
			<div>
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
						<h2>Suprimer un projet </h2>
						<form className={styles.form} onSubmit={supprimerProjet}>
							<div className={`${styles.section} animate__animated animate__fadeIn`}>
								<label>
									<div className={styles.obligatoire}>Sélectionnez le projet : </div>
									<select
										name='id_projet'
										required
										// {...register('id_projet', { required: 'Selectionnez le projet' })}
										onChange={(e) => {
											getProjet(e.target.value);
											// remplirFormulaire(projet);
										}}>
										<option value=''>Sélectionnez le projet</option>
										{projets.map((projet) => (
											<option key={projet.id_projet} value={projet.id_projet}>
												{projet.titre}
											</option>
										))}
									</select>
									{/* {errors.id_projet && <p className={`${styles.erreur} animate__animated animate__headShake`}>{errors.id_projet.message}</p>} */}
								</label>
							</div>

							<div className={styles.submit}>
								<span></span>
								{attendre ? (
									<Spinner />
								) : (
									<button className={styles.button} type='submit'>
										Supprimer
									</button>
								)}
							</div>
						</form>
					</div>
					<div className={`${styles.formulaire} animate__animated animate__fadeIn`}>
						<h2>Suprimer une technologie </h2>
						<form className={styles.form} onSubmit={handleSubmit(supprimerTechnologie)}>
							<div className={`${styles.section} animate__animated animate__fadeIn`}>
								<label>
									<div className={styles.obligatoire}>Sélectionnez le projet : </div>
									<select
										name='id_projet'
										{...register('id_projet', { required: 'Selectionnez le projet' })}
										onChange={(e) => {
											getTechnologieByProjet(e.target.value);
										}}>
										<option value=''>Sélectionnez le projet</option>
										{projets.map((projet) => (
											<option key={projet.id_projet} value={projet.id_projet}>
												{projet.titre}
											</option>
										))}
									</select>
									{errors.id_projet && <p className={`${styles.erreur} animate__animated animate__headShake`}>{errors.id_projet.message}</p>}
								</label>
							</div>
							<div className={`${styles.section} animate__animated animate__fadeIn`}>
								<label>
									<div className={styles.obligatoire}>Sélectionnez la technologie : </div>
									<select name='id_technologie' {...register('id_technologie', { required: 'Sélectionez la technplogie' })}>
										<option value=''>Sélectionnez la technologie</option>
										{technologies.map((technologie) => (
											<option key={technologie.id_technologie} value={technologie.id_technologie}>
												{technologie.nom}
											</option>
										))}
									</select>
									{errors.id_technologie && (
										<p className={`${styles.erreur} animate__animated animate__headShake`}>{errors.id_technologie.message}</p>
									)}
								</label>
							</div>

							<div className={styles.submit}>
								<span></span>
								{attendre ? (
									<Spinner />
								) : (
									<button className={styles.button} type='submit'>
										Supprimer
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
				<div className={styles.contenuP}>
					<div className={`${styles.formulaire} animate__animated animate__fadeIn`}>
						<h2>Suprimer un contenu </h2>
						<form className={styles.form} onSubmit={supprimerContenu}>
							<div className={`${styles.section} animate__animated animate__fadeIn`}>
								<label>
									<div className={styles.obligatoire}>Sélectionnez le contenu : </div>
									<select
										name='id_contenu'
										required
										onChange={(e) => {
											getIdContenu(e.target.value);
										}}>
										<option value=''>Sélectionnez le contenu</option>
										{contenus.map((contenu) => (
											<option key={contenu.id_contenu} value={contenu.id_contenu}>
												{contenu.titre}
											</option>
										))}
									</select>
									{/* {errors.id_projet && <p className={`${styles.erreur} animate__animated animate__headShake`}>{errors.id_projet.message}</p>} */}
								</label>
							</div>

							<div className={styles.submit}>
								<span></span>
								{attendre ? (
									<Spinner />
								) : (
									<button className={styles.button} type='submit'>
										Supprimer
									</button>
								)}
							</div>
						</form>
					</div>

					<div className={`${styles.formulaire} animate__animated animate__fadeIn`}>
						<h2>Suprimer un blog </h2>
						<form className={styles.form} onSubmit={supprimerBlog}>
							<div className={`${styles.section} animate__animated animate__fadeIn`}>
								<label>
									<div className={styles.obligatoire}>Sélectionnez le contenu : </div>
									<select
										name='id_blog'
										required
										onChange={(e) => {
											getIdBlog(e.target.value);
										}}>
										<option value=''>Sélectionnez le blog</option>
										{blogs.map((blog) => (
											<option key={blog.id_blog} value={blog.id_blog}>
												{blog.titre}
											</option>
										))}
									</select>
									{/* {errors.id_projet && <p className={`${styles.erreur} animate__animated animate__headShake`}>{errors.id_projet.message}</p>} */}
								</label>
							</div>

							<div className={styles.submit}>
								<span></span>
								{attendre ? (
									<Spinner />
								) : (
									<button className={styles.button} type='submit'>
										Supprimer
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
				<div className={styles.contenuP}>
					<div className={`${styles.formulaire} animate__animated animate__fadeIn`}>
						<h2>Suprimer un commentaire </h2>
						<form className={styles.form} onSubmit={supprimerCommentaire}>
							<div className={`${styles.section} animate__animated animate__fadeIn`}>
								<label>
									<div className={styles.obligatoire}>Sélectionnez le contenu : </div>
									<select
										name='id_commentaire'
										required
										onChange={(e) => {
											getIdCommentair(e.target.value);
										}}>
										<option value=''>Sélectionnez le commentaire</option>
										{commentaires.map((commentaire) => (
											<option key={commentaire.id_commentaire} value={commentaire.id_commentaire}>
												{`${commentaire.nom_commentateur} : ${tronquerTexte(commentaire.commentaire, 40)}`}
											</option>
										))}
									</select>
									{/* {errors.id_projet && <p className={`${styles.erreur} animate__animated animate__headShake`}>{errors.id_projet.message}</p>} */}
								</label>
							</div>

							<div className={styles.submit}>
								<span></span>
								{attendre ? (
									<Spinner />
								) : (
									<button className={styles.button} type='submit'>
										Supprimer
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modifier;
