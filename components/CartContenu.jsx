import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Contenu.module.css';
import Image from 'next/image';
const CartContenu = ({ contenus }) => {
	const imageRefs = useRef([]);
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

	return (
		<>
			{Array.isArray(contenus) && (
				<>
					{contenus.map((contenu) => (
						<a
							href={contenu.lien}
							target='blank'
							className={styles.box}
							key={contenu.id_contenu}
							ref={(el) => {
								imageRefs.current[contenu.id_contenu] = el;
							}}>
							<div className={styles.photo}>
								<Image src={contenu.image_url} width={contenu.width} height={contenu.height} alt='photo du contenu' />
								<svg width='55' height='55' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24'>
									<path d='M21 12c0-4.969-4.031-9-9-9s-9 4.031-9 9 4.031 9 9 9 9-4.031 9-9Z'></path>
									<path d='m10.14 15.676 5.365-3.241a.511.511 0 0 0 0-.872L10.14 8.322a.505.505 0 0 0-.765.436v6.481a.505.505 0 0 0 .765.437Z'></path>
								</svg>
							</div>
							<p>{contenu.titre}</p>
						</a>
					))}
				</>
			)}
		</>
	);
};

export default CartContenu;
