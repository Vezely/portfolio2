import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/Projet.module.css';
import { useTransition, animated } from 'react-spring';
import Profils2 from '../../components/Profils2';
const Projet = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [likes, setLikes] = useState(0);

	const [videoVisible, setVideoVisible] = useState(true);

	const handleSvgClick = () => {
		const video = document.getElementById('video-projet');
		if (video.paused) {
			video.play();
			video.setAttribute('controls', 'controls'); // Ajouter l'attribut "controls"
			setVideoVisible(false);
		} else {
			video.pause();
			video.removeAttribute('controls'); // Retirer l'attribut "controls"
			setVideoVisible(true);
		}
	};
	const [isZoomed, setIsZoomed] = useState(false);

	// Fonction pour basculer le zoom
	const toggleZoom = () => {
		setIsZoomed(!isZoomed);
	};

	const [idProjet, setIdProjet] = useState();
	useEffect(() => {
		const { projet } = router.query;
		if (projet) {
			setIdProjet(projet);
		}
	}, [router.query]);

	const [projet, setProjet] = useState([]);
	const [technologies, setTechnologies] = useState([]);
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		async function fetchProjet() {
			if (idProjet) {
				try {
					let response = await fetch(`/api/projet?id_projet=${idProjet}`, {
						method: 'GET',
						headers: { 'Content-Type': 'application/json' },
					});
					const data = await response.json();
					if (response.ok) {
						setProjet(data);
					}
				} catch (error) {
					console.log(error);
				} finally {
					setLoading(false); // Marquez la requête comme terminée, que ce soit un succès ou une erreur
				}
			}
		}
		fetchProjet();
	}, [idProjet]);
	useEffect(() => {
		async function fetchTechnologie() {
			if (idProjet) {
				let response = await fetch(`/api/technologies?id_projet=${idProjet}`, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				});
				const data = await response.json();
				if (response.ok) {
					setTechnologies(data);
				}
			}
		}
		fetchTechnologie();
	}, [idProjet]);

	useEffect(() => {
		async function fetchVideo() {
			if (idProjet) {
				let response = await fetch(`/api/video?id_projet=${idProjet}`, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				});
				const data = await response.json();
				if (response.ok) {
					setVideos(data);
				}
			}
		}
		fetchVideo();
	}, [idProjet]);
	const [currentImage, setCurrentImage] = useState(0);

	function handlePrevClick() {
		setCurrentImage((prevImage) => (prevImage === 0 ? projet.length - 1 : prevImage - 1));
	}

	function handleNextClick() {
		setCurrentImage((prevImage) => (prevImage === projet.length - 1 ? 0 : prevImage + 1));
	}
	const transitions = useTransition(currentImage, {
		from: { opacity: 0.5 },
		enter: { opacity: 1, transition: '.2s' },
		// leave: { },
	});

	const updatelike = async () => {
		let response = await fetch(`/api/updateLike?id_projet=${idProjet}`, {
			method: 'POST',
		});

		if (response.ok) {
			setLikes(likes + 1);
		}
	};
	return (
		<>
			<Head>
				<title>Projet</title>
				<meta charSet='UTF-8'></meta>
				<meta name='description' content='Page projet du site de vezely kante avec des details sur le projet' />
				<meta name='theme-color' content='#212529' />
				<meta property='og:title' content='Page projet' />
				<meta property='og:description' content='Page projet du site de vezely kante avec des details sur le projet' />
				<meta property='og:image' content='http://localhost:3000/images/logoU.png' />
			</Head>
			{loading ? (
				<div className={styles.container3}>
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
					<div className={styles.slideContainer}>
						<div className={`${styles.bacground_image} `}>
							{/* <h2>VG73</h2> */}

							<div className={styles.directionContainer}>
								<svg viewBox='0 0 1024 1024' fill='#000000' onClick={handlePrevClick}>
									<g id='SVGRepo_bgCarrier'></g>
									<g id='SVGRepo_tracerCarrier'></g>
									<g>
										<path
											d='M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z'
											fill=''></path>
									</g>
								</svg>
								<div className={styles.nbImage}>
									{projet.map((item, index) => (
										<span
											onClick={() => setCurrentImage(index)}
											className={currentImage == index ? styles.imageAfficher : ''}
											key={index}></span>
									))}
								</div>
								<svg viewBox='0 0 1024 1024' fill='#000000' onClick={handleNextClick}>
									<g id='SVGRepo_bgCarrier'></g>
									<g id='SVGRepo_tracerCarrier'></g>
									<g>
										<path
											d='M642.174 504.594c7.99 7.241 7.897 17.58-0.334 24.782L332.62 799.945c-8.867 7.759-9.766 21.236-2.007 30.103 7.758 8.867 21.236 9.766 30.103 2.007l309.221-270.569c27.429-24 27.792-64.127 0.89-88.507L360.992 192.192c-8.73-7.912-22.221-7.248-30.133 1.482-7.912 8.73-7.248 22.222 1.482 30.134l309.833 280.786z'
											fill=''></path>
									</g>
								</svg>
							</div>
							{projet[currentImage]?.image_url ? (
								<>
									{transitions((props, index) => (
										<animated.div style={props} className={styles.photo}>
											<Image
												onClick={toggleZoom}
												className={`${isZoomed ? styles.zoomClass : ''}  `}
												priority={true}
												src={`${projet[currentImage].image_url}`}
												width={projet[currentImage].width}
												height={projet[currentImage].height}
												alt='image projet'
											/>
										</animated.div>
									))}
								</>
							) : (
								<Image
									onClick={toggleZoom}
									className={`${isZoomed ? styles.zoomClass : ''} ${currentImage ? 'animate__animated animate__fadeIn' : ''} `}
									priority={true}
									src='/images/projet/defaut.jpg'
									width={1280}
									height={836}
									alt='image projet'
								/>
							)}
						</div>

						<div className={`${styles.description}  animate__animated animate__zoomIn`}>
							<div className={styles.date_creation}>
								<span> Crée le: </span>
								<span>{new Date(projet[currentImage]?.date_publication).toLocaleDateString('fr-FR')}</span>
							</div>
							<div className={styles.colonne}>
								<div className={styles.details}>
									<h1>{projet[currentImage]?.titre}</h1>
									<p>{projet[currentImage]?.description}</p>
								</div>
							</div>
							<div className={styles.action}>
								<div className={styles.like}>
									{projet[currentImage]?.nbLike + likes}

									<button className={styles.btn} onClick={updatelike}>
										like
										<svg className={styles.icon} viewBox='0 0 51.997 51.997'>
											<g>
												<path d='M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905 c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478 c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014 C52.216,18.553,51.97,16.611,51.911,16.242z'></path>
											</g>
										</svg>
									</button>
								</div>
								<div className={styles.site_web}>
									<a target='blank' href='https://github.com/Vezely'>
										<span>github</span>
										<svg className={styles.github} viewBox='0 0 20 20' fill='#000000'>
											<g>
												<g>
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
									</a>

									{projet[idProjet]?.lien && (
										<a href={projet[idProjet].lien} target='blank' className={styles.button}>
											<span className={styles.button_icon_wrapper}>
												<div>
													<svg viewBox='0 0 24 24'>
														<g id='SVGRepo_iconCarrier'>
															<path d='M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z'></path>
															<path d='M17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8C16.3284 8 17 8.67157 17 9.5Z'></path>
															<path d='M8.88875 13.5414C8.63822 13.0559 8.0431 12.8607 7.55301 13.1058C7.05903 13.3528 6.8588 13.9535 7.10579 14.4474C7.18825 14.6118 7.29326 14.7659 7.40334 14.9127C7.58615 15.1565 7.8621 15.4704 8.25052 15.7811C9.04005 16.4127 10.2573 17.0002 12.0002 17.0002C13.7431 17.0002 14.9604 16.4127 15.7499 15.7811C16.1383 15.4704 16.4143 15.1565 16.5971 14.9127C16.7076 14.7654 16.8081 14.6113 16.8941 14.4485C17.1387 13.961 16.9352 13.3497 16.4474 13.1058C15.9573 12.8607 15.3622 13.0559 15.1117 13.5414C15.0979 13.5663 14.9097 13.892 14.5005 14.2194C14.0401 14.5877 13.2573 15.0002 12.0002 15.0002C10.7431 15.0002 9.96038 14.5877 9.49991 14.2194C9.09071 13.892 8.90255 13.5663 8.88875 13.5414Z'></path>
															<path d='M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z'></path>
														</g>
													</svg>
												</div>
												<div>
													<svg viewBox='0 0 24 24'>
														<g id='SVGRepo_iconCarrier'>
															<path d='M8.88875 14.5414C8.63822 14.0559 8.0431 13.8607 7.55301 14.1058C7.05903 14.3528 6.8588 14.9535 7.10579 15.4474C7.18825 15.6118 7.29326 15.7659 7.40334 15.9127C7.58615 16.1565 7.8621 16.4704 8.25052 16.7811C9.04005 17.4127 10.2573 18.0002 12.0002 18.0002C13.7431 18.0002 14.9604 17.4127 15.7499 16.7811C16.1383 16.4704 16.4143 16.1565 16.5971 15.9127C16.7076 15.7654 16.8081 15.6113 16.8941 15.4485C17.1387 14.961 16.9352 14.3497 16.4474 14.1058C15.9573 13.8607 15.3622 14.0559 15.1117 14.5414C15.0979 14.5663 14.9097 14.892 14.5005 15.2194C14.0401 15.5877 13.2573 16.0002 12.0002 16.0002C10.7431 16.0002 9.96038 15.5877 9.49991 15.2194C9.09071 14.892 8.90255 14.5663 8.88875 14.5414Z'></path>
															<path d='M6.5 7C5 7 5 8.66667 5 8.66667C5 10 7.5 12 8 12C8.5 12 11 10 11 8.66667C11 8.66667 11 7 9.5 7C8 7 8 9 8 9C8 9 8 7 6.5 7Z'></path>
															<path d='M13 8.66667C13 8.66667 13 7 14.5 7C16 7 16 9 16 9C16 9 16 7 17.5 7C19 7 19 8.66667 19 8.66667C19 10 16.5 12 16 12C15.5 12 13 10 13 8.66667Z'></path>
															<path d='M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM12 20.9932C7.03321 20.9932 3.00683 16.9668 3.00683 12C3.00683 7.03321 7.03321 3.00683 12 3.00683C16.9668 3.00683 20.9932 7.03321 20.9932 12C20.9932 16.9668 16.9668 20.9932 12 20.9932Z'></path>
														</g>
													</svg>
												</div>

												{/* <div>😍 </div>
									<div>😀</div> */}
											</span>
											Visiter
										</a>
									)}
								</div>
							</div>
							<h2>Demo</h2>
							{videos.length > 0 ? (
								<>
									<div className={styles.video}>
										{videoVisible ? (
											<svg onClick={handleSvgClick} fill='currentColor' viewBox='0 0 24 24'>
												<path d='M6.234 20.625c-.287 0-.57-.076-.82-.219a1.843 1.843 0 0 1-.912-1.609V5.203c0-.673.35-1.29.912-1.609a1.647 1.647 0 0 1 1.677.021l11.618 6.954a1.686 1.686 0 0 1 0 2.86l-11.62 6.956a1.664 1.664 0 0 1-.855.24Z'></path>
											</svg>
										) : null}
										{videos.map((video) => (
											<video key={video.id_video} id='video-projet' poster={video.poster}>
												<source src={video.video_url} type='video/mp4' />
											</video>
										))}
									</div>
								</>
							) : (
								<div style={{ textAlign: 'center' }}>Le demo pour ce projet n&apos;est pas disponible pour le moment.</div>
							)}
						</div>
					</div>

					<div className={styles.technologie}>
						<h2>Technologies utilisées</h2>
						<div className={styles.technologieBoxConainer}>
							{technologies.map((technologie) => (
								<span className='animate__animated animate__fadeInDown' key={technologie.id_technologie}>
									{technologie.nom}
								</span>
							))}
						</div>
					</div>
					<Profils2 technologies={technologies} />
				</div>
			)}
		</>
	);
};

export default Projet;
