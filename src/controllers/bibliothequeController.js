const { Ebook, Serie, Categorie, Bibliotheque, User,Auteur } = require('../db/sequelize');

// Ajouter un ebook à la bibliothèque de l'utilisateur
async function addEbookToBibliotheque(req, res) {
    try {
        const userId = req.user.id;
        const { ebookId, statut, notePersonnelle } = req.body;
        console.log("Corps de la requête:", req.body);
        console.log("userId:", userId);
        console.log("ebookId:", ebookId);
        console.log("statut:", statut);
        console.log("notePersonnelle:", notePersonnelle);

        // Vérifier si l'ebook existe
        const ebook = await Ebook.findByPk(ebookId);
        if (!ebook) {
            return res.status(404).json({ message: "Ebook non trouvé" });
        }

        // Ajouter l'ebook à la bibliothèque de l'utilisateur
        const bibliothequeEntry = await Bibliotheque.create({
            bibUserId: userId, // Utiliser la clé étrangère modifiée
            bibEbookId: ebookId, // Utiliser la clé étrangère modifiée
            statut,
            notePersonnelle,
        });

        res.status(201).json(bibliothequeEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Mettre à jour le statut et la note personnelle de l'utilisateur pour un ebook
async function updateBibliothequeEntry(req, res) {
    try {
        const userId = req.user.id;
        const { ebookId, statut, notePersonnelle } = req.body;

        // Trouver l'entrée dans la bibliothèque
        const entry = await Bibliotheque.findOne({ where: { bibUserId: userId, bibEbookId: ebookId } });
        if (!entry) {
            return res.status(404).json({ message: "Entrée non trouvée dans la bibliothèque" });
        }

        // Mettre à jour le statut et la note personnelle
        await entry.update({ statut, notePersonnelle });
        res.status(200).json(entry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getUserBibliotheque(req, res) {
    try {
        const isAdmin = req.user.role === 'admin'; // Vérifie si l'utilisateur est admin
        const userId = isAdmin && req.params.userId ? req.params.userId : req.user.id; // Utilise l'ID de l'admin ou de l'utilisateur connecté

        // Rechercher les ebooks de la bibliothèque de l'utilisateur
        const bibliotheque = await Bibliotheque.findAll({
            where: { bibUserId: userId }, // Utiliser l'ID correct de l'utilisateur
            include: [
                {
                    model: Ebook,
                    as: 'ebook', // Spécifier l'alias pour l'ebook
                    include: [{ model: Categorie }, { model: Serie }],
                },
            ],
        });

        if (bibliotheque.length === 0) {
            return res.status(404).json({ message: "La bibliothèque est vide." });
        }

        res.status(200).json(bibliotheque);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



// Supprimer un ebook de la bibliothèque de l'utilisateur
async function removeEbookFromBibliotheque(req, res) {
    try {
        const userId = req.user.id;
        const { ebookId } = req.params;

        // Trouver et supprimer l'entrée dans la bibliothèque
        const entry = await Bibliotheque.findOne({ where: { bibUserId: userId, bibEbookId: ebookId } });
        if (!entry) {
            return res.status(404).json({ message: "Entrée non trouvée dans la bibliothèque" });
        }

        await entry.destroy();
        res.status(200).json({ message: "Ebook retiré de la bibliothèque" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addEbookToBibliotheque,
    updateBibliothequeEntry,
    getUserBibliotheque,
    removeEbookFromBibliotheque,
};
