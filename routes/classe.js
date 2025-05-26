const express = require('express');
const router = express.Router();
const Classe = require('../models/Classe');

// Liste des classes
router.get('/', async (req, res) => {
  const classes = await Classe.find().populate('contenus etudiants');
  res.render('classes', { classes });
});

// Formulaire pour ajouter une classe
router.get('/new', (req, res) => {
  res.render('classeForm');
});

// Ajouter une classe
router.post('/', async (req, res) => {
  const classe = new Classe({
    nom_classe: req.body.nom_classe
  });
  await classe.save();
  res.redirect('/classes');
});

module.exports = router;