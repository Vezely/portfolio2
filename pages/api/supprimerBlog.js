import { supprimerBlog } from '../../queries';
export default async function handler(request, response) {
	if (request.method === 'POST') {
		try {
			const blog = await supprimerBlog(request.query.id_blog);
			response.status(200).json(blog);
		} catch (error) {
			response.status(500).json({ error: 'Une erreur est survenue lors de la suppression du projet' });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
