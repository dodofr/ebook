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
            defaultValue: 'user', // 'user' ou 'admin'
        },
    }, {
        timestamps: true,
    });

    // Associations
    User.associate = function(models) {
        // Modifier la clé étrangère pour correspondre à la clé utilisée dans Bibliotheque
        User.hasMany(models.Bibliotheque, { foreignKey: 'bibUserId' });
    };

    return User;
};
