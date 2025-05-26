const mongoose = require('mongoose');
const EtudiantSchema = new mongoose.Schema({
  prenom: String,
  date_naissance: Date,
  email: String,
  numero_tel: String,
  classe: { type: mongoose.Schema.Types.ObjectId, ref: 'Classe' },
  absences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Absence' }],
  correspondant: { type: mongoose.Schema.Types.ObjectId, ref: 'Correspondant' }
});
module.exports = mongoose.model('Etudiant', EtudiantSchema);