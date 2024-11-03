module.exports = (sequelize, DataTypes) => {
    const Categorie = sequelize.define('Categorie', {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });

    Categorie.associate = function(models) {
        Categorie.belongsToMany(models.Ebook, { through: 'EbookCategories' });
    };

    return Categorie;
};
