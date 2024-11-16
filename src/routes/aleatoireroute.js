const { getRandomEbook, getRandomAuteur, getRandomSerie } = require('../controllers/aleatoirecontroller');

module.exports = (app) => {
app.get('api/aleatoire/ebook', getRandomEbook);
app.get('api/aleatoire/auteur', getRandomAuteur);
app.get('api/aleatoire/serie', getRandomSerie);
};