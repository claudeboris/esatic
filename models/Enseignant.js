const mongoose = require('mongoose');
const EnseignantSchema = new mongoose.Schema({
  prenom: String,
  nom: String,
  email: String,
  matieres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Matiere' }],
  seances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seance' }]
});
module.exports = mongoose.model('Enseignant', EnseignantSchema);