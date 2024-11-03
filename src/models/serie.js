module.exports = (sequelize, DataTypes) => {
    const Serie = sequelize.define('Serie', {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });

    Serie.associate = function(models) {
        Serie.hasMany(models.Ebook, { foreignKey: 'serieId' });
    };

    return Serie;
};
