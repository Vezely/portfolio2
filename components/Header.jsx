import styles from '../styles/Header.module.css';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

export default function Header() {
	const router = useRouter();
	const [user, setUser] = useState(null);
	const token = Cookies.get('jwtToken');
	const [isblog, setIsblog] = useState(false);
	const [menuVisible, setMenuVisible] = useState(false);

	const [scrollPercentage, setScrollPercentage] = useState(0);

	// Fonction pour mettre à jour la barre de progression
	const updateProgressBar = () => {
		const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		const scrolled = (window.scrollY / scrollHeight) * 100;
		setScrollPercentage(scrolled);
	};

	useEffect(() => {
		if (
			router.pathname == '/blogs' ||
			router.pathname == '/connexion' ||
			router.pathname == '/admin/vg73' ||
			router.pathname == '/blogs/publier' ||
			router.pathname == '/admin/vg73' ||
			router.pathname == '/creer-un-compte'
		) {
			setIsblog(true);
		} else {
			setIsblog(false);
		}
	}, [router.pathname]);

	useEffect(() => {
		window.addEventListener('scroll', updateProgressBar);
		return () => {
			window.removeEventListener('scroll', updateProgressBar);
		};
	}, []);

	const [isScrolling, setIsScrolling] = useState(true);

	useEffect(() => {
		let lastScrollTop = 0;
		const handleScroll = () => {
			const st = window.pageYOffset || document.documentElement.scrollTop;

			if (st <= 90) {
				// Faites défiler vers le bas, définissez isScrolling sur false
				setIsScrolling(true);
			} else if (st > lastScrollTop) {
				// Faites défiler vers le bas, définissez isScrolling sur false
				setIsScrolling(false);
			} else {
				// Faites défiler vers le haut, définissez isScrolling sur true
				setIsScrolling(true);
			}

			lastScrollTop = st;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			// Désabonnez-vous de l'événement de défilement lorsque le composant est démonté
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	const toggleMenu = () => {
		setMenuVisible(!menuVisible);
	};
	const toggleMenuDesable = () => {
		setMenuVisible(false);
	};

	const checkAuthorization = () => {
		const token = Cookies.get('jwtToken');
		if (token) {
			Cookies.remove('jwtToken');
			Cookies.remove('timestamp');

			router.push('/connexion');
		}
	};
	useEffect(() => {
		if (token) {
			Cookies.set('timestamp', new Date().toString());
			const decoded = jwt.decode(token);
			setUser(decoded);
		}
	}, [token]);

	return (
		<header className={styles.header1}>
			<div className={styles.container}>
				<div className={styles.progressContainer}>
					<div className={styles.progressBar} style={{ width: `${scrollPercentage}%` }}></div>
				</div>

				<div className={`${styles.containerTop} ${isScrolling ? styles.active : ''} animate__animated animate__slideInDown`}>
					<div className={styles.contenu}>
						<div onClick={toggleMenuDesable} className={styles.logo}>
							<Link href='/'>vezely</Link>
						</div>
						<div className={styles.menu}>
							<svg className={`${styles.toggle} ${menuVisible ? styles.active : ''}`} onClick={toggleMenu} viewBox='0 0 24 24'>
								<g id='SVGRepo_bgCarrier'></g>
								<g id='SVGRepo_tracerCarrier'></g>
								<g id='SVGRepo_iconCarrier'>
									<path d='M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z'></path>
								</g>
							</svg>
							<span onClick={toggleMenu} className={menuVisible ? styles.maske : ''}></span>
							{isblog ? (
								<ul className={`${menuVisible ? styles.active : ''} animate__animated animate__fadeIn`}>
									<li onClick={toggleMenuDesable} className={`${styles.li} animate__animated animate__fadeInDown`}>
										<Link href='/blogs'>Blogs</Link>
									</li>
									<li onClick={toggleMenuDesable} className={`${styles.li} animate__animated animate__fadeInDown`}>
										<Link href='/blogs/publier'> Publier</Link>
									</li>
									<li onClick={toggleMenuDesable} className={`${styles.li} animate__animated animate__fadeInDown`}>
										<Link href='/connexion'>Connexion</Link>
									</li>
									<li className={`${styles.li} ${styles.profilHover} animate__animated animate__fadeInDown`}>
										<svg viewBox='0 0 24 24'>
											<g id='SVGRepo_iconCarrier'>
												<path d='M8.25 9C8.25 6.92893 9.92893 5.25 12 5.25C14.0711 5.25 15.75 6.92893 15.75 9C15.75 11.0711 14.0711 12.75 12 12.75C9.92893 12.75 8.25 11.0711 8.25 9ZM12 6.75C10.7574 6.75 9.75 7.75736 9.75 9C9.75 10.2426 10.7574 11.25 12 11.25C13.2426 11.25 14.25 10.2426 14.25 9C14.25 7.75736 13.2426 6.75 12 6.75Z'></path>
												<path d='M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 14.5456 3.77827 16.851 5.4421 18.5235C5.6225 17.5504 5.97694 16.6329 6.68837 15.8951C7.75252 14.7915 9.45416 14.25 12 14.25C14.5457 14.25 16.2474 14.7915 17.3115 15.8951C18.023 16.6329 18.3774 17.5505 18.5578 18.5236C20.2217 16.8511 21.25 14.5456 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM17.1937 19.6554C17.0918 18.4435 16.8286 17.5553 16.2318 16.9363C15.5823 16.2628 14.3789 15.75 12 15.75C9.62099 15.75 8.41761 16.2628 7.76815 16.9363C7.17127 17.5553 6.90811 18.4434 6.80622 19.6553C8.28684 20.6618 10.0747 21.25 12 21.25C13.9252 21.25 15.7131 20.6618 17.1937 19.6554Z'></path>
											</g>
										</svg>
									</li>
									<li onClick={toggleMenuDesable} className={styles.profil}>
										{user?.prenom && (
											<div className='animate__animated animate__fadeIn'>
												<span></span>
												{user.prenom}
											</div>
										)}

										<Link onClick={toggleMenuDesable} href='/creer-un-compte' className='animate__animated animate__fadeIn'>
											Créer un compte
										</Link>
										<div onClick={checkAuthorization} className='animate__animated animate__fadeIn'>
											<svg
												width='46'
												fill='none'
												stroke='currentColor'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='1.5'
												viewBox='0 0 24 24'
												xmlns='http://www.w3.org/2000/svg'>
												<path d='M14.25 15.75v1.875a1.875 1.875 0 0 1-1.875 1.875h-7.5A1.875 1.875 0 0 1 3 17.625V6.375A1.875 1.875 0 0 1 4.875 4.5H12c1.036 0 2.25.84 2.25 1.875V8.25'></path>
												<path d='M17.25 15.75 21 12l-3.75-3.75'></path>
												<path d='M8.25 12h12'></path>
											</svg>
											Déconnection
										</div>
									</li>
								</ul>
							) : (
								<ul className={`${menuVisible ? styles.active : ''} animate__animated animate__fadeIn`}>
									<li onClick={toggleMenuDesable} className={`${styles.li} animate__animated animate__fadeInDown`}>
										<Link href='/#projets-recents'>Mes travaux Récents</Link>
									</li>
									<li onClick={toggleMenuDesable} className={`${styles.li} animate__animated animate__fadeInDown`}>
										<Link href='https://api.whatsapp.com/send?1=pt_BR&phone=623706986'>Contact</Link>
									</li>
									<li onClick={toggleMenuDesable} className={`${styles.li} animate__animated animate__fadeInDown`}>
										<Link href='/blogs'>Blogs</Link>
									</li>
									{/* <div onClick={toggleMenuDesable} className={`${styles.li} animate__animated animate__fadeInDown`}>
										Langue
									</div> */}
								</ul>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
