import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/ProjetsRecents.module.css';
import CartProjet from './CartProjet';
const ProjetsRecents = () => {
	const [projets, setProjets] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function fetchProjet() {
			try {
				let response = await fetch('/api/projets', {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				});
				const data = await response.json();
				setProjets(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false); // Marquez la requête comme terminée, que ce soit un succès ou une erreur
			}
		}
		fetchProjet();
	}, []);
	const imageRefs = useRef([]);

	// console.log('UUID généré :', uuid);
	useEffect(() => {
		const options = {
			threshold: 0.5, // Pourcentage de visibilité nécessaire pour déclencher l'effet (50% ici)
		};
		// Créez une instance de l'observateur d'intersection
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// L'élément est visible à l'écran, augmentez l'opacité avec une transition
					entry.target.style.opacity = 1;
					entry.target.style.transition = 'ease-in 0.2s'; // Ajout de la transition
					entry.target.style.transform = 'scale(1)';

					// Arrêtez d'observer cet élément une fois que l'opacité a été ajustée
					// observer.unobserve(entry.target);
				} else {
					// L'élément n'est plus visible à l'écran, réinitialisez les styles
					entry.target.style.opacity = 0;
					entry.target.style.transition = 'ease-out 0.8s'; // Supprimez la transition
					entry.target.style.transform = 'scale(0.8)';
				}
			});
		}, options);
		// Parcourez toutes les références d'images et observez-les
		imageRefs.current.forEach((imageRef) => {
			observer.observe(imageRef);
		});

		// N'oubliez pas de nettoyer l'observateur lorsque le composant est démonté
		return () => {
			observer.disconnect();
		};
	}, []);

	const imageRefs2 = useRef([]);

	useEffect(() => {
		const options2 = {
			threshold: 0.5, // Pourcentage de visibilité nécessaire pour déclencher l'effet (50% ici)
		};
		// Créez une instance de l'observateur d'intersection
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// L'élément est visible à l'écran, augmentez l'opacité avec une transition
					entry.target.style.opacity = 1;
					entry.target.style.transition = 'ease-in 0.2s'; // Ajout de la transition
					entry.target.style.transform = 'scale(1)';

					// Arrêtez d'observer cet élément une fois que l'opacité a été ajustée
					// observer.unobserve(entry.target);
				} else {
					// L'élément n'est plus visible à l'écran, réinitialisez les styles
					entry.target.style.opacity = 0;
					entry.target.style.transition = 'ease-out 0.8s'; // Supprimez la transition
					entry.target.style.transform = 'scale(0.8)';
				}
			});
		}, options2);
		// Parcourez toutes les références d'images et observez-les
		imageRefs2.current.forEach((imageRef) => {
			observer.observe(imageRef);
		});

		// N'oubliez pas de nettoyer l'observateur lorsque le composant est démonté
		return () => {
			observer.disconnect();
		};
	}, []);

	function tronquerTexte(texte, limite) {
		if (texte.length <= limite) {
			return texte;
		}
		return texte.substring(0, limite) + '...';
	}

	return (
		<>
			{loading ? (
				<div className={styles.container}>
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
					<h2 id='projets-recents'>
						<span>Travaux Récents</span>
					</h2>
					<div className={styles.projetBoxContainer}>
						<CartProjet projets={projets} />

						<a href='https://portfolio-vezely-kante.vercel.app/portfolio' target='blank' className={styles.codepen_button}>
							<span>Voir Plus</span>
						</a>
					</div>
				</div>
			)}
		</>
	);
};

export default ProjetsRecents;
