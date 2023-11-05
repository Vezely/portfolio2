import React, { useEffect, useState } from 'react';
import styles from '../styles/Admin.module.css';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Users = () => {
	const router = useRouter();
	const [sessionExpirer, setSessionExpirer] = useState(false);
	const [succes, setSucces] = useState(false);
	const toggleSucces = () => {
		setSucces(!succes);
	};
	const [user, setUser] = useState(null);
	const token = Cookies.get('jwtToken');

	const checkAuthorization = () => {
		const timestamp = Cookies.get('timestamp');
		if (timestamp) {
			const currentTime = new Date().getTime();
			const loginTime = new Date(timestamp).getTime();
			const minutesPassed = (currentTime - loginTime) / (1000 * 60); // minutes

			if (minutesPassed > 10) {
				// Plus de 30 minutes d'inactivité, déconnecter
				Cookies.remove('jwtToken');
				setUser(null);
				setSessionExpirer(true);
				console.log("connexion expirée après 10 minutes d'inactivité");
				return false;
			} else {
				// Le token est valide et n'a pas expiré
				return true;
			}
		} else {
			// L'horodatage n'est pas présent, déconnecter
			setUser(null);
			setSessionExpirer(true);
			return false;
		}
	};
	useEffect(() => {
		// Vérifier l'autorisation lors du chargement de la page
		if (checkAuthorization()) {
			Cookies.set('timestamp', new Date().toString());
			const decoded = jwt.decode(token);
			setUser(decoded);
		}
	}, [token]);

	const [users, setUsers] = useState([]);

	useEffect(() => {
		async function fetchUsers() {
			let response = await fetch(`/api/getUsers`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});
			const data = await response.json();
			if (response.ok) {
				setUsers(data);
			}
		}
		fetchUsers();
	}, []);

	const supprimerUser = async (id) => {
		let response = await fetch(`/api/supprimerUser?id_utilisateur=${id}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		});
		// const data = await response.json();
		if (response.ok) {
			toggleSucces();
			setSupprimerIndex(null);
			// window.location.reload();
		}
	};
	const [supprimerIndex, setSupprimerIndex] = useState(null);

	return (
		<>
			{succes && (
				<div className={`${styles.maske} animate__animated animate__fadeIn`}>
					<div className={styles.popup}>
						<div className={styles.titre}>Opération effectuer avec succès</div>
						<svg
							width='46'
							height='46'
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='1.5'
							viewBox='0 0 24 24'>
							<path d='m21.75 6-10.5 12-4.5-4.5'></path>
							<path d='m6.75 18-4.5-4.5'></path>
							<path d='m17.25 6-6.375 7.313'></path>
						</svg>
						<div
							onClick={() => {
								toggleSucces();
								window.location.reload();
							}}
							className={styles.button}>
							OK
						</div>
					</div>
				</div>
			)}
			{sessionExpirer ? (
				<div className={styles.maske}>
					<div className={styles.popup}>
						<div className={styles.titre}>Votre session a expirer. Veillez-vous reconnecter </div>
						<svg
							width='46'
							height='46'
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							strokeWidth='1.5'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'>
							<path d='m18.75 6.938-.99-1.152A8.973 8.973 0 0 0 11.25 3c-4.969 0-9 4.031-9 9s4.031 9 9 9a9.004 9.004 0 0 0 8.488-6'></path>
							<path
								fill='currentColor'
								stroke='none'
								d='M21.75 4.565v5.183a.75.75 0 0 1-.75.75h-5.184a.75.75 0 0 1-.53-1.28l5.184-5.184a.75.75 0 0 1 1.28.53Z'></path>
						</svg>
						<div
							onClick={() => {
								router.push('/connexion');
							}}
							className={styles.button}>
							OK
						</div>
					</div>
				</div>
			) : (
				<div className={styles.contenu}>
					<div className={styles.contenuP}>
						<div className={`${styles.projet} animate__animated animate__fadeIn`}>
							<h2>Mes utilisateurs</h2>

							<div className={styles.containerBox}>
								<div className={styles.titre}>
									<div style={{ marginLeft: '0' }}>Nom & Prénom</div>
									<div style={{ marginLeft: '0' }}>Email</div>
									<div style={{ marginLeft: '0' }} className={styles.hiddenOnSmallScreen}>
										Password
									</div>

									<div style={{ marginLeft: '0' }} className={styles.hiddenOnSmallScreen}>
										Id
									</div>
									<div style={{ marginLeft: '0' }} className={styles.hiddenOnSmallScreen}>
										Blogs
									</div>
									<div style={{ marginLeft: '0' }}>Action</div>
								</div>
								{users.map((user, index) => (
									<div className={styles.projetBox} key={user.id_utilisateur}>
										<div>
											{user.nom_utilisateur} {user.prenom_utilisateur}
										</div>
										<div>{user.email}</div>
										<div>{user.mot_de_passe}</div>
										<div className={styles.hiddenOnSmallScreen}>{user.id_utilisateur}</div>
										<div className={styles.hiddenOnSmallScreen}>{user.nombre_de_blogs}</div>
										<button
											onClick={() => {
												setSupprimerIndex(user.id_utilisateur);
												// handleSup(user.id_utilisateur);
											}}>
											Supprimer
										</button>
										{supprimerIndex === user.id_utilisateur && (
											<span className={`${styles.supprimer} animate__animated animate__headShake`}>
												<div>
													<p>Voulez-vous vraiment supprimer?</p>
													<span>
														<div onClick={() => supprimerUser(user.id_utilisateur)}>Oui</div>
														<div onClick={() => setSupprimerIndex(null)}>Non</div>
													</span>
												</div>
											</span>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Users;
