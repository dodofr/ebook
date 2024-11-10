const { Ebook, Serie, Categorie, Bibliotheque, User } = require('../db/sequelize');

async function getAllSeries(req, res) {
    try {
        const series = await Serie.findAll();
        res.status(200).json(series);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getSerieById(req, res) {
    try {
        const { id } = req.params;
        const serie = await Serie.findByPk(id);

        if (!serie) {
            return res.status(404).json({ message: "Série non trouvée" });
        }

        res.status(200).json(serie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createSerie(req, res) {
    try {
        const { nom } = req.body;

        // Créez une nouvelle série
        const newSerie = await Serie.create({ nom });

        res.status(201).json(newSerie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateSerie(req, res) {
    try {
        const { id } = req.params;
        const { nom } = req.body;

        const serie = await Serie.findByPk(id);

        if (!serie) {
            return res.status(404).json({ message: "Série non trouvée" });
        }

        // Mise à jour de la série
        serie.nom = nom || serie.nom;
        await serie.save();

        res.status(200).json(serie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteSerie(req, res) {
    try {
        const { id } = req.params;
        const serie = await Serie.findByPk(id);

        if (!serie) {
            return res.status(404).json({ message: "Série non trouvée" });
        }

        // Supprimer la série
        await serie.destroy();

        res.status(204).json({ message: "Série supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllSeries,
    getSerieById,
    updateSerie,
    createSerie,
    deleteSerie
};