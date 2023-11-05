import React, { useEffect, useState } from 'react';
import styles from '../styles/Admin.module.css';
import { useForm } from 'react-hook-form';
import Spinner from './Spinner';

const SupprimerBlog = (blogs) => {
	const [blogsData, setBlogsData] = useState(blogs.blogs);
	const [attendre, setAttendre] = useState(false);
	const [succes, setSucces] = useState(false);
	const toggleSucces = () => {
		setSucces(!succes);
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const [idBlog, setIdBlog] = useState(null);

	const getIdBlog = async (id_blog) => {
		setIdBlog(id_blog);
	};

	const supprimerBlog = async () => {
		setAttendre(true);
		try {
			let response = await fetch(`/api/supprimerBlog?id_blog=${idBlog}`, {
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
							}}
							className={styles.button}>
							OK
						</div>
					</div>
				</div>
			)}
			<div className={`${styles.formulaire} animate__animated animate__fadeIn`}>
				<h2>Suprimer un blog </h2>
				<form className={styles.form} onSubmit={handleSubmit(supprimerBlog)}>
					<div className={`${styles.section} animate__animated animate__fadeIn`}>
						<label>
							<div className={styles.obligatoire}>Choisir le blog : </div>
							<select
								name='id_blog'
								// required
								{...register('id_blog', { required: 'Selectionnez le blog' })}
								onChange={(e) => {
									getIdBlog(e.target.value);
								}}>
								<option value=''>Sélectionnez le blog</option>
								{blogsData.map((blog) => (
									<option key={blog.id_blog} value={blog.id_blog}>
										{tronquerTexte(blog.titre, 40)}
									</option>
								))}
							</select>
							{errors.id_blog && <p className={`${styles.erreur} animate__animated animate__headShake`}>{errors.id_blog.message}</p>}
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
	);
};

export default SupprimerBlog;
