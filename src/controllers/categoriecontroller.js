const { Ebook, Serie, Categorie, Bibliotheque, User, Auteur } = require('../db/sequelize');

async function getAllCategories(req, res) {
    try {
        const categories = await Categorie.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getCategorieById(req, res) {
    try {
        const { id } = req.params;
        const categorie = await Categorie.findByPk(id);

        if (!categorie) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }

        res.status(200).json(categorie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createCategorie(req, res) {
    try {
        console.log("Corps de la requête :", req.body); 
        const { nom } = req.body;
        // Vérifiez la valeur de 'nom' que vous recevez
        console.log("Nom reçu :", nom);
        // Créez une nouvelle catégorie
        const newCategorie = await Categorie.create({ nom });

        res.status(201).json(newCategorie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateCategorie(req, res) {
    try {
        const { id } = req.params;
        const { nom } = req.body;

        const categorie = await Categorie.findByPk(id);

        if (!categorie) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }

        // Mise à jour de la catégorie
        categorie.nom = nom || categorie.nom;
        await categorie.save();

        res.status(200).json(categorie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteCategorie(req, res) {
    try {
        const { id } = req.params;
        const categorie = await Categorie.findByPk(id);

        if (!categorie) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }

        // Supprimer la catégorie
        await categorie.destroy();

        res.status(204).json({ message: "Catégorie supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllCategories,
    getCategorieById,
    updateCategorie,
    createCategorie,
    deleteCategorie
};