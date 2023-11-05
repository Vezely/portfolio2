import { getBlogById } from '../../queries.js';
export default async function handler(request, response) {
	if (request.method === 'GET') {
		try {
			const id_blog = request.query.id_blog || '';
			const blog = await getBlogById(id_blog);
			response.status(200).json(blog);
		} catch (error) {
			response.status(500).json({ error: 'Une erreur est survenue lors de la récupération du blog.' });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
