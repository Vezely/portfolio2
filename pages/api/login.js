// pages/api/login.js
import jwt from 'jsonwebtoken';
import { getAllUsers } from '../../queries';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		// Dans un scénario réel, vous vérifieriez les informations d'identification de l'utilisateur ici.
		// Si les informations d'identification sont valides, générez un token JWT.
		const users = await getAllUsers();
		try {
			const emailRecherche = req.body.email;
			const motDePasseRecherche = req.body.mot_de_passe;

			const utilisateurTrouve = users.find((utilisateur) => {
				return utilisateur.email === emailRecherche && utilisateur.mot_de_passe === motDePasseRecherche;
			});

			if (utilisateurTrouve) {
				const token = jwt.sign(
					{
						email: utilisateurTrouve.email,
						nom: utilisateurTrouve.nom,
						prenom: utilisateurTrouve.prenom,
						id_utilisateur: utilisateurTrouve.id_utilisateur,
					},
					process.env.SECRET_KEY_JWT,
				);
				let estAutorise = false;
				if (utilisateurTrouve.email == process.env.VG) {
					estAutorise = true;
				}

				res.status(200).json({ token, estAutorise });
			} else {
				console.log('Aucun utilisateur trouvé.');
				res.status(400).json({ error: 'Aucun utilisateur trouvé.' });
			}
		} catch (error) {
			console.error('Erreur lors de la création du token :', error);
			res.status(500).json({ error: 'Erreur lors de la création du token.' });
		}
	} else {
		res.status(405).end(); // Méthode non autorisée
	}
}
