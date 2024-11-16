module.exports = (sequelize, DataTypes) => {
    const Ebook = sequelize.define('Ebook', {
        titre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        note: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 10,
            },
        },
        commentaire: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        imageCouverture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lienTelechargement: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        timestamps: true,
    });

    Ebook.associate = (models) => {
        Ebook.belongsTo(models.Auteur, { foreignKey: 'auteurId', as: 'auteur' });
        Ebook.belongsTo(models.Serie, { foreignKey: 'serieId' });
        Ebook.belongsToMany(models.Categorie, { through: 'EbookCategories' });
        Ebook.belongsToMany(models.User, {
            through: 'Bibliotheque',
            foreignKey: 'bibEbookId',
        });
    };

    return Ebook;
};
