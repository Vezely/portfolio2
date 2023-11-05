import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Admin.module.css';
import Spinner from './Spinner';

const AjouterPhotoBlog = (id_utilisateur) => {
	const [succes, setSucces] = useState(false);
	const [attendre, setAttendre] = useState(false);
	const [blogs, setBlogs] = useState([]);
	const toggleSucces = () => {
		setSucces(!succes);
	};

	const [imageSrc, setImageSrc] = useState(null);
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
			const response = await fetch('/api/ajouterPhotoBlog', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				toggleSucces();
				setImageSrc(null);
			}
		} catch (error) {
			setMsg('An error occurred. Please try again.');
		} finally {
			setAttendre(false);
		}
	};
	useEffect(() => {
		async function fetchBlogs() {
			if (id_utilisateur.id_utilisateur) {
				let response = await fetch(`/api/getBlogsByUser?id_utilisateur=${id_utilisateur?.id_utilisateur}`, {
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
	}, [id_utilisateur.id_utilisateur]);
	function tronquerTexte(texte, limite) {
		if (texte.length <= limite) {
			return texte;
		}
		return texte.substring(0, limite) + '...';
	}
	return (
		<div className={styles.contenuP}>
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
								// window.location.reload();
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
							<div className={styles.obligatoire}>Blog : </div>
							<select name='id_blog' required>
								<option value=''>Sélectionnez le blog</option>
								{blogs?.map((blog) => (
									<option key={blog.id_blog} value={blog.id_blog}>
										{tronquerTexte(blog.titre, 40)}
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
						{attendre ? <Spinner /> : <button className={styles.button}>Ajouter</button>}
					</div>
				</form>
			</div>
		</div>
	);
};

export default AjouterPhotoBlog;
