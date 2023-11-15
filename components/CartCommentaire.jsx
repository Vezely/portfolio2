import React, { useEffect, useRef } from 'react';
import styles from '../styles/Commentaire.module.css';

const CartCommentaire = ({ commentaire, commentaireRecent }) => {
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
					observer.unobserve(entry.target);
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
			{Array.isArray(commentaire) && (
				<>
					<div className={styles.container_commentaire}>
						{commentaire.slice(0, commentaire.length / 2).map((comment, index) => (
							<div
								ref={(el) => {
									imageRefs.current[comment.id_commentaire] = el;
								}}
								className={styles.box}
								key={comment.id_commentaire}>
								<div>
									<div className={styles.nom_commentataire}>{comment.nom_commentateur}</div>
									<div className={styles.date_ajout}>{new Date(comment.date_commentaire).toLocaleDateString('fr-FR')}</div>
								</div>
								<p>{comment.commentaire}</p>
							</div>
						))}
					</div>
					<div className={styles.container_commentaire}>
						{commentaire.slice(commentaire.length / 2, commentaire.length).map((comment, index) => (
							<div
								ref={(el) => {
									imageRefs.current[comment.id_commentaire] = el;
								}}
								className={styles.box}
								key={comment.id_commentaire}>
								<div>
									<div className={styles.nom_commentataire}>{comment.nom_commentateur}</div>
									<div className={styles.date_ajout}>{new Date(comment.date_commentaire).toLocaleDateString('fr-FR')}</div>
								</div>
								<p>{comment.commentaire}</p>
							</div>
						))}
						{commentaireRecent && (
							<div
								ref={(el) => {
									imageRefs.current[113] = el;
								}}
								className={styles.box}>
								<div>
									<div className={styles.nom_commentataire}>{commentaireRecent.nom_commentateur}</div>
									<div className={styles.date_ajout}>{new Date().toLocaleDateString('fr-FR')}</div>
								</div>
								<p>{commentaireRecent.commentaire}</p>
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
};

export default CartCommentaire;
