module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        motDePasse: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user',
        },
    }, {
        timestamps: true,
    });

    User.associate = function(models) {
        User.hasMany(models.Bibliotheque, { foreignKey: 'bibUserId' });
        User.belongsToMany(models.Ebook, {
            through: 'Bibliotheque',
            foreignKey: 'bibUserId',
        });
    };

    return User;
};
