const {
    getEbooksByCategorie,
    getEbooksBySerie
} = require("../controllers/liaisoncontroller");


module.exports = (app) => {
    app.get('/api/liaisons/categorie/:id', getEbooksByCategorie);
    app.get('/api/liaisons/serie/:id', getEbooksBySerie);
};