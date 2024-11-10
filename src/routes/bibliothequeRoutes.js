const { authenticateToken, authorizeAdmin } = require('../auth/authMiddleware');
const {
    addEbookToBibliotheque,
    updateBibliothequeEntry,
    getUserBibliotheque,
    removeEbookFromBibliotheque,
} = require('../controllers/bibliothequeController');

module.exports = (app) => {
    app.post('/api/bibliotheque', authenticateToken, addEbookToBibliotheque);
    app.put('/api/bibliotheque', authenticateToken, updateBibliothequeEntry);
    app.get('/api/bibliotheque', authenticateToken, getUserBibliotheque);
    app.delete('/api/bibliotheque/:ebookId', authenticateToken, removeEbookFromBibliotheque); // Suppression par ebookId
};
