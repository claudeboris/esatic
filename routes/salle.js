const express = require('express');
const router = express.Router();
const Salle = require('../models/Salle');

router.get('/', async (req, res) => {
  const salles = await Salle.find();
  res.json(salles);
});

router.post('/', async (req, res) => {
  const salle = new Salle(req.body);
  await salle.save();
  res.status(201).json(salle);
});

router.get('/:id', async (req, res) => {
  const salle = await Salle.findById(req.params.id);
  res.json(salle);
});

router.put('/:id', async (req, res) => {
  const salle = await Salle.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(salle);
});

router.delete('/:id', async (req, res) => {
  await Salle.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;