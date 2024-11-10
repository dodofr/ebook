const { registerUser, updateUser, deleteUser, getUser, getAllUsers } = require('../controllers/usercontroller');
const { authenticateToken, authorizeAdmin } = require('../auth/authMiddleware');


module.exports = (app) => {
    app.post('/api/users/register', registerUser);
    app.get('/api/users/:id', authenticateToken, getUser);
    app.get('/api/users', authenticateToken, authorizeAdmin, getAllUsers);
    app.put('/api/users/:id', authenticateToken, updateUser);
    app.delete('/api/users/:id', authenticateToken, authorizeAdmin, deleteUser);
};