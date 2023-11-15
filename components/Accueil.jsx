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
import { useState, useEffect, useRef } from 'react';
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
	const [index, setIndex] = useState(0);
	const refs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
	const tabComposents = ['Compétances', 'A propos de', 'Projets', 'Contenus', 'Blogs', 'Commentaires', 'Services', 'Compétances'];

	const scrollToRef = (ref) => {
		ref.current.scrollIntoView({ behavior: 'smooth' });
	};

	const handleSwitch = (x) => {
		if (x < refs.length) {
			scrollToRef(refs[x]);
			setIndex(index + 1);
		} else {
			scrollToRef(refs[0]);
			setIndex(1);
		}
	};
	const [toggle, setToggle] = useState(true);
	const toogleSwich = () => {
		setToggle(!toggle);
	};
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
					<div className={styles.swicheContainer}>
						<span onClick={toogleSwich}>
							{toggle ? (
								<svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path d='m8.625 5.25 6.75 6.75-6.75 6.75'></path>
								</svg>
							) : (
								<svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path d='M15.375 5.25 8.625 12l6.75 6.75'></path>
								</svg>
							)}
						</span>
						{toggle && (
							<span onClick={() => handleSwitch(index)}>
								{tabComposents[index] != 'Compétances' ? (
									<svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path d='m5.25 8.625 6.75 6.75 6.75-6.75'></path>
									</svg>
								) : (
									<svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path d='M5.25 15.375 12 8.625l6.75 6.75'></path>
									</svg>
								)}

								<span>{tabComposents[index]}</span>
							</span>
						)}
					</div>
					<div ref={refs[0]}>
						<Competances />
					</div>

					<div ref={refs[1]}>
						<Appros />
					</div>

					<div ref={refs[2]}>
						<ProjetsRecents />
					</div>
					<div ref={refs[3]}>
						<Contenu />
					</div>
					<div className={styles.contenuBlog} ref={refs[4]}>
						<Blogs />
					</div>
					<div ref={refs[5]}>
						<Commentaire />
					</div>
					<div ref={refs[6]}>
						<Contact />
					</div>
					<div ref={refs[7]}>
						<Service />
					</div>
				</div>
			)}
		</>
	);
}
