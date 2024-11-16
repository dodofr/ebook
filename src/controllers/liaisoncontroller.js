const { Ebook, Serie, Categorie, Bibliotheque, User, Auteur } = require('../db/sequelize');

async function getEbooksByCategorie(req, res) {
    try {
        // Extraire l'ID de la catégorie depuis les paramètres de la requête
        const { id } = req.params;

        // Récupérer la catégorie par son ID et inclure les livres associés
        const categorie = await Categorie.findByPk(id, {
            include: [{ model: Ebook }]  // Inclure les livres associés à cette catégorie
        });

        if (!categorie) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }

        // La propriété 'Ebooks' contiendra tous les livres associés à cette catégorie
        res.status(200).json(categorie.Ebooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getEbooksBySerie(req, res) {
    try {
        // Extraire l'ID de la série depuis les paramètres de la requête
        const { id } = req.params;

        // Récupérer la série par son ID et inclure les livres associés
        const serie = await Serie.findByPk(id, {
            include: [{ model: Ebook }]  // Inclure les livres associés à cette série
        });

        if (!serie) {
            return res.status(404).json({ message: "Série non trouvée" });
        }

        // La propriété 'Ebooks' contiendra tous les livres associés à cette série
        res.status(200).json(serie.Ebooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getEbooksByAuteur(req, res) {
    try {
        // Extraire l'ID de la série depuis les paramètres de la requête
        const { id } = req.params;

        // Récupérer la série par son ID et inclure les livres associés
        const auteur = await Auteur.findByPk(id, {
            include: [{ model: Ebook }]  // Inclure les livres associés à cette série
        });

        if (!auteur) {
            return res.status(404).json({ message: "Auteur non trouvée" });
        }

        // La propriété 'Ebooks' contiendra tous les livres associés à cette série
        res.status(200).json(auteur.Ebooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    getEbooksByCategorie,
    getEbooksBySerie,
    getEbooksByAuteur
};