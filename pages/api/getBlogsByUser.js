import { getBlogsByUser } from '../../queries.js';
export default async function handler(request, response) {
	if (request.method === 'GET') {
		try {
			const id_utilisateur = request.query.id_utilisateur || '';
			const blogs = await getBlogsByUser(id_utilisateur);
			response.status(200).json(blogs);
		} catch (error) {
			response.status(500).json({ error: 'Une erreur est survenue lors de la récupération des blogs.' });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
