const express = require('express');
const router = express.Router();
const Contenu = require('../models/Contenu');

router.get('/', async (req, res) => {
  const contenus = await Contenu.find().populate('matiere absences classes');
  res.json(contenus);
});

router.post('/', async (req, res) => {
  const contenu = new Contenu(req.body);
  await contenu.save();
  res.status(201).json(contenu);
});

router.get('/:id', async (req, res) => {
  const contenu = await Contenu.findById(req.params.id).populate('matiere absences classes');
  res.json(contenu);
});

router.put('/:id', async (req, res) => {
  const contenu = await Contenu.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(contenu);
});

router.delete('/:id', async (req, res) => {
  await Contenu.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;