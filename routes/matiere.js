const express = require('express');
const router = express.Router();
const Matiere = require('../models/Matiere');

router.get('/', async (req, res) => {
  const matieres = await Matiere.find().populate('contenus enseignant');
  res.json(matieres);
});

router.post('/', async (req, res) => {
  const matiere = new Matiere(req.body);
  await matiere.save();
  res.status(201).json(matiere);
});

router.get('/:id', async (req, res) => {
  const matiere = await Matiere.findById(req.params.id).populate('contenus enseignant');
  res.json(matiere);
});

router.put('/:id', async (req, res) => {
  const matiere = await Matiere.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(matiere);
});

router.delete('/:id', async (req, res) => {
  await Matiere.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;