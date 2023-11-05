import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/Admin.module.css';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
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
	const [formData, setFormData] = useState({
		titre: '',
		nbLike: '',
		lien: '',
		description: '',
	});
	const initialFormData = {
		titre: '',
		nbLike: '',
		lien: '',
		description: '',
	};
	const [projets, setProjets] = useState([]);
	const [idProjet, setIdProjet] = useState('');
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

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const modifierProjet = async (data) => {
		setAttendre(true);
		try {
			let response = await fetch(`/api/modifierProjet?id_projet=${idProjet}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			if (response.ok) {
				setFormData(initialFormData);
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
	const getProjet = async (idProjet) => {
		let response = await fetch(`/api/projet?id_projet=${idProjet}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await response.json();
		if (response.ok) {
			setProjet(data);
			setFormData(data[0]);
			setIdProjet(idProjet);
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

			<>
				<div className={`${styles.formulaire} animate__animated animate__fadeIn`}>
					<h2>Modifier un projet </h2>
					<form className={styles.form} onSubmit={handleSubmit(modifierProjet)}>
						<div className={`${styles.section} animate__animated animate__fadeIn`}>
							<label>
								<div className={styles.obligatoire}>Sélectionnez le projet : </div>
								<select
									name='id_projet'
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
							</label>
						</div>
						<div className={`${styles.section} animate__animated animate__fadeIn`}>
							<label>
								<span className={styles.obligatoire}>Titre du projet : </span>
								<input
									type='text'
									value={formData.titre || ''}
									{...register('titre', { required: 'Le titre du projet doit avoir au moins 5 caractères' })}
									onChange={(e) => {
										handleInputChange(e);
									}}
									placeholder='Titre du projet '
									name='titre'
									autoFocus
								/>

								{errors.titre && <p className={`${styles.erreur} animate__animated animate__headShake`}>{errors.titre.message}</p>}
							</label>
							<label>
								<span>Likes : </span>
								<input
									value={formData.nbLike || ''}
									type='number'
									min={1}
									{...register('nbLike')}
									onChange={(e) => {
										handleInputChange(e);
									}}
									placeholder='Nombre de like'
									name='nbLike'
								/>
							</label>
						</div>
						<div className={styles.section}>
							<label>
								<span>Lien : </span>
								<input
									value={formData.lien || ''}
									type='text'
									{...register('lien')}
									onChange={(e) => {
										handleInputChange(e);
									}}
									placeholder='Lien du projet '
									name='lien'
								/>
							</label>
						</div>
						<div className={styles.section}>
							<label>
								<span className={styles.obligatoire}>Description : </span>
								<textarea
									value={formData.description || ''}
									// type='text'

									{...register('description', {
										required: 'La description est requise',
										minLength: {
											value: 15,
											message: 'La description doit avoir au moins 15 caractères',
										},
									})}
									onChange={(e) => {
										handleInputChange(e);
									}}
									placeholder='La description du projet ici...'
									name='description'></textarea>

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
									Modifier
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
										<Image priority={true} src={projet.image_url1} width={projet.width1} height={projet.height1} alt='image du projet' />
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
			</>
			<>{/* */}</>
			<>{/* <AjouterTechnologie projets={projets} /> */}</>
		</>
	);
};

export default Modifier;
