module.exports = (sequelize, DataTypes) => {
    const Bibliotheque = sequelize.define('Bibliotheque', {
        statut: {
          type: DataTypes.ENUM('lu', 'vouloir lire'),
          defaultValue: 'vouloir lire',
          allowNull: false,
        },
        notePersonnelle: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        bibEbookId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Ebooks',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        bibUserId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      }, {
        tableName: 'Bibliotheques',
        timestamps: true,
        indexes: [
          {
            unique: true,
            fields: ['bibEbookId', 'bibUserId'],
          },
        ],
      });
    
      // Définition de la méthode associate
      Bibliotheque.associate = (models) => {
        Bibliotheque.belongsTo(models.User, {
          foreignKey: 'bibUserId',
          as: 'user',
        });
        Bibliotheque.belongsTo(models.Ebook, {
          foreignKey: 'bibEbookId',
          as: 'ebook',
        });
      };
    
      return Bibliotheque;
    };
