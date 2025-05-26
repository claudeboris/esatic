const express = require('express');
const router = express.Router();
const Correspondant = require('../models/Correspondant');

router.get('/', async (req, res) => {
  const correspondants = await Correspondant.find().populate('etudiants');
  res.json(correspondants);
});

router.post('/', async (req, res) => {
  const correspondant = new Correspondant(req.body);
  await correspondant.save();
  res.status(201).json(correspondant);
});

router.get('/:id', async (req, res) => {
  const correspondant = await Correspondant.findById(req.params.id).populate('etudiants');
  res.json(correspondant);
});

router.put('/:id', async (req, res) => {
  const correspondant = await Correspondant.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(correspondant);
});

router.delete('/:id', async (req, res) => {
  await Correspondant.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;