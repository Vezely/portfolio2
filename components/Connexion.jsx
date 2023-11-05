import React, { useState } from 'react';
import styles from '../styles/Connexion.module.css';
import { useRouter } from 'next/router';
import SeConnecter from './SeConnecter';
import CreerCompte from './CreerCompte';
const Connexion = () => {
	const router = useRouter();
	const [selectedRadio, setSelectedRation] = useState(false);
	const [creerCompteSv, setCreerCompteSv] = useState(true);
	const [connexionS, setConnexionS] = useState(true);

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

	const connexionEmployer = async (data) => {
		let response = await fetch(`/api/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});
		if (response.ok) {
			reset();
			router.push('/');
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.radio_inputs}>
				<label className={styles.radio}>
					<input type='radio' name='radio' defaultChecked value={textRadio.connexion} onClick={handleRadioClick} />
					<span className={styles.name}>{textRadio.connexion}</span>
				</label>
				<label className={styles.radio}>
					<input type='radio' name='radio' value={textRadio.creerUnCompte} onClick={handleRadioClick} />
					<span className={styles.name}>{textRadio.creerUnCompte}</span>
				</label>
			</div>
			<div className={styles.form_container}>{selectedRadio ? <CreerCompte /> : <SeConnecter />}</div>
		</div>
	);
};

export default Connexion;
