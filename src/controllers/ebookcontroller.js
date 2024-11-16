const { Ebook, Serie, Categorie, Bibliotheque, User, Auteur } = require('../db/sequelize');
const fs = require('fs');
const path = require('path');

async function createEbookcontroller(req, res) {
    try {
        const { titre, description, note, commentaire, auteurNom, serieNom, categorieIds } = req.body;
        const fichierEbook = req.files['ebook'] ? `../../uploads/ebooks/${req.files['ebook'][0].filename}` : null;
        const imageCouverture = req.files['couverture'] ? `../../uploads/couvertures/${req.files['couverture'][0].filename}` : null;

        let parsedCategorieIds = Array.isArray(categorieIds) ? categorieIds : JSON.parse(categorieIds);

        // Gestion de l'auteur
        let auteur = await Auteur.findOne({ where: { nom: auteurNom } });
        if (!auteur) {
            auteur = await Auteur.create({ nom: auteurNom });
        }

        // Gestion de la série
        let serie = await Serie.findOne({ where: { nom: serieNom } });
        if (!serie) {
            serie = await Serie.create({ nom: serieNom });
        }

        // Créer l'ebook
        const newEbook = await Ebook.create({
            titre,
            description,
            note,
            commentaire,
            auteurId: auteur.id,
            serieId: serie.id,
            lienTelechargement: fichierEbook,
            imageCouverture,
        });

        // Associer les catégories
        if (parsedCategorieIds && parsedCategorieIds.length > 0) {
            const categories = await Categorie.findAll({ where: { id: parsedCategorieIds } });
            await newEbook.setCategories(categories);
        }

        res.status(201).json(newEbook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function getAllEbooks(req, res) {
    try {
        const ebooks = await Ebook.findAll({
            include: [
                { model: Auteur, as: 'auteur', attributes: ['nom'] },
                { model: Serie, attributes: ['nom'] },
                { model: Categorie, attributes: ['nom'], through: { attributes: [] } }
            ]
        });
        res.status(200).json(ebooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getEbookById(req, res) {
    try {
        const { id } = req.params;
        const ebook = await Ebook.findByPk(id, {
            include: [
                { model: Auteur, as: 'auteur', attributes: ['nom'] },
                { model: Serie, attributes: ['nom'] },
                { model: Categorie, attributes: ['nom'], through: { attributes: [] } }
            ]
        });

        if (!ebook) {
            return res.status(404).json({ message: "Ebook non trouvé" });
        }

        res.status(200).json(ebook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateEbook(req, res) {
    try {
        const { id } = req.params;
        const { titre, description, note, commentaire, auteur, serieNom, categorieIds } = req.body;
        const lienTelechargement = req.file ? `../../uploads/ebooks/${req.file.filename}` : null;

        // Rechercher l'ebook par ID
        const ebook = await Ebook.findByPk(id, {
            include: [{ model: Categorie }]
        });

        if (!ebook) {
            return res.status(404).json({ message: "Ebook non trouvé" });
        }

        // Gestion de la série : vérifier si la série existe, sinon la créer
        let serie = null;
        if (serieNom) {
            serie = await Serie.findOne({ where: { nom: serieNom } });
            if (!serie) {
                serie = await Serie.create({ nom: serieNom });
            }
        }

        // Supprimer l'ancien fichier PDF si un nouveau fichier est téléchargé
        if (lienTelechargement && ebook.lienTelechargement) {
            const oldFilePath = path.join(__dirname, '../../uploads/ebooks/', ebook.lienTelechargement);
            if (fs.existsSync(oldFilePath)) {
                try {
                    fs.unlinkSync(oldFilePath);
                    console.log(`Ancien fichier supprimé : ${oldFilePath}`);
                } catch (err) {
                    console.error(`Erreur lors de la suppression du fichier : ${err.message}`);
                }
            }
        }

        // Mise à jour de l'ebook
        await ebook.update({
            titre,
            description,
            note,
            commentaire,
            auteur,
            serieId: serie ? serie.id : ebook.serieId,
            lienTelechargement: lienTelechargement || ebook.lienTelechargement,
        });

        // Vérifier et parser les categorieIds
        let parsedCategorieIds = Array.isArray(categorieIds) ? categorieIds : JSON.parse(categorieIds);

        // Mise à jour des catégories si `categorieIds` est fourni
        if (parsedCategorieIds && parsedCategorieIds.length > 0) {
            console.log('categorieIds reçu:', parsedCategorieIds);

            // Supprimez les anciennes associations
            await ebook.setCategories([]);

            // Ajoutez les nouvelles associations
            const categories = await Categorie.findAll({ where: { id: parsedCategorieIds } });
            if (categories.length > 0) {
                await ebook.addCategories(categories);
                console.log('Nouvelles catégories ajoutées:', categories);
            } else {
                console.log('Aucune catégorie trouvée pour les IDs:', parsedCategorieIds);
            }
        }

        // Retourner l'ebook mis à jour
        const updatedEbook = await Ebook.findByPk(id, {
            include: [{ model: Categorie }, { model: Serie }],
        });

        res.status(200).json(updatedEbook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function deleteEbook(req, res) {
    try {
        const { id } = req.params;
        const ebook = await Ebook.findByPk(id);

        if (!ebook) {
            return res.status(404).json({ message: "Ebook non trouvé" });
        }

        // Supprimer le fichier ebook (PDF, EPUB, MOBI)
        const ebookPath = path.join(__dirname, '../../uploads/ebooks', path.basename(ebook.lienTelechargement));
        if (fs.existsSync(ebookPath)) {
            fs.unlinkSync(ebookPath);
        }

        // Supprimer l'image de couverture
        const imagePath = path.join(__dirname, '../../uploads/couvertures', path.basename(ebook.imageCouverture));
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        // Supprimer l'ebook de la base de données
        await ebook.destroy();
        res.status(204).json({ message: "Ebook et fichiers supprimés avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    createEbookcontroller,
    getAllEbooks,
    getEbookById,
    updateEbook,
    deleteEbook
};
