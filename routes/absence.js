const express = require('express');
const router = express.Router();
const Absence = require('../models/Absence');

router.get('/', async (req, res) => {
  const absences = await Absence.find().populate('contenu etudiant');
  res.json(absences);
});

router.post('/', async (req, res) => {
  const absence = new Absence(req.body);
  await absence.save();
  res.status(201).json(absence);
});

router.get('/:id', async (req, res) => {
  const absence = await Absence.findById(req.params.id).populate('contenu etudiant');
  res.json(absence);
});

router.put('/:id', async (req, res) => {
  const absence = await Absence.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(absence);
});

router.delete('/:id', async (req, res) => {
  await Absence.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;