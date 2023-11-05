import { supprimerCommentaire } from '../../queries';
export default async function handler(request, response) {
	if (request.method === 'POST') {
		try {
			const commentaire = await supprimerCommentaire(request.query.id_commentaire);
			response.status(200).json(commentaire);
		} catch (error) {
			response.status(500).json({ error: 'Une erreur est survenue lors de la suppression du projet' });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
