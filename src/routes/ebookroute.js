const upload = require('../upload/upload')

const {
    createEbookcontroller,
} = require("../controllers/ebookcontroller");


module.exports = (app) => {
    app.post("/api/ebooks",upload.single('file'), createEbookcontroller)

  };