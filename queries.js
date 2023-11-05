import { executeQuery } from './db.js';

const getAllProjets = async () => {
	let query = `
	SELECT p.*, 
       i1.image_url AS image_url1, i1.width AS width1, i1.height AS height1,
       i2.image_url AS image_url2, i2.width AS width2, i2.height AS height2
FROM projet p
LEFT JOIN (
    SELECT id_projet, image_url, width, height, ROW_NUMBER() OVER (PARTITION BY id_projet ORDER BY id_image) AS row_num
    FROM image
) AS i1 ON p.id_projet = i1.id_projet AND i1.row_num = 1
LEFT JOIN (
    SELECT id_projet, image_url, width, height, ROW_NUMBER() OVER (PARTITION BY id_projet ORDER BY id_image) AS row_num
    FROM image
) AS i2 ON p.id_projet = i2.id_projet AND i2.row_num = 2;

    `;

	try {
		const results = await executeQuery(query);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête :", error);
		throw error;
		return [];
	}
};
const getProjetById = async (id_projet) => {
	let query = `
	SELECT projet.*, image.*
	FROM projet
	LEFT JOIN image ON projet.id_projet = image.id_projet
	WHERE projet.id_projet = ?;
	
    `;
	try {
		const results = await executeQuery(query, id_projet);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête :", error);
		throw error;
		return [];
	}
};

const getAllTechnologieByProjet = async (id_projet) => {
	const query = `
	SELECT * FROM technologie 
	WHERE id_projet = ?;
    `;
	try {
		const results = await executeQuery(query, [id_projet]);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête :", error);
		throw error;
		return [];
	}
};

const getAllEtablissementsParCommune = async (nom_commune) => {
	const query = `
    SELECT c.nom_commune, e.nom_etablissement, e.id_etablissement, e.adresse, COUNT(el.id_eleve) AS nombre_eleves, t.nom_type
        FROM commune c
        JOIN etablissement e ON e.id_commune = c.id_commune
        LEFT JOIN eleve el ON el.id_etablissement = e.id_etablissement
        LEFT JOIN type_etablissement t ON t.id_type = e.id_type
        WHERE c.nom_commune = ?
        GROUP BY c.nom_commune, e.nom_etablissement, e.id_etablissement, e.adresse, t.nom_type; 
    `;
	try {
		const results = await executeQuery(query, [nom_commune]);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête :", error);
		throw error;
		return [];
	}
};

const getVideo = async (id_video) => {
	let query = `
		SELECT * FROM video WHERE id_projet = ?;
    `;
	try {
		const results = await executeQuery(query, id_video);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête :", error);
		throw error;
		return [];
	}
};
const getAllCommentaires = async () => {
	const query = `
		SELECT * FROM commentaire;
    `;
	try {
		const results = await executeQuery(query);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête :", error);
		throw error;
		return [];
	}
};
const getAllBlogs = async () => {
	const query = `
		SELECT b.id_blog ,b.titre, b.contenu, b.date_publication, b.nbLike_blog, b.id_utilisateur, b.image_url, b.width, b.height, b.lien, u.nom, u.prenom FROM blog b
			JOIN utilisateur u ON u.id_utilisateur=b.id_utilisateur;
    `;
	try {
		const results = await executeQuery(query);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête :", error);
		throw error;
		return [];
	}
};
const getAllContenu = async () => {
	const query = `
		SELECT * FROM portfolio.contenu;
    `;
	try {
		const results = await executeQuery(query);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête :", error);
		throw error;
		return [];
	}
};
const getUsers = async () => {
	const query = `
	SELECT
    u.id_utilisateur AS id_utilisateur,
    u.nom AS nom_utilisateur,
    u.prenom AS prenom_utilisateur,
	u.email,
	u.mot_de_passe,
    COUNT(b.id_blog) AS nombre_de_blogs
		FROM
			utilisateur AS u
		LEFT JOIN
			blog AS b ON u.id_utilisateur = b.id_utilisateur
		GROUP BY
			u.id_utilisateur, u.nom, u.prenom, u.email, u.mot_de_passe
		ORDER BY
			u.id_utilisateur;
    `;
	try {
		const results = await executeQuery(query);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête :", error);
		throw error;
		return [];
	}
};

const getElevesParClasse = async (nom_etablissement, nom_classe) => {
	const query = `
    SELECT el.nom, el.prenom, el.date_naissance, el.lieu_naissance, el.sexe, el.telephone, c.nom AS nom_classe, c.niveau, el.id_eleve
        FROM eleve el
        JOIN classe c ON el.id_classe = c.id_classe
        JOIN etablissement et ON el.id_etablissement = et.id_etablissement
        WHERE et.nom_etablissement = ?
        AND c.nom = ?;
    `;
	try {
		const results = await executeQuery(query, [nom_etablissement, nom_classe]);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête :", error);
		throw error;
		return [];
	}
};
const getTechnologieByProjet = async (id_projet) => {
	const query = `
    	SELECT * FROM technologie 
			WHERE id_projet = ?;
    `;
	try {
		const results = await executeQuery(query, [id_projet]);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête :", error);
		throw error;
		return [];
	}
};
const getBlogsByUser = async (id_utilisateur) => {
	const query = `
    	SELECT * FROM blog 
			WHERE id_utilisateur = ?;
    `;
	try {
		const results = await executeQuery(query, [id_utilisateur]);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête :", error);
		throw error;
		return [];
	}
};
const getBlogById = async (id_blog) => {
	const query = `
    	SELECT * FROM blog 
			WHERE id_blog = ?;
    `;
	try {
		const results = await executeQuery(query, [id_blog]);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête :", error);
		throw error;
		return [];
	}
};
const getAllUsers = async () => {
	const query = `
		SELECT * FROM utilisateur;
    `;
	try {
		const results = await executeQuery(query);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête :", error);
		throw error;
		return [];
	}
};

const addCommentaire = async (nom_commentateur, commentaire) => {
	try {
		const query = `
        INSERT INTO commentaire (nom_commentateur, commentaire)
        VALUES (?, ?)`;
		const values = [nom_commentateur, commentaire];
		const result = await executeQuery(query, values);
		const id_commentaire = result.insertId;
		return {
			id_commentaire: id_commentaire,
			nom_commentateur,
			commentaire,
		};
	} catch (error) {
		throw error;
		return [];
	}
};
const addProjet = async (titre, description, lien) => {
	try {
		const query = `
        INSERT INTO projet (titre, description, lien)
        VALUES (?, ?, ?);`;
		const values = [titre, description, lien];
		const result = await executeQuery(query, values);
		const id_projet = result.insertId;
		return {
			id: id_projet,
			titre,
			description,
			lien,
		};
	} catch (error) {
		throw error;
	}
};
const addUser = async (nom, prenom, email, mot_de_passe) => {
	try {
		const query = `
        INSERT INTO utilisateur (nom, prenom, email, mot_de_passe)
        VALUES (?, ?, ?, ?);`;
		const values = [nom, prenom, email, mot_de_passe];
		const result = await executeQuery(query, values);
		const id_utilisateur = result.insertId;
		return {
			id_utilisateur: id_utilisateur,
		};
	} catch (error) {
		throw error;
	}
};
const addImage = async (image_url, width, height, id_projet) => {
	try {
		const query = `
        INSERT INTO image (image_url, width, height, id_projet) 
		VALUES (?, ?, ?, ?);`;
		const values = [image_url, width, height, id_projet];
		const result = await executeQuery(query, values);
		const id_image = result.insertId;
		return {
			id: id_image,
			image_url,
			width,
			height,
			id_projet,
		};
	} catch (error) {
		throw error;
	}
};
const updateImageBlog = async (image_url, width, height, id_blog) => {
	try {
		const query = `
		UPDATE blog
        SET 
		image_url = ?,
		width = ?,
		height = ?
		WHERE id_blog = ?`;
		const values = [image_url, width, height, id_blog];
		const result = await executeQuery(query, values);
		const id = result.insertId;
		return {
			id_blog: id,
		};
	} catch (error) {
		throw error;
	}
};
const ajouterContenu = async (titre, image_url, width, height, lien) => {
	try {
		const query = `
		INSERT INTO contenu (titre, image_url, width, height, lien) 
		VALUES (?, ?, ?, ?, ?);`;
		const values = [titre, image_url, width, height, lien];
		const result = await executeQuery(query, values);
		const id = result.insertId;
		return {
			id_blog: id,
		};
	} catch (error) {
		throw error;
	}
};
const addBlog = async (titre, contenu, id_utilisateur, image_url, width, height, lien) => {
	try {
		const query = `
        INSERT INTO blog (titre, contenu, id_utilisateur, image_url, width, height, lien) 
		VALUES (?, ?, ?, ?, ?,  ?, ?);`;
		const values = [titre, contenu, id_utilisateur, image_url, width, height, lien];
		const result = await executeQuery(query, values);
		const id_blog = result.insertId;
		return {
			id_blog: id_blog,
		};
	} catch (error) {
		throw error;
	}
};
const addTechnologie = async (nom, id_projet) => {
	try {
		const query = `
        INSERT INTO technologie (nom, id_projet)
		VALUES (?, ?);`;
		const values = [nom, id_projet];
		const result = await executeQuery(query, values);
		const id_technologie = result.insertId;
		return {
			id: id_technologie,
			nom,
			id_projet,
		};
	} catch (error) {
		throw error;
	}
};
const updateLike = async (id_projet) => {
	const query = `
        UPDATE projet
        SET 
		nbLike = nbLike + 1
        WHERE id_projet = ?;
    `;
	const params = [id_projet];
	try {
		const results = await executeQuery(query, params);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête de mise à jour du nombre de like :", error);
		throw error;
	}
};
const updateLikeBlog = async (id_blog) => {
	const query = `
        UPDATE blog
        SET 
		nbLike_blog = nbLike_blog + 1
        WHERE id_blog = ?;
    `;
	const params = [id_blog];
	try {
		const results = await executeQuery(query, params);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête de mise à jour du nombre de like :", error);
		throw error;
	}
};
const supprimerProjet = async (id_projet) => {
	const query = `
		DELETE FROM projet WHERE id_projet = ?;
    `;
	const params = [id_projet];
	try {
		const results = await executeQuery(query, params);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête de suppression du projet :", error);
		throw error;
	}
};
const supprimerContenu = async (id_contenu) => {
	const query = `
		DELETE FROM contenu WHERE id_contenu = ?;
    `;
	const params = [id_contenu];
	try {
		const results = await executeQuery(query, params);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête de suppression du projet :", error);
		throw error;
	}
};
const supprimerUser = async (id_utilisateur) => {
	const query = `
		DELETE FROM utilisateur WHERE id_utilisateur = ?;
    `;
	const params = [id_utilisateur];
	try {
		const results = await executeQuery(query, params);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête de suppression de l'utilisateur :", error);
		throw error;
	}
};
const supprimerBlog = async (id_blog) => {
	const query = `
		DELETE FROM blog WHERE id_blog = ?;
    `;
	const params = [id_blog];
	try {
		const results = await executeQuery(query, params);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête de suppression du blog :", error);
		throw error;
	}
};
const supprimerCommentaire = async (id_commentaire) => {
	const query = `
		DELETE FROM commentaire WHERE id_commentaire = ?;
    `;
	const params = [id_commentaire];
	try {
		const results = await executeQuery(query, params);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête de suppression du commentaire :", error);
		throw error;
	}
};
const supprimerTechnologie = async (id_projet, id_technologie) => {
	const query = `
	DELETE FROM technologie 
		WHERE id_projet = ? AND id_technologie = ?;		
    `;
	const params = [id_projet, id_technologie];
	try {
		const results = await executeQuery(query, params);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête de suppression de la technologie :", error);
		throw error;
	}
};
const modifierProjet = async (titre, description, nbLike, lien, id_projet) => {
	const query = `
        UPDATE projet
        SET 
		titre = ?,
		description = ?,
		nbLike = ?,
		lien = ?
        WHERE id_projet = ?;
    `;
	const params = [titre, description, nbLike, lien, id_projet];
	try {
		const results = await executeQuery(query, params);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête de mise à jour du projet :", error);
		throw error;
	}
};
const modifierBlog = async (titre, contenu, lien, id_blog) => {
	const query = `
        UPDATE blog
        SET 
		titre = ?,
		contenu = ?,
		lien = ?
        WHERE id_blog = ?;
    `;
	const params = [titre, contenu, lien, id_blog];
	try {
		const results = await executeQuery(query, params);
		return results;
	} catch (error) {
		console.error("Erreur lors de l'exécution de la requête de mise à jour du blog :", error);
		throw error;
	}
};

export {
	getAllProjets,
	getProjetById,
	getAllTechnologieByProjet,
	addCommentaire,
	getAllCommentaires,
	getVideo,
	addProjet,
	addImage,
	addTechnologie,
	updateLike,
	modifierProjet,
	supprimerProjet,
	supprimerBlog,
	getTechnologieByProjet,
	supprimerTechnologie,
	getAllUsers,
	getAllBlogs,
	updateLikeBlog,
	addUser,
	addBlog,
	getBlogsByUser,
	getBlogById,
	modifierBlog,
	updateImageBlog,
	getUsers,
	getAllContenu,
	supprimerUser,
	ajouterContenu,
	supprimerContenu,
	supprimerCommentaire,
};
