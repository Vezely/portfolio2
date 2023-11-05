import { modifierBlog } from '../../queries';
export default async function handler(request, response) {
	if (request.method === 'POST') {
		try {
			const projet = await modifierBlog(
				request.body.titre,
				request.body.contenu,
				// request.body.nbLike_blog || 1,
				request.body.lien,
				request.query.id_blog,
			);
			response.status(200).json(projet);
		} catch (error) {
			response.status(500).json({ error: 'Une erreur est survenue lors de la mise a jour du nombre de like' });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
