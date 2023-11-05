import { updateLike } from '../../queries';
export default async function handler(request, response) {
	if (request.method === 'POST') {
		try {
			console.log(request.query.id_projet);
			const like = await updateLike(request.query.id_projet);
			response.status(200).json(like);
		} catch (error) {
			response.status(500).json({ error: 'Une erreur est survenue lors de la mise a jour du nombre de like' });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
