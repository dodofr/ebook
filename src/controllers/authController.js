const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db/sequelize');

async function login(req, res) {
    const { email, motDePasse } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Email ou mot de passe incorrect" });
        }

        const validPassword = await bcrypt.compare(motDePasse, user.motDePasse);
        if (!validPassword) {
            return res.status(400).json({ message: "Email ou mot de passe incorrect" });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Connexion réussie", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function logout(req, res) {
    res.status(200).json({ message: "Déconnexion réussie" });
}




module.exports = { login, logout };
