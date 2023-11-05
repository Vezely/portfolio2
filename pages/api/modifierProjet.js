import { modifierProjet } from '../../queries';
export default async function handler(request, response) {
	if (request.method === 'POST') {
		try {
			const projet = await modifierProjet(
				request.body.titre,
				request.body.description,
				request.body.nbLike || 1,
				request.body.lien,
				request.query.id_projet,
			);
			response.status(200).json(projet);
		} catch (error) {
			response.status(500).json({ error: 'Une erreur est survenue lors de la mise a jour du nombre de like' });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
