import { supprimerProjet } from '../../queries';
export default async function handler(request, response) {
	if (request.method === 'POST') {
		try {
			console.log(request.query.id_projet);
			const projet = await supprimerProjet(request.query.id_projet);
			response.status(200).json(projet);
		} catch (error) {
			response.status(500).json({ error: 'Une erreur est survenue lors de la suppression du projet' });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
