const express = require('express');
const router = express.Router();
const Etudiant = require('../models/Etudiant');
const Classe = require('../models/Classe');
const Correspondant = require('../models/Correspondant');

// Liste des étudiants
router.get('/', async (req, res) => {
  const etudiants = await Etudiant.find().populate('classe correspondant absences');
  res.render('etudiants', { etudiants });
});

// Formulaire pour ajouter un étudiant
router.get('/new', async (req, res) => {
  const classes = await Classe.find();
  const correspondants = await Correspondant.find();
  res.render('etudiantForm', { classes, correspondants });
});

// Ajouter un étudiant
router.post('/', async (req, res) => {
  const etudiant = new Etudiant({
    prenom: req.body.prenom,
    date_naissance: req.body.date_naissance,
    email: req.body.email,
    numero_tel: req.body.numero_tel,
    classe: req.body.classe,
    correspondant: req.body.correspondant
  });
  await etudiant.save();
  
  // Mettre à jour la classe et le correspondant
  const classe = await Classe.findById(req.body.classe);
  if (classe) {
    classe.etudiants.push(etudiant._id);
    await classe.save();
  }
  
  const correspondant = await Correspondant.findById(req.body.correspondant);
  if (correspondant) {
    correspondant.etudiants.push(etudiant._id);
    await correspondant.save();
  }
  
  res.redirect('/etudiants');
});

module.exports = router;