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
        auteur: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lienTelechargement: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        timestamps: true,
    });

    Ebook.associate = (models) => {
        Ebook.belongsTo(models.Serie, { foreignKey: 'serieId' });
        Ebook.belongsToMany(models.Categorie, { through: 'EbookCategories' });
        Ebook.belongsToMany(models.User, {
            through: 'Bibliotheque',
            foreignKey: 'bibEbookId',
        });
    };

    return Ebook;
};
