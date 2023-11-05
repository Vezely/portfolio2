import { supprimerContenu } from '../../queries';
export default async function handler(request, response) {
	if (request.method === 'POST') {
		try {
			console.log(request.query);
			const contenu = await supprimerContenu(request.query.id_contenu);
			response.status(200).json(contenu);
		} catch (error) {
			response.status(500).json({ error: 'Une erreur est survenue lors de la suppression du contenu' });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
