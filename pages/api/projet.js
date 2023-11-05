import { getProjetById } from '../../queries.js';
export default async function handler(request, response) {
	if (request.method === 'GET') {
		try {
			const id_projet = request.query.id_projet || '';
			const projet = await getProjetById(id_projet);
			response.status(200).json(projet);
		} catch (error) {
			response.status(500).json({ error: 'Une erreur est survenue lors de la récupération du projet.' });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
