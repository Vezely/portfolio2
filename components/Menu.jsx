import Link from 'next/link';
import styles from '../styles/Menu.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import tabMenu from './tabMenu';
export default function Menu({}) {
	const router = useRouter();
	const [select, setSelect] = useState('Tableau de bord');
	const getActiveClass = (path) => {
		setSelect(path);
	};

	const [openedCategory, setOpenedCategory] = useState(null);
	const toggleCategory = (categoryName) => {
		if (openedCategory === categoryName) {
			setOpenedCategory(null);
		} else {
			setOpenedCategory(categoryName);
			getActiveClass(categoryName);
		}
	};

	const [sousCategorie, setSousCategorie] = useState(false);
	const sousCategorieActive = () => {
		setSousCategorie(true);
	};
	const sousCategorieDesactive = () => {
		setSousCategorie(false);
	};
	const [rotatedCategory, setRotatedCategory] = useState(null);
	return (
		<nav className={`${styles.nav} `}>
			<ul className={`${styles.ul} `} onMouseOver={sousCategorieActive} onMouseLeave={sousCategorieDesactive}>
				{tabMenu.map((categorie, index) => (
					<div key={index}>
						<Link
							href={`/${categorie.href ? categorie.href : '#'}`}
							className={`${styles.li} ${select === `${categorie.texte}` ? styles.active : ''}`}
							onClick={() => {
								toggleCategory(categorie.texte);
								setRotatedCategory(categorie.texte === rotatedCategory ? null : categorie.texte);
							}}>
							<li>
								<div dangerouslySetInnerHTML={{ __html: `${categorie.icon}` }} />
								<span className={styles.infoText}>
									<div>{categorie.texte}</div>
									{categorie.sousCategorie && (
										<svg viewBox='0 0 24 24' className={rotatedCategory === categorie.texte ? styles.rotateIcon : ''}>
											<g id='SVGRepo_iconCarrier'>
												<path d='M4.43057 8.51192C4.70014 8.19743 5.17361 8.161 5.48811 8.43057L12 14.0122L18.5119 8.43057C18.8264 8.16101 19.2999 8.19743 19.5695 8.51192C19.839 8.82642 19.8026 9.29989 19.4881 9.56946L12.4881 15.5695C12.2072 15.8102 11.7928 15.8102 11.5119 15.5695L4.51192 9.56946C4.19743 9.29989 4.161 8.82641 4.43057 8.51192Z'></path>
											</g>
										</svg>
									)}
								</span>
							</li>
						</Link>
						{categorie.sousCategorie && (
							<div
								className={styles.sousCategorie}
								style={{ display: openedCategory === `${categorie.texte}` && sousCategorie ? 'block' : 'none' }}>
								<ul>
									{categorie.sousCategorie?.map((item, index2) => (
										<Link href={`/${categorie.slog}/${item.replace(/\s+/g, '-')}`} key={index2}>
											<li>{item}</li>
										</Link>
									))}
								</ul>
							</div>
						)}
					</div>
				))}
			</ul>
		</nav>
	);
}
