import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Contenu.module.css';
import Image from 'next/image';
const Contenu = () => {
	const containerRef = useRef(null);
	const [isEndOfScroll, setIsEndOfScroll] = useState(false);
	const [isStartOfScroll, setIsStartOfScroll] = useState(false);

	const scrollLeft = () => {
		if (containerRef.current) {
			containerRef.current.scrollLeft -= 800;
			if (containerRef.current.scrollLeft === 0) {
				setIsStartOfScroll(true);
			} else {
				setIsStartOfScroll(false);
			}
			setIsEndOfScroll(false);
		}
	};

	const scrollRight = () => {
		if (containerRef.current) {
			containerRef.current.scrollLeft += 800;
			if (containerRef.current.scrollLeft >= containerRef.current.scrollWidth - containerRef.current.clientWidth) {
				setIsEndOfScroll(true);
			} else {
				setIsEndOfScroll(false);
			}
			setIsStartOfScroll(false);
		}
	};

	const [contenus, setContenus] = useState([]);
	useEffect(() => {
		async function fetchContenu() {
			let response = await fetch('/api/getAllContenu', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});
			const data = await response.json();
			setContenus(data);
		}
		fetchContenu();
	}, []);

	return (
		<div className={styles.container}>
			<h2>Contenus créer</h2>
			<div className={styles.contenu}>
				<div className={styles.directionContainer}>
					<svg
						viewBox='0 0 1024 1024'
						fill='#000000'
						onClick={scrollLeft}
						style={isStartOfScroll ? { opacity: '0.3', transform: 'none' } : null}>
						<g id='SVGRepo_bgCarrier'></g>
						<g id='SVGRepo_tracerCarrier'></g>
						<g>
							<path
								d='M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z'
								fill=''></path>
						</g>
					</svg>

					<svg viewBox='0 0 1024 1024' fill='#000000' onClick={scrollRight} style={isEndOfScroll ? { opacity: '0.3', transform: 'none' } : null}>
						<g id='SVGRepo_bgCarrier'></g>
						<g id='SVGRepo_tracerCarrier'></g>
						<g>
							<path
								d='M642.174 504.594c7.99 7.241 7.897 17.58-0.334 24.782L332.62 799.945c-8.867 7.759-9.766 21.236-2.007 30.103 7.758 8.867 21.236 9.766 30.103 2.007l309.221-270.569c27.429-24 27.792-64.127 0.89-88.507L360.992 192.192c-8.73-7.912-22.221-7.248-30.133 1.482-7.912 8.73-7.248 22.222 1.482 30.134l309.833 280.786z'
								fill=''></path>
						</g>
					</svg>
				</div>
				<div ref={containerRef} className={`${styles.contenaireBox} ${styles.scrollTransition}`}>
					{Array.isArray(contenus) && (
						<>
							{contenus.map((contenu) => (
								<a href={contenu.lien} target='blank' className={styles.box} key={contenu.id_contenu}>
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
				</div>
			</div>
		</div>
	);
};

export default Contenu;
