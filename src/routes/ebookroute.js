const upload = require('../upload/upload')

const {
    createEbookcontroller,
    getAllEbooks,
    getEbookById,
    updateEbook,
    deleteEbook
} = require("../controllers/ebookcontroller");


module.exports = (app) => {
    app.post("/api/ebooks",upload.single('file'), createEbookcontroller)
    app.get('/api/ebooks', getAllEbooks);
    app.get('/api/ebooks/:id', getEbookById);
    app.put('/api/ebooks/:id',upload.single('file'), updateEbook);
    app.delete('/api/ebooks/:id', deleteEbook);
  };