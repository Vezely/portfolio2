import React, { useEffect, useState } from 'react';
import styles from '../styles/Connexion.module.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Spinner from './Spinner';

const SeConnecter = () => {
	const router = useRouter();
	const [usersNotFound, setUsersNotFound] = useState(false);
	const [attendre, setAttendre] = useState(false);
	const [sessionExpirer, setSessionExpirer] = useState(false);
	const checkAuthorization = () => {
		const timestamp = Cookies.get('timestamp');
		if (timestamp) {
			const currentTime = new Date().getTime();
			const loginTime = new Date(timestamp).getTime();
			const minutesPassed = (currentTime - loginTime) / (1000 * 60); // minutes

			if (minutesPassed > 10) {
				// Plus de 30 minutes d'inactivité, déconnecter
				Cookies.remove('jwtToken');
				setSessionExpirer(false);
				console.log("Connexion expiré après 10 minutes d'inactivité");
				return false;
			} else {
				// Le token est valide et n'a pas expiré
				setSessionExpirer(true);
				return true;
			}
		} else {
			// L'horodatage n'est pas présent, déconnecter
			setSessionExpirer(false);
			return false;
		}
	};
	useEffect(() => {
		// Vérifier l'autorisation lors du chargement de la page
		if (checkAuthorization()) {
			Cookies.set('timestamp', new Date().toString());
		}
	}, []);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const seConnecter = async (data) => {
		try {
			let response = await fetch(`/api/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			if (response.ok) {
				const data = await response.json();
				Cookies.set('jwtToken', data.token);
				Cookies.set('timestamp', new Date().toString());
				// router.push('/blogs');
				if (data.estAutorise) {
					router.push('/admin/vg73');
					setAttendre(true);
				} else {
					router.push('/blogs');
					setAttendre(true);
				}
			} else if (response.status === 400) {
				setUsersNotFound(true);
			} else {
				// Gérer d'autres erreurs ici
				console.log('Erreur de connexion');
			}
		} catch (error) {
			console.error('Erreur réseau', error);
		}
	};

	return (
		<>
			{sessionExpirer ? (
				<div className={styles.maske}>
					<div className={styles.popup}>
						<div className={styles.titre}>Vous ête déjà connecter </div>
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
						<div onClick={() => router.push('/blogs')} className={styles.button}>
							OK
						</div>
					</div>
				</div>
			) : (
				<form onSubmit={handleSubmit(seConnecter)} className={styles.form}>
					<div>
						<div className={styles.title}>Connexion </div>
						<p className={styles.message}>Merci de vous connecter pour pouvoir publier une blog. </p>
						<label className='animate__animated animate__fadeIn'>
							<input type='text' {...register('email', { required: 'Le email est obligatoire!' })} name='email' className={styles.input} />
							<span>Email</span>
							{errors.email && <p className={`${styles.erreur} animate__animated animate__headShake`}>{errors.email.message}</p>}
						</label>
						<label className='animate__animated animate__fadeIn'>
							<input
								type='password'
								{...register('mot_de_passe', { required: 'Le mot de passe est obligatoire!' })}
								name='mot_de_passe'
								className={styles.input}
							/>
							<span>Mot de passe</span>
						</label>
						{errors.mot_de_passe && <p className={`${styles.erreur} animate__animated animate__headShake`}>{errors.mot_de_passe.message}</p>}
						{usersNotFound && (
							<p className={`${styles.erreur} animate__animated animate__headShake`}>L&apos;email ou le mot de passe est incorrecte!</p>
						)}
						<div className={styles.compte}>
							Besoin d&apos;un compte? <Link href='/creer-un-compte'>Créer un compte</Link>
						</div>
						<div style={{ marginTop: '0' }} className={styles.compte}>
							Email ou mot de passe oublier?{' '}
							<a target='blank' href='https://api.whatsapp.com/send?1=pt_BR&phone=623706986'>
								Contacter moi
							</a>
						</div>
						<div className={styles.suivant}>
							<div></div>
							{attendre ? <Spinner /> : <button className={styles.submit}>Se Connecter</button>}
						</div>
					</div>
				</form>
			)}
		</>
	);
};

export default SeConnecter;
