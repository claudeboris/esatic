const mongoose = require('mongoose');

const seanceSchema = new mongoose.Schema({
  date_seance: { type: Date, required: true },
  salle: { type: mongoose.Schema.Types.ObjectId, ref: 'Salle' },
  creneau: { type: mongoose.Schema.Types.ObjectId, ref: 'CreneauHoraire' },
  enseignant: { type: mongoose.Schema.Types.ObjectId, ref: 'Enseignant' }
});

module.exports = mongoose.model('Seance', seanceSchema);