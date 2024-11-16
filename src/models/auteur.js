module.exports = (sequelize, DataTypes) => {
    const Auteur = sequelize.define('Auteur', {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        biographie: {
            type: DataTypes.TEXT,
        },
    }, {
        timestamps: true,
    });

    Auteur.associate = function(models) {
        Auteur.hasMany(models.Ebook, { foreignKey: 'auteurId' });
    };

    return Auteur;
};
