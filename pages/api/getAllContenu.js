import { getAllContenu } from '../../queries.js';
export default async function handler(request, response) {
	if (request.method === 'GET') {
		try {
			const contenus = await getAllContenu();
			response.status(200).json(contenus);
		} catch (error) {
			response.status(500).json({ error: 'Une erreur est survenue lors de la récupération des contenus.' });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
