// import commentaires from '../../components/commentaires.js';
import { getVideo } from '../../queries.js';
export default async function handler(request, response) {
	if (request.method === 'GET') {
		try {
			const video = await getVideo(request.query.id_projet);
			response.status(200).json(video);
		} catch (error) {
			response.status(500).json({ error: 'Une erreur est survenue lors de la récupération des videos.' });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
