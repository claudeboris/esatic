const express = require('express');
const router = express.Router();
const CreneauHoraire = require('../models/CreneauHoraire');

router.get('/', async (req, res) => {
  const creneaux = await CreneauHoraire.find().populate('seances');
  res.json(creneaux);
});

router.post('/', async (req, res) => {
  const creneau = new CreneauHoraire(req.body);
  await creneau.save();
  res.status(201).json(creneau);
});

router.get('/:id', async (req, res) => {
  const creneau = await CreneauHoraire.findById(req.params.id).populate('seances');
  res.json(creneau);
});

router.put('/:id', async (req, res) => {
  const creneau = await CreneauHoraire.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(creneau);
});

router.delete('/:id', async (req, res) => {
  await CreneauHoraire.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;