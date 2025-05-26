const mongoose = require('mongoose');

const matiereSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  contenus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contenu' }],
  enseignant: { type: mongoose.Schema.Types.ObjectId, ref: 'Enseignant' }
});

module.exports = mongoose.model('Matiere', matiereSchema);