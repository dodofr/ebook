const { Ebook, Serie, Categorie, Bibliotheque, User, Auteur } = require('../db/sequelize');

async function getRandomEbook(req, res) {
    try {
        const randomEbook = await Ebook.findOne({
            order: sequelize.random(), // Utilise `ORDER BY RANDOM()` ou `ORDER BY RAND()`
        });

        if (!randomEbook) {
            return res.status(404).json({ message: "Aucun ebook trouvé" });
        }

        res.status(200).json(randomEbook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getRandomAuteur(req, res) {
    try {
        const randomAuteur = await Auteur.findOne({
            order: sequelize.random(),
        });

        if (!randomAuteur) {
            return res.status(404).json({ message: "Aucun auteur trouvé" });
        }

        res.status(200).json(randomAuteur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getRandomSerie(req, res) {
    try {
        const randomSerie = await Serie.findOne({
            order: sequelize.random(),
        });

        if (!randomSerie) {
            return res.status(404).json({ message: "Aucune série trouvée" });
        }

        res.status(200).json(randomSerie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getRandomAuteur, getRandomEbook, getRandomSerie };