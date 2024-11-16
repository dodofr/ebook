const { Ebook, Serie, Categorie, Bibliotheque, User, Auteur } = require('../db/sequelize');

// Créer un auteur
async function createAuteur(req, res) {
    try {
        const auteur = await Auteur.create(req.body);
        res.status(201).json(auteur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Obtenir tous les auteurs
async function getAllAuteurs(req, res) {
    try {
        const auteurs = await Auteur.findAll();
        res.status(200).json(auteurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Obtenir un auteur par ID
async function getAuteurById(req, res) {
    try {
        const auteur = await Auteur.findByPk(req.params.id);
        if (!auteur) {
            return res.status(404).json({ message: 'Auteur non trouvé' });
        }
        res.status(200).json(auteur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Mettre à jour un auteur par ID
async function updateAuteur(req, res) {
    try {
        const { id } = req.params;
        const { nom, biographie } = req.body;

        const auteur = await Auteur.findByPk(id);
        if (!auteur) {
            return res.status(404).json({ message: "Auteur non trouvé" });
        }

        // Mise à jour de l'auteur
        await auteur.update({ nom, biographie });
        res.status(200).json(auteur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Supprimer un auteur par ID
async function deleteAuteur(req, res) {
    try {
        const { id } = req.params;

        const auteur = await Auteur.findByPk(id);
        if (!auteur) {
            return res.status(404).json({ message: "Auteur non trouvé" });
        }

        // Supprimer l'auteur de la base de données
        await auteur.destroy();
        res.status(204).json({ message: "Auteur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    createAuteur,
    getAllAuteurs,
    getAuteurById,
    updateAuteur,
    deleteAuteur
};

