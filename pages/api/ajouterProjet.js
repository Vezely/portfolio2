import { addProjet } from '../../queries';
export default async function handler(request, response) {
	if (request.method === 'POST') {
		// const nom_commune = request.query.nom_commune || '';
		try {
			console.log(request.body);
			const projet = await addProjet(request.body.titre, request.body.description, request.body.lien || '');
			response.status(200).json(projet);
		} catch (error) {
			response.status(500).json({ error: "Une erreur est survenue lors de l'ajouter du projet." });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
