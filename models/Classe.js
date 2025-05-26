const mongoose = require('mongoose');
const ClasseSchema = new mongoose.Schema({
  nom_classe: String,
  contenus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contenu' }],
  etudiants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Etudiant' }]
});
module.exports = mongoose.model('Classe', ClasseSchema);