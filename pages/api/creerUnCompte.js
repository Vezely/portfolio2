import { addUser } from '../../queries';
export default async function handler(request, response) {
	if (request.method === 'POST') {
		const { nom, prenom, email, mot_de_passe, mot_de_passe_confirm } = request.body;
		if (mot_de_passe === mot_de_passe_confirm) {
			try {
				console.log(request.body);
				const user = await addUser(nom, prenom, email, mot_de_passe);
				response.status(200).json(user);
			} catch (error) {
				response.status(500).json({ error: "Une erreur est survenue lors de l'ajouter du projet." });
			}
		} else {
			response.status(400).json({ error: 'Les deux mot de passe doivent être identiques' });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
