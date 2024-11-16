const { createAuteur, getAllAuteurs, getAuteurById, updateAuteur, deleteAuteur } = require('../controllers/auteurcontroller');

module.exports = (app) => {
app.post('/api/auteurs', createAuteur);
app.get('/api/auteurs',  getAllAuteurs);
app.get('/api/auteurs/:id',  getAuteurById);
app.put('/api/auteurs/:id', updateAuteur);
app.delete('/api/auteurs/:id', deleteAuteur);
};