const express = require('express');
const router = express.Router();
const Enseignant = require('../models/Enseignant');
const Matiere = require('../models/Matiere');

// Liste des enseignants
router.get('/', async (req, res) => {
  console.log('okkkkk')
  const enseignants = await Enseignant.find().populate('matieres seances');
  res.render('enseignants', { enseignants });
});

// Formulaire pour ajouter un enseignant
router.get('/new', async (req, res) => {
  const matieres = await Matiere.find();
  res.render('enseignantForm', { matieres });
});

// Ajouter un enseignant
router.post('/', async (req, res) => {
  const enseignant = new Enseignant({
    prenom: req.body.prenom,
    nom: req.body.nom,
    email: req.body.email,
    matieres: req.body.matieres
  });
  await enseignant.save();
  
  // Mettre à jour les matières
  if (req.body.matieres) {
    await Matiere.updateMany(
      { _id: { $in: req.body.matieres } },
      { $set: { enseignant: enseignant._id } }
    );
  }
  
  res.redirect('/enseignants');
});

module.exports = router;