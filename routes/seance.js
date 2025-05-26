const express = require('express');
const router = express.Router();
const Seance = require('../models/Seance');

router.get('/', async (req, res) => {
  const seances = await Seance.find().populate('salle creneau enseignant');
  res.json(seances);
});

router.post('/', async (req, res) => {
  const seance = new Seance(req.body);
  await seance.save();
  res.status(201).json(seance);
});

router.get('/:id', async (req, res) => {
  const seance = await Seance.findById(req.params.id).populate('salle creneau enseignant');
  res.json(seance);
});

router.put('/:id', async (req, res) => {
  const seance = await Seance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(seance);
});

router.delete('/:id', async (req, res) => {
  await Seance.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;