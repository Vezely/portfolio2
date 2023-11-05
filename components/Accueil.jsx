import Link from 'next/link';
import styles from '../styles/Accueil.module.css';
import Appros from './Appros';
import Service from './Service';
import Profils from './Profils';
import Image from 'next/image';
import Contact from './Contact';
import Competances from './Competances';
import Commentaire from './Commentaire';
import ProjetsRecents from './ProjetsRecents';
import HeaderAccueil from './HeaderAccueil';
import { useState, useEffect } from 'react';
import Blogs from './blogs';
import Contenu from './Contenu';

export default function Accueil() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulez un chargement asynchrone (vous pouvez utiliser une requête API réelle ici)
		setTimeout(() => {
			setLoading(false);
		}, 1000); // Remplacez 2000 par la durée réelle du chargement
	}, []);

	return (
		<>
			{loading ? (
				<div className={styles.container2}>
					<div className={styles.dot_spinner}>
						<div className={styles.dot_spinner_dot}></div>
						<div className={styles.dot_spinner_dot}></div>
						<div className={styles.dot_spinner_dot}></div>
						<div className={styles.dot_spinner_dot}></div>
						<div className={styles.dot_spinner_dot}></div>
						<div className={styles.dot_spinner_dot}></div>
						<div className={styles.dot_spinner_dot}></div>
						<div className={styles.dot_spinner_dot}></div>
					</div>
				</div>
			) : (
				<div className={styles.container}>
					<HeaderAccueil />
					<Profils />

					<Competances />

					<ProjetsRecents />
					<Appros />
					<Contenu />
					<Blogs />
					<Commentaire />
					<Contact />
					<Service />
				</div>
			)}
		</>
	);
}
