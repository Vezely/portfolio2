import multer from 'multer';
import { addBlog } from '../../queries.js';
import path from 'path';
import sizeOf from 'image-size';

export const config = {
	api: {
		bodyParser: false,
	},
};

// Configuration de Multer
const storage = multer.diskStorage({
	destination: 'public/images/blogs/',
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // Updated to 5MB
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
}).single('photo');

function checkFileType(file, cb) {
	const filetypes = /jpeg|jpg|png|gif|webp/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb(new Error('Images Only!'));
	}
}

export default async function handler(req, res) {
	if (req.method === 'POST') {
		upload(req, res, async (err) => {
			// Notez que nous avons également rendu cette fonction de rappel asynchrone
			if (err) {
				res.status(500).json({ error: err.message });
				return;
			}
			console.log(req.body);
			const { titre, contenu, lien } = req.body;
			try {
				// Si une photo a été envoyée
				if (req.file) {
					const dimensions = sizeOf(req.file.path);
					console.log(titre, contenu, lien, dimensions, req.query.id_utilisateur);
					await addBlog(
						titre,
						contenu,
						req.query.id_utilisateur,
						`/images/blogs/${req.file.filename}`,
						dimensions.width,
						dimensions.height,
						lien,
					);
					res.status(200).json({
						msg: 'File uploaded!',
					});
				}
				// Si aucune photo n'a été envoyée
				else {
					await addBlog(titre, contenu, req.query.id_utilisateur, null, null, null, lien);
					res.status(200).json({
						msg: 'No file uploaded but the rest of the data is processed!',
					});
				}
			} catch (error) {
				res.status(500).json({ error: 'An error occurred while processing the request.' });
			}
		});
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}
