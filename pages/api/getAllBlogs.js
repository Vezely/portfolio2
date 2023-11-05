import { getAllBlogs } from '../../queries.js';
export default async function handler(request, response) {
	if (request.method === 'GET') {
		try {
			const blogs = await getAllBlogs();
			response.status(200).json(blogs);
		} catch (error) {
			response.status(500).json({ error: 'Une erreur est survenue lors de la récupération des blogs.' });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
