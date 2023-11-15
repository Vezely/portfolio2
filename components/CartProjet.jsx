import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/ProjetsRecents.module.css';
const CartProjet = ({ projets }) => {
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
					entry.target.style.transition = 'ease-in 0.5s'; // Ajout de la transition
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
					entry.target.style.transition = 'ease-in 0.5s'; // Ajout de la transition
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
			<div className={styles.projetBoxContainer}>
				{Array.isArray(projets) && (
					<>
						{projets.map((projet, index) => (
							<div className={styles.boxProjet} key={projet.id_projet}>
								<Link href={`/projet/${projet.id_projet}`}>
									{projet.image_url1 ? (
										<>
											<div
												ref={(el) => {
													imageRefs.current[index] = el;
												}}>
												<Image
													priority={true}
													src={projet.image_url1}
													width={projet.width1}
													height={projet.height1}
													alt='image du projet'
												/>
												<h3>{projet.titre}</h3>
											</div>
										</>
									) : (
										<div>
											<Image
												priority={true}
												ref={(el) => {
													imageRefs.current[111] = el;
												}}
												src='/images/projet/defaut.jpg'
												width={1280}
												height={836}
												alt='image du projet'
											/>
											<h3>{projet.titre}</h3>
										</div>
									)}
								</Link>
								<Link href={`/projet/${projet.id_projet}`}>
									{projet.image_url2 ? (
										<>
											<div
												ref={(el) => {
													imageRefs2.current[index] = el;
												}}>
												<Image
													priority={true}
													src={projet.image_url2}
													width={projet.width2}
													height={projet.height2}
													alt='image du projet'
												/>
												<p>{tronquerTexte(projet.description, 120)}</p>
											</div>
										</>
									) : (
										<div
											ref={(el) => {
												imageRefs2.current[index] = el;
											}}>
											<Image priority={true} src='/images/projet/defaut.jpg' width={1280} height={836} alt='image du projet' />
											<p>{tronquerTexte(projet.description, 120)}</p>
										</div>
									)}
								</Link>
							</div>
						))}
					</>
				)}
			</div>
		</>
	);
};

export default CartProjet;
