import mysql from 'mysql';

// Configurer les informations de connexion
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'gestion_ecole2023',
	database: 'portfolio',
});

// Fonction pour exécuter une requête à la base de données
export function executeQuery(query, params = []) {
	return new Promise((resolve, reject) => {
		connection.query(query, params, (error, results) => {
			if (error) {
				reject(error);
			} else {
				resolve(results);
			}
		});
	});
}
