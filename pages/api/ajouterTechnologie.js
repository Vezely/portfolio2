import { addTechnologie } from '../../queries';
export default async function handler(request, response) {
	if (request.method === 'POST') {
		// const nom_commune = request.query.nom_commune || '';
		try {
			console.log(request.body);
			const technologie = await addTechnologie(request.body.nom, request.body.id_projet);
			response.status(200).json(technologie);
		} catch (error) {
			response.status(500).json({ error: "Une erreur est survenue lors de l'ajouter de la technologie." });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
