const mongoose = require('mongoose');

const salleSchema = new mongoose.Schema({
  capacite: { type: Number, required: true },
  disponibilite: { type: Boolean, default: true },
  effectif: { type: Number }
});

module.exports = mongoose.model('Salle', salleSchema);