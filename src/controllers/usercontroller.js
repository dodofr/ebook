const bcrypt = require('bcrypt');
const { Ebook, Serie, Categorie, Bibliotheque, User } = require('../db/sequelize');

// Inscription
async function registerUser(req, res) {
    const { nom, email, motDePasse, role } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email déjà utilisé" });
        }

        const hashedPassword = await bcrypt.hash(motDePasse, 10);
        const user = await User.create({ nom, email, motDePasse: hashedPassword, role });

        res.status(201).json({ message: "Utilisateur créé avec succès", userId: user.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Récupérer tous les utilisateurs (admin uniquement)
async function getAllUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['motDePasse'] }, // Exclure le mot de passe de la réponse
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Mise à jour d'un utilisateur
async function updateUser(req, res) {
    const { id } = req.params;
    const { nom, email, motDePasse } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const hashedPassword = motDePasse ? await bcrypt.hash(motDePasse, 10) : user.motDePasse;

        await user.update({ nom, email, motDePasse: hashedPassword });
        res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Suppression d'un utilisateur
async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        await user.destroy();
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Récupérer un utilisateur
async function getUser(req, res) {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { registerUser, updateUser, deleteUser, getUser, getAllUsers };
