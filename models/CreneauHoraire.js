const mongoose = require('mongoose');

const creneauHoraireSchema = new mongoose.Schema({
  heure_debut: { type: String, enum: ['08:30', '10:15', '14:00'], required: true },
  heure_fin: { type: String, enum: ['10:00', '12:45', '17:00'], required: true },
  seances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seance' }]
});

module.exports = mongoose.model('CreneauHoraire', creneauHoraireSchema);