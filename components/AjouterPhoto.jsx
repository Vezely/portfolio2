import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Admin.module.css';
import Spinner from './Spinner';
const AjouterPhoto = (projets) => {
	const [succes, setSucces] = useState(false);
	const toggleSucces = () => {
		setSucces(!succes);
	};
	const [attendre, setAttendre] = useState(false);
	const [imageSrc, setImageSrc] = useState(null);
	const projetsData = projets.projets;
	const [msg, setMsg] = useState(null);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setImageSrc(e.target.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		setAttendre(true);
		const formData = new FormData(event.target);
		try {
			const response = await fetch('/api/ajouterPhoto', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				toggleSucces();
				setImageSrc(null);
			}
		} catch (error) {
			setMsg('An error occurred. Please try again.');
			console.error(error);
		} finally {
			setAttendre(false);
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

			<div className={`${styles.formulaire} animate__animated animate__fadeIn`}>
				<h2>Ajouter une photo </h2>
				<form className={styles.form} onSubmit={onSubmit} encType='multipart/form-data'>
					<div className={styles.section}>
						<label>
							<span className={styles.obligatoire}>Photo : </span>
							<input required accept='image/*' type='file' name='photo' onChange={handleImageChange} />
						</label>
						<label>
							<div className={styles.obligatoire}>Projet : </div>
							<select name='id_projet'>
								<option value=''>Sélectionnez le projet</option>
								{projetsData?.map((projet) => (
									<option key={projet.id_projet} value={projet.id_projet}>
										{projet.titre}
									</option>
								))}
							</select>
						</label>
					</div>
					{imageSrc && (
						<div className={styles.photoProfile}>
							<Image width={3437} height={4344} src={imageSrc} alt='photo du produit' />
						</div>
					)}

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
		</>
	);
};

export default AjouterPhoto;
