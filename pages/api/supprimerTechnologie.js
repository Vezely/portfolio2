import { supprimerTechnologie } from '../../queries';
export default async function handler(request, response) {
	if (request.method === 'POST') {
		try {
			console.log(request.body);
			const technologie = await supprimerTechnologie(request.body.id_projet, request.body.id_technologie);
			response.status(200).json(technologie);
		} catch (error) {
			response.status(500).json({ error: 'Une erreur est survenue lors de la suppression du projet' });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
