import { getUsers } from '../../queries.js';
export default async function handler(request, response) {
	if (request.method === 'GET') {
		try {
			const users = await getUsers();
			response.status(200).json(users);
		} catch (error) {
			response.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
		}
	} else {
		response.status(405).json({ error: 'Méthode non autorisée.' });
	}
}
