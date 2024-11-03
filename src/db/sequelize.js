const { Sequelize, DataTypes } = require("sequelize");
const EbookModel = require("../models/ebooks");
const CategorieModel = require("../models/categorie");
const SerieModel = require("../models/serie");

const sequelize = new Sequelize(`mariadb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3305/${process.env.DB_NAME}`, {
    dialectOptions: {
        connectTimeout: 60000 // Augmenter le délai d'attente à 60 secondes
    }
});


// Initialisation des modèles
const Ebook = EbookModel(sequelize, DataTypes);
const Serie = SerieModel(sequelize, DataTypes);
const Categorie = CategorieModel(sequelize, DataTypes);

// Appeler les fonctions d'association
Ebook.associate({ Serie, Categorie });
Serie.associate({ Ebook });
Categorie.associate({ Ebook });

// Fonction d'initialisation/synchronisation de la base de données
const initDb = async () => {
    try {
        await sequelize.authenticate(); // Vérifiez la connexion
        console.log("Connexion à la base de données réussie.");
        
        await sequelize.sync({ force: true });
        console.log("La base de donnée a bien été initialisée !");
    } catch (error) {
        console.error("Erreur lors de la connexion à la base de données :", error);
    }
};

module.exports = {
    initDb,
    Ebook,
    Serie,
    Categorie,
};
