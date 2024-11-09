const {
    getAllCategories,
    getCategorieById,
    createCategorie,
    updateCategorie,
    deleteCategorie
} = require("../controllers/categoriecontroller");


module.exports = (app) => {
    app.get('/api/categories', getAllCategories);
    app.get('/api/categories/:id', getCategorieById);
    app.post('/api/categories', createCategorie);
    app.put('/api/categories/:id', updateCategorie);
    app.delete('/api/categories/:id', deleteCategorie);
};