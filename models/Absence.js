const mongoose = require('mongoose');

const absenceSchema = new mongoose.Schema({
  justifiee: { type: Boolean, default: false },
  contenu: { type: mongoose.Schema.Types.ObjectId, ref: 'Contenu' },
  etudiant: { type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant' }
});

module.exports = mongoose.model('Absence', absenceSchema);