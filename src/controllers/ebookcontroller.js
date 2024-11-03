// const {Ebook, Categorie} = require('../db/sequelize');
// async function createEbookcontroller (req, res) {
//     try {
//         const { titre, description, note, commentaire, auteur, serieId, categorieIds } = req.body;
//         const lienTelechargement = req.file ? `../../uploads/ebooks/${req.file.filename}` : null;

//         const newEbook = await Ebook.create({
//             titre,
//             description,
//             note,
//             commentaire,
//             auteur,
//             serieId,
//             lienTelechargement,
//         });

//         if (categorieIds && categorieIds.length > 0) {
//             const categories = await Categorie.findAll({ where: { id: categorieIds } });
//             await newEbook.addCategories(categories);
//         }

//         res.status(201).json(newEbook);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = {
//     createEbookcontroller
// }
const { Ebook, Serie, Categorie } = require('../db/sequelize');

async function createEbookcontroller(req, res) {
    try {
        const { titre, description, note, commentaire, auteur, serieNom, categorieIds } = req.body;
        const lienTelechargement = req.file ? `../../uploads/ebooks/${req.file.filename}` : null;

        // Vérifiez si la série existe, sinon créez-la
        let serie = await Serie.findOne({ where: { nom: serieNom } });
        if (!serie) {
            serie = await Serie.create({ nom: serieNom });
        }

        // Créez l'ebook en utilisant l'ID de la série
        const newEbook = await Ebook.create({
            titre,
            description,
            note,
            commentaire,
            auteur,
            serieId: serie.id, // Utilisez l'ID de la série
            lienTelechargement,
        });

        // Associez les catégories si fournies
        if (categorieIds && categorieIds.length > 0) {
            const categories = await Categorie.findAll({ where: { id: categorieIds } });
            await newEbook.addCategories(categories);
        }

        res.status(201).json(newEbook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createEbookcontroller
};
