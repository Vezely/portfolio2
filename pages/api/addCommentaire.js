import { addCommentaire } from '../../queries';
export default async function handler(request, response) {
	if (request.method === 'POST') {
		// const nom_commune = request.query.nom_commune || '';
		try {
			const commentaire = await addCommentaire(request.body.nom_commentateur, request.body.commentaire);
			response.status(200).json(commentaire);
		} catch (error) {
			response.status(500).json({ error: "Une erreur est survenue lors de l'ajouter du commentaire." });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
