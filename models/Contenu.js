const mongoose = require('mongoose');

const contenuSchema = new mongoose.Schema({
  matiere: { type: mongoose.Schema.Types.ObjectId, ref: 'Matiere' },
  absences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Absence' }],
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classe' }]
});

module.exports = mongoose.model('Contenu', contenuSchema);