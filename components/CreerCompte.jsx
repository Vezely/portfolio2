import React, { useState } from 'react';
import styles from '../styles/Connexion.module.css';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Spinner from './Spinner';

const CreerCompte = () => {
	const router = useRouter();
	const [attendre, setAttendre] = useState(false);
	const [motDePasseDifferent, setMotDePasseDifferent] = useState(false);
	const [userExist, setUserExist] = useState(false);
	const [creerCompteSv, setCreerCompteSv] = useState(true);
	const [connexionS, setConnexionS] = useState(true);
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		setValue,
	} = useForm();
	const textRadio = {
		creerUnCompte: 'Créer un compte',
		connexion: 'Connexion',
	};
	const formConnexionS = () => {
		setConnexionS(!connexionS);
	};
	const formSuivant = () => {
		setCreerCompteSv(!creerCompteSv);
	};
	const handleRadioClick = (e) => {
		if (e.target.value === textRadio.creerUnCompte) {
			setSelectedRation(true);
		} else {
			setSelectedRation(false);
		}
	};

	const creerUnCompte = async (data) => {
		let response = await fetch(`/api/creerUnCompte`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});
		if (response.ok) {
			setAttendre(true);
			Cookies.set('jwtToken', data.token);
			Cookies.set('timestamp', new Date().toString());
			router.push('/blogs');
		} else if (response.status == 400) {
			setMotDePasseDifferent('Les deux mot de passe doivent être identiques');
		} else if (response.status == 500) {
			setUserExist('Ce compte existe déjà!');
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(creerUnCompte)} className={styles.form}>
				<div>
					<div className={styles.title}>Création de compte </div>
					<p className={styles.message}>Veillez remplire tous les champs indiqués. </p>

					<div className={styles.flex}>
						<label className='animate__animated animate__fadeIn'>
							<input {...register('nom', { required: 'Le nom est requis' })} type='text' autoFocus className={styles.input} />
							<span>Nom</span>
							{errors.nom && <p className={`${styles.erreur} animate__animated animate__headShake`}> {errors.nom.message} </p>}
						</label>
						<label className='animate__animated animate__fadeIn'>
							<input {...register('prenom', { required: 'Le prenom est requis' })} type='text' className={styles.input} />
							<span>Prénom</span>
							{errors.prenom && <p className={`${styles.erreur} animate__animated animate__headShake`}> {errors.prenom.message} </p>}
						</label>
					</div>
					<label className='animate__animated animate__fadeIn'>
						<input
							{...register('email', {
								required: 'Le email est requis',
								pattern: {
									value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
									message: "Le courriel n'est pas valide",
								},
							})}
							type='email'
							className={styles.input}
						/>
						<span>Email</span>
						{errors.email && <p className={`${styles.erreur} animate__animated animate__headShake`}> {errors.email.message} </p>}
					</label>

					<div className={styles.flex}>
						<label className='animate__animated animate__fadeIn'>
							<input {...register('mot_de_passe', { required: 'Le mot de passe est requis' })} type='password' className={styles.input} />
							<span>Mot de passe</span>
							{errors.mot_de_passe && (
								<p className={`${styles.erreur} animate__animated animate__headShake`}> {errors.mot_de_passe.message} </p>
							)}
						</label>
						<label className='animate__animated animate__fadeIn'>
							<input
								{...register('mot_de_passe_confirm', { required: 'Le mot de passe est requis' })}
								type='password'
								className={styles.input}
							/>
							<span>Confirmer le mot de passe</span>
							{errors.mot_de_passe_confirm && (
								<p className={`${styles.erreur} animate__animated animate__headShake`}> {errors.mot_de_passe_confirm.message} </p>
							)}
							{motDePasseDifferent && <p className={`${styles.erreur} animate__animated animate__headShake`}> {motDePasseDifferent} </p>}
						</label>
					</div>
					{userExist && <p className={`${styles.erreur} animate__animated animate__headShake`}> {userExist} </p>}

					<div className={styles.compte}>
						Vous avez déjà un compte? <Link href='/connexion'>Connectez-vous</Link>
					</div>
					<div className={styles.suivant}>
						<div></div>
						{attendre ? <Spinner /> : <button className={styles.submit}>Créer le compte</button>}
					</div>
				</div>
			</form>
		</>
	);
};

export default CreerCompte;
