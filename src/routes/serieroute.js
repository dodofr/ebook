const {
    getAllSeries,
    getSerieById,
    createSerie,
    updateSerie,
    deleteSerie
} = require("../controllers/seriecontroller");


module.exports = (app) => {
    app.get('/api/series', getAllSeries);
    app.get('/api/series/:id', getSerieById);
    app.post('/api/series', createSerie);
    app.put('/api/series/:id', updateSerie);
    app.delete('/api/series/:id', deleteSerie);
};