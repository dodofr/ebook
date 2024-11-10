module.exports = (sequelize, DataTypes) => {
    const Bibliotheque = sequelize.define('Bibliotheque', {
        statut: {
            type: DataTypes.ENUM('lu', 'vouloir lire'),
            defaultValue: 'vouloir lire',
        },
        notePersonnelle: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 0,
                max: 10,
            },
        },
    });

    Bibliotheque.associate = function(models) {
        // L'association User <-> Bibliotheque
        Bibliotheque.belongsTo(models.User, { foreignKey: 'bibUserId' });
        
        // L'association Ebook <-> Bibliotheque
        Bibliotheque.belongsTo(models.Ebook, { foreignKey: 'bibEbookId' });
    };

    return Bibliotheque;
};
