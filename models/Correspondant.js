const mongoose = require('mongoose');

const correspondantSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String },
  etudiants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant' }]
});

module.exports = mongoose.model('Correspondant', correspondantSchema);