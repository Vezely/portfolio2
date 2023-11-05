import React, { useState } from 'react';
import styles from '../styles/Appropos.module.css';
import Image from 'next/image';
import { useTransition, animated } from 'react-spring';
const Appros = () => {
	const tabImgUtils = [
		{
			image: '/images/utils/1.jpg',
			width: 7360,
			height: 4912,
			titre: null,
			description:
				"Mon expertise en développement web me permet de concevoir des sites web réactifs, d'élaborer des applications interactives et de créer des expériences en ligne exceptionnelles. Mon objectif est de fournir des solutions web exceptionnelles qui répondent à vos besoins tout en dépassant vos attentes.",
		},
		{
			image: '/images/utils/2.jpg',
			width: 7360,
			height: 4912,
			titre: 'Développement Web',
			description:
				'Création de sites web professionnels, responsives et optimisés pour les moteurs de recherche. Utilisation des dernières technologies et frameworks tels que HTML5, CSS3, JavaScript, React, Angular, Vue.js, etc.',
		},
		{
			image: '/images/utils/3.jpg',
			width: 6079,
			height: 4053,
			titre: "Développement d'applications mobiles ",
			description:
				"Conception et développement d'applications mobiles natives ou hybrides pour Android et iOS, en utilisant des outils tels que React Native, Java, Swift ou Kotlin.",
		},
		{
			image: '/images/utils/4.jpg',
			width: 3000,
			height: 2000,
			titre: 'Conception (UI) et (UX) ',
			description:
				"Création de designs d'interfaces utilisateur attrayants, intuitifs et fonctionnels pour les applications web, mobiles ou de bureau, ainsi que l'optimisation de l'expérience utilisateur.",
		},
		{
			image: '/images/utils/5.jpg',
			width: 5157,
			height: 3438,
			titre: 'Formation et consultation en programmation ',
			description:
				'Offre de services de formation et de consultation en programmation pour les individus et les organisations cherchant à améliorer leurs compétences en développement.',
		},
		{
			image: '/images/utils/6.png',
			width: 2560,
			height: 1664,
			titre: "L'optimisation des performances",
			description:
				"Analyse et optimisation des performances des applications web, mobiles ou de bureau pour améliorer la rapidité et l'efficacité.",
		},
	];
	const [currentImage, setCurrentImage] = useState(0);

	const transitions = useTransition(currentImage, {
		from: { opacity: 0, transform: 'scale(0.5)' },
		enter: { opacity: 1, transform: 'scale(1)' },
		// leave: { opacity: 0, transform: 'scale(0.5)' },
	});

	const handleImageClick = (index) => {
		setCurrentImage(index);
	};

	return (
		<div className={styles.contenu}>
			<div className={styles.container}>
				{transitions((props, index) => (
					<animated.div className={styles.photo} style={props}>
						{tabImgUtils[currentImage].image && (
							<Image
								src={tabImgUtils[currentImage].image}
								priority={true}
								width={tabImgUtils[currentImage].width}
								height={tabImgUtils[currentImage].height}
								alt='photo'
							/>
						)}
					</animated.div>
				))}

				<div className={styles.appropos}>
					<div className={styles.section1}>
						<h2>A propos de moi</h2>
						<p>
							Je suis Vezely Kante, un développeur web passionné par l&apos;innovation et la créativité. Mon parcours est marqué par mon
							engagement envers l&apos;excellence et ma quête constante de solutions pratiques. Je suis un résolveur de problèmes acharné et un
							penseur créatif, déterminé à créer des expériences web exceptionnelles.
						</p>
					</div>
					<div className={styles.section1}>
						<h2>Ce que je fais</h2>

						<>
							{transitions((props, index) => (
								<animated.div style={props}>
									{tabImgUtils[currentImage].titre && (
										<h3>
											<span style={{ color: 'green' }}>✓</span> {tabImgUtils[currentImage].titre} :
										</h3>
									)}
									<p>{tabImgUtils[currentImage].description} </p>
								</animated.div>
							))}
						</>

						<div className={styles.nbImage}>
							{tabImgUtils.map((item, index) => (
								<span
									onClick={() => handleImageClick(index)}
									className={currentImage === index ? styles.imageAfficher : ''}
									key={index}></span>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	// return (
	// 	<div className={styles.contenu}>
	// 		<div className={styles.container}>
	// 			{transitions((props, index) => (
	// 				<animated.div style={props}>
	// 					<div className={styles.imageContainer}>
	// 						<Image
	// 							src={tabImgUtils[index].image}
	// 							priority={true}
	// 							width={tabImgUtils[index].width}
	// 							height={tabImgUtils[index].height}
	// 							alt='photo'
	// 						/>
	// 					</div>
	// 					<div className={styles.appropos}>
	// 						<div className={styles.section1}>
	// 							<h2>A propos de moi</h2>
	// 							<p>{/* Votre contenu */}</p>
	// 						</div>
	// 						<div className={styles.section1}>
	// 							<h2>Ce que je fais</h2>
	// 							{tabImgUtils[index].titre && (
	// 								<h3>
	// 									<span style={{ color: 'green' }}>✓</span> {tabImgUtils[index].titre} :
	// 								</h3>
	// 							)}
	// 							<p>{tabImgUtils[index].description}</p>
	// 							<div className={styles.nbImage}>
	// 								{tabImgUtils.map((item, i) => (
	// 									<span onClick={() => handleImageClick(i)} className={currentImage === i ? styles.imageAfficher : ''} key={i}></span>
	// 								))}
	// 							</div>
	// 						</div>
	// 					</div>
	// 				</animated.div>
	// 			))}
	// 		</div>
	// 	</div>
	// );
};

export default Appros;
