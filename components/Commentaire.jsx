import React, { useEffect, useState } from 'react';
import styles from '../styles/Commentaire.module.css';
import { useForm } from 'react-hook-form';
import Spinner from './Spinner';
import CartCommentaire from './CartCommentaire';

const Commentaire = () => {
	const [activerForm, setActiverForm] = useState(false);
	const [commentaire, setCommentaire] = useState([]);
	const [attendre, setAttendre] = useState(false);
	const toggleForm = () => {
		setActiverForm(!activerForm);
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		setValue,
	} = useForm();

	const [commentaireRecent, setCommentaireRecent] = useState(null);
	const ajouterCommentaire = async (data) => {
		setAttendre(true);
		try {
			let response = await fetch(`/api/addCommentaire`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			if (response.ok) {
				reset();
				setCommentaireRecent(data);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setAttendre(false);
		}
	};

	useEffect(() => {
		async function fetchCommentaire() {
			let response = await fetch('/api/getAllCommentaires', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});
			const data = await response.json();
			setCommentaire(data);
		}
		fetchCommentaire();
	}, []);
	return (
		<div className={styles.container}>
			<h3>Merci pour vos commentaires 🫶</h3>

			{commentaire.length > 0 && <CartCommentaire commentaire={commentaire} commentaireRecent={commentaireRecent} />}

			<svg
				className={styles.chater}
				onClick={toggleForm}
				width='46'
				height='46'
				fill='currentColor'
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'>
				<path d='M21.375 2.25H2.625A1.125 1.125 0 0 0 1.5 3.375v13.5A1.125 1.125 0 0 0 2.625 18H6v3.75L11.52 18h9.855a1.125 1.125 0 0 0 1.125-1.125v-13.5a1.125 1.125 0 0 0-1.125-1.125ZM7.5 11.625a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z'></path>
			</svg>
			{activerForm && (
				<div className={`${styles.form_container} animate__animated animate__backInLeft`}>
					<form onSubmit={handleSubmit(ajouterCommentaire)} className={`${styles.form} `}>
						<div>
							<div className={styles.title}>Commentaire </div>
							<p className={styles.message}>Vos appréciations et suggestions m&apos;interesse, n&apos;hesitez pas surtout, lachez-vous!</p>
							<label className='animate__animated animate__fadeIn'>
								<input
									type='text'
									{...register('nom_commentateur', { required: 'Saisissez votre nom' })}
									name='nom_commentateur'
									className={styles.input}
								/>
								<span>Nom</span>
							</label>
							{errors.nom_commentateur && <p className={styles.erreur}>{errors.nom_commentateur.message}</p>}

							<label className='animate__animated animate__fadeIn'>
								<textarea
									{...register('commentaire', { required: 'Votre commentaire est requis' })}
									name='commentaire'
									placeholder='Votre commentaire ici'></textarea>
							</label>
							{errors.commentaire && <p className={styles.erreur}>{errors.commentaire.message}</p>}
							<div className={styles.suivant}>
								<span></span>
								{attendre ? <Spinner /> : <button className={styles.submit}>Envoyer</button>}
							</div>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default Commentaire;
