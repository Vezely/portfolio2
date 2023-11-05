import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import styles from '../styles/Admin.module.css';
import Spinner from './Spinner';
const AjouterTechnologie = (projets) => {
	const [attendre, setAttendre] = useState(false);
	const projetsData = projets.projets;
	const [succes, setSucces] = useState(false);
	const toggleSucces = () => {
		setSucces(!succes);
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		setValue,
	} = useForm();

	const onSubmit = async (data) => {
		setAttendre(true);
		try {
			let response = await fetch(`/api/ajouterTechnologie`, {
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
				<h2>Ajouter une technologie </h2>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.section}>
						<label>
							<span className={styles.obligatoire}>Nom de technologie : </span>
							<input
								{...register('nom', { required: 'Ce champ est requis' })}
								type='text'
								name='nom'
								placeholder='Saisissez le nom de la technologie ici'
							/>
							{errors.nom && <p className={styles.erreur}>{errors.nom.message}</p>}
						</label>
						<label>
							<div className={styles.obligatoire}>Projet : </div>
							<select {...register('id_projet', { required: 'Selectionnez le projet' })} name='id_projet'>
								<option value=''>Sélectionnez le projet</option>
								{projetsData.map((projet) => (
									<option key={projet.id_projet} value={projet.id_projet}>
										{projet.titre}
									</option>
								))}
							</select>
							{errors.id_projet && <p className={styles.erreur}>{errors.id_projet.message}</p>}
						</label>
					</div>

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

export default AjouterTechnologie;
