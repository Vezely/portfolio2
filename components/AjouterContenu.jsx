import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import styles from '../styles/Admin.module.css';
import Spinner from './Spinner';
const AjouterContenu = () => {
	const [imageSrc, setImageSrc] = useState(null);
	const [attendre, setAttendre] = useState(false);
	const [msg, setMsg] = useState(null);
	const [file, setFile] = useState(null);
	const [user, setUser] = useState(null);
	const [succes, setSucces] = useState(false);

	const toggleSucces = () => {
		setSucces(!succes);
	};

	useEffect(() => {
		const token = Cookies.get('jwtToken');
		if (token) {
			const decoded = jwt.decode(token);
			setUser(decoded);
		}
	}, []);

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
			const response = await fetch(`/api/ajouterContenu`, {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();

			if (data.error) {
				setMsg(data.error);
			} else {
				setFile(data.file);
			}
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
				<h2>Ajouter un contenu </h2>
				<form className={styles.form} onSubmit={onSubmit}>
					<div className={`${styles.section} animate__animated animate__fadeIn`}>
						<label>
							<span className={styles.obligatoire}>Titre du contenu : </span>
							<input required type='text' placeholder='Titre du contenu' name='titre' autoFocus />
						</label>
						<label>
							<span>Lien : </span>
							<input type='text' placeholder='Lien du contenu' name='lien' />
						</label>
					</div>

					<div className={styles.section}>
						<label>
							<span>Photo : </span>
							<input accept='image/*' type='file' name='photo' onChange={handleImageChange} />
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

export default AjouterContenu;
