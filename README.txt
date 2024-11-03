bdd : https://dash.filess.io

Ajouter le dossier uploads\ebooks 

Dans insomnia mettre multipart puis bien choisir file que nomme file comme app.post("/api/ebooks",upload.single('file'), createEbookcontroller)
structure dans l'onglet Multipart Form :
file : choisissez le fichier à télécharger.
titre : "Mon nouvel ebook".
description : "Description de l'ebook".
note : 9.
commentaire : "Très bon ebook".
auteur : "Auteur Exemple".
serieNom : star wars // si deja la alors rajoute
categorieIds : [1, 2].