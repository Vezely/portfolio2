// import commentaires from '../../components/commentaires.js';
import { getAllCommentaires } from '../../queries.js';
export default async function handler(request, response) {
	if (request.method === 'GET') {
		try {
			const commentaires = await getAllCommentaires();
			response.status(200).json(commentaires);
		} catch (error) {
			response.status(500).json({ error: 'Une erreur est survenue lors de la récupération de technologies.' });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
