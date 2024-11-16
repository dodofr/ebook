const upload = require('../upload/upload')

const {
    createEbookcontroller,
    getAllEbooks,
    getEbookById,
    updateEbook,
    deleteEbook
} = require("../controllers/ebookcontroller");


module.exports = (app) => {
    app.post("/api/ebooks",upload.fields([{ name: 'ebook', maxCount: 1 }, { name: 'couverture', maxCount: 1 }]), createEbookcontroller)
    app.get('/api/ebooks', getAllEbooks);
    app.get('/api/ebooks/:id', getEbookById);
    app.put('/api/ebooks/:id',upload.fields([{ name: 'ebook', maxCount: 1 }, { name: 'couverture', maxCount: 1 }]), updateEbook);
    app.delete('/api/ebooks/:id', deleteEbook);
  };