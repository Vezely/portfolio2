import React, { useEffect, useRef } from 'react';
import styles from '../styles/Profils.module.css';
import Image from 'next/image';

const Profils = () => {
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
	return (
		<div className={styles.contenu}>
			<div className={styles.container}>
				<div className={styles.boxImage}>
					<svg
						ref={(el) => {
							imageRefs.current[1] = el;
						}}
						viewBox='0 0 20 20'
						fill='#000000'>
						<g id='SVGRepo_iconCarrier'>
							<g id='Page-1' stroke='none' strokeWidth='1' fillRule='evenodd'>
								<g id='Dribbble-Light-Preview' transform='translate(-140.000000, -7559.000000)'>
									<g id='icons' transform='translate(56.000000, 160.000000)'>
										<path
											d='M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399'
											id='github-[#142]'></path>
									</g>
								</g>
							</g>
						</g>
					</svg>
				</div>
				<div className={styles.boxImage}>
					<svg
						ref={(el) => {
							imageRefs.current[2] = el;
						}}
						fill='#000000'
						viewBox='0 0 32 32'>
						<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
						<g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
						<g id='SVGRepo_iconCarrier'>
							<title>microsoftoffice</title>
							<path d='M25.925 25.583v-19.198c0-0.005 0-0.011 0-0.016 0-0.22-0.075-0.422-0.202-0.583l0.002 0.002c-0.133-0.166-0.314-0.289-0.521-0.348l-0.007-0.002-4.234-1.162q-0.496-0.139-0.992-0.287-0.496-0.146-0.992-0.27v24.593l6.218-1.783c0.215-0.059 0.396-0.183 0.526-0.348l0.002-0.002c0.125-0.158 0.201-0.36 0.201-0.579 0-0.006-0-0.012-0-0.018v0.001zM27.909 6.385v19.198c0 0.008 0 0.018 0 0.028 0 1.343-0.903 2.474-2.135 2.82l-0.021 0.005-8.607 2.467c-0.102 0.029-0.225 0.053-0.351 0.068l-0.012 0.001c-0.109 0.015-0.236 0.023-0.365 0.024h-0.001c-0.011 0-0.023 0-0.035 0-0.309 0-0.606-0.048-0.885-0.137l0.021 0.006c-0.316-0.108-0.587-0.231-0.843-0.377l0.023 0.012-5.63-3.179c-0.202-0.11-0.367-0.265-0.485-0.452l-0.003-0.005c-0.112-0.179-0.179-0.396-0.179-0.628 0-0.005 0-0.011 0-0.016v0.001c0-0.001 0-0.003 0-0.004 0-0.718 0.582-1.299 1.299-1.299 0.001 0 0.003 0 0.004 0h7.286v-17.709l-5.473 1.953c-0.446 0.156-0.813 0.443-1.065 0.815l-0.005 0.007c-0.252 0.357-0.402 0.801-0.402 1.28 0 0.002 0 0.005 0 0.008v-0 10.095c0 0.004 0 0.009 0 0.015 0 0.835-0.466 1.561-1.152 1.933l-0.012 0.006-2.589 1.412c-0.206 0.114-0.452 0.182-0.713 0.185h-0.001c-0.002 0-0.004 0-0.007 0-0.819 0-1.483-0.664-1.483-1.483 0-0.002 0-0.004 0-0.006v0-14.221c0.002-0.549 0.155-1.062 0.42-1.5l-0.007 0.013c0.262-0.462 0.633-0.836 1.078-1.093l0.014-0.007 9.244-5.257c0.192-0.107 0.414-0.197 0.647-0.258l0.020-0.004c0.214-0.059 0.459-0.093 0.712-0.094h0c0.007-0 0.015-0 0.023-0 0.16 0 0.316 0.014 0.468 0.041l-0.016-0.002c0.181 0.035 0.334 0.075 0.483 0.124l-0.028-0.008 8.608 2.373c1.254 0.362 2.156 1.499 2.156 2.847 0 0.002 0 0.004 0 0.007v-0z'></path>
						</g>
					</svg>
				</div>
				<div className={styles.boxImage}>
					<svg
						ref={(el) => {
							imageRefs.current[3] = el;
						}}
						viewBox='0 0 32 32'>
						<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
						<g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
						<g id='SVGRepo_iconCarrier'>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M25.0133 4H7.0019C5.344 4 4 5.34315 4 7V25C4 26.6569 5.344 28 7.0019 28H25.0133C26.6653 27.9916 28 26.6509 28 25V7C28 5.34907 26.6653 4.00838 25.0133 4ZM9 7H13C14.1046 7 15 7.89543 15 9V23C15 24.1046 14.1046 25 13 25H9C7.89543 25 7 24.1046 7 23V9C7 7.89543 7.89543 7 9 7ZM23 7H19C17.8954 7 17 7.89543 17 9V16C17 17.1046 17.8954 18 19 18H23C24.1046 18 25 17.1046 25 16V9C25 7.89543 24.1046 7 23 7Z'></path>
							<defs>
								<linearGradient id='paint0_linear_87_7663' x1='16.0076' y1='28' x2='16.0076' y2='4' gradientUnits='userSpaceOnUse'>
									<stop stopColor='#0052CC'></stop> <stop offset='0.51698' stopColor='#217EF8'></stop>
									<stop offset='1' stopColor='#2684FF'></stop>
								</linearGradient>
							</defs>
						</g>
					</svg>
				</div>
				<div className={styles.boxImage}>
					<svg
						ref={(el) => {
							imageRefs.current[4] = el;
						}}
						viewBox='0 0 32 32'>
						<g id='SVGRepo_iconCarrier'>
							<path
								d='M16 16C16 13.7909 17.7909 12 20 12C22.2091 12 24 13.7909 24 16C24 18.2091 22.2091 20 20 20C17.7909 20 16 18.2091 16 16Z'
								fill='#1ABCFE'></path>
							<path d='M8 24C8 21.7909 9.79086 20 12 20H16V24C16 26.2091 14.2091 28 12 28C9.79086 28 8 26.2091 8 24Z' fill='#0ACF83'></path>
							<path d='M16 4V12H20C22.2091 12 24 10.2091 24 8C24 5.79086 22.2091 4 20 4H16Z' fill='#FF7262'></path>
							<path d='M8 8C8 10.2091 9.79086 12 12 12H16V4H12C9.79086 4 8 5.79086 8 8Z' fill='#F24E1E'></path>
							<path d='M8 16C8 18.2091 9.79086 20 12 20H16V12H12C9.79086 12 8 13.7909 8 16Z' fill='#A259FF'></path>
						</g>
					</svg>
				</div>
				<div className={styles.boxImage}>
					<svg
						ref={(el) => {
							imageRefs.current[5] = el;
						}}
						viewBox='0 123.30600000000001 595.279 595.279'
						fill='#000000'>
						<g id='SVGRepo_iconCarrier'>
							<radialGradient
								id='a'
								cx='-183.69'
								cy='328.972'
								r='.76'
								gradientTransform='matrix(545.6736 0 0 528.3113 100439.305 -173525.125)'
								gradientUnits='userSpaceOnUse'>
								<stop offset='1' stopColor='#0c0824'></stop>
							</radialGradient>
							<path d='M24.803 155.549h545.674v530.792H24.803V155.549z' fill='url(#a)'></path>
							<path
								d='M24.803 155.549h545.674v530.792H24.803V155.549zM0 711.145h595.28V130.746H0v580.399zm401.318-342.287c-19.595 0-26.291 9.921-26.291 18.106 0 8.929 4.464 15.13 30.756 28.772 38.941 18.851 51.095 36.957 51.095 63.497 0 39.685-30.26 61.016-71.186 61.016-21.579 0-40.182-4.465-50.847-10.665-1.736-.744-1.984-1.984-1.984-3.969v-36.461c0-2.48 1.24-3.225 2.977-1.984 15.626 10.17 33.484 14.634 49.854 14.634 19.595 0 27.78-8.185 27.78-19.347 0-8.929-5.705-16.866-30.757-29.764-35.221-16.866-49.854-33.98-49.854-62.504 0-31.997 25.052-58.536 68.457-58.536 21.331 0 36.213 3.225 44.398 6.945 1.984 1.24 2.48 3.224 2.48 4.96v33.98c0 1.984-1.24 3.225-3.721 2.48-10.913-6.943-27.035-11.16-43.157-11.16zm-213.309 29.516c5.705.496 10.17.496 20.091.496 29.021 0 56.304-10.169 56.304-49.606 0-31.5-19.595-47.375-52.583-47.375-9.921 0-19.347.496-23.812.744v95.741zM143.86 266.668c0-1.736 3.473-2.977 5.456-2.977 15.875-.744 39.438-1.24 63.993-1.24 68.705 0 95.492 37.701 95.492 85.82 0 63-45.638 90.036-101.693 90.036-9.425 0-12.649-.496-19.347-.496v95.245c0 1.984-.744 2.976-2.976 2.976h-37.949c-1.984 0-2.977-.744-2.977-2.976V266.668z'
								fill='#31c5f0'></path>
						</g>
					</svg>
				</div>
				<div className={styles.boxImage}>
					<svg
						ref={(el) => {
							imageRefs.current[6] = el;
						}}
						viewBox='0 123.30600000000001 595.279 595.279'
						fill='#000000'>
						<g id='SVGRepo_iconCarrier'>
							<radialGradient
								id='a'
								cx='-183.69'
								cy='328.972'
								r='.76'
								gradientTransform='matrix(545.6736 0 0 528.3113 100439.305 -173525.125)'
								gradientUnits='userSpaceOnUse'></radialGradient>
							<path d='M24.803 155.549h545.674v530.792H24.803V155.549z' fill='url(#a)'></path>
							<path
								d='M24.803 155.549h545.674v530.792H24.803V155.549zM0 711.145h595.28V130.746H0v580.399zm389.908-373.539c0-1.984.744-2.977 2.977-2.977h38.941c1.983 0 2.976.744 2.976 2.977v195.699c0 1.983-.496 2.976-2.976 2.976h-38.445c-2.48 0-3.225-1.24-3.225-3.224V337.606h-.248zm-2.728-56.304c0-15.874 11.161-25.299 25.3-25.299 15.13 0 25.299 10.169 25.299 25.299 0 16.37-10.665 25.299-25.795 25.299-14.387.001-24.804-8.929-24.804-25.299zM275.565 419.209c-6.944-27.532-23.314-87.556-29.516-116.576h-.496c-5.209 29.02-18.354 78.13-28.771 116.576h58.783zm-68.953 40.182l-19.595 74.41c-.496 1.983-1.24 2.479-3.72 2.479h-36.461c-2.48 0-2.977-.744-2.48-3.72l70.441-246.546c1.24-4.464 1.984-8.433 2.48-20.586 0-1.736.744-2.48 1.984-2.48h52.087c1.736 0 2.48.496 2.977 2.48l78.874 267.628c.496 1.983 0 3.224-1.984 3.224h-41.174c-1.984 0-3.225-.496-3.72-2.231l-20.339-74.658h-79.37z'
								fill='#ff7f18'></path>
						</g>
					</svg>
				</div>
				<div className={styles.boxImage}>
					<svg
						ref={(el) => {
							imageRefs.current[7] = el;
						}}
						fill='currentColor'
						viewBox='0 0 24 24'>
						<path d='m12 2.25 11.25 19.5H.75L12 2.25Z'></path>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default Profils;
