import { getAllProjets } from '../../queries.js';
export default async function handler(request, response) {
	if (request.method === 'GET') {
		try {
			const projets = await getAllProjets();
			response.status(200).json(projets);
		} catch (error) {
			response.status(500).json({ error: 'Une erreur est survenue lors de la récupération des projets.' });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
