const mongoose = require('mongoose');
const Etudiant = require('./models/Etudiant');
const Classe = require('./models/Classe');
const Enseignant = require('./models/Enseignant');
const Absence = require('./models/Absence');
const Matiere = require('./models/Matiere');
const Seance = require('./models/Seance');
const Salle = require('./models/Salle');
const CreneauHoraire = require('./models/CreneauHoraire');
const Contenu = require('./models/Contenu');
const Correspondant = require('./models/Correspondant');

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/schoolManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedDatabase = async () => {
  try {
    // Vider les collections existantes
    await Etudiant.deleteMany({});
    await Classe.deleteMany({});
    await Enseignant.deleteMany({});
    await Absence.deleteMany({});
    await Matiere.deleteMany({});
    await Seance.deleteMany({});
    await Salle.deleteMany({});
    await CreneauHoraire.deleteMany({});
    await Contenu.deleteMany({});
    await Correspondant.deleteMany({});

    // Créer 10 Créneaux Horaires
    const creneaux = await CreneauHoraire.insertMany([
      { heure_debut: '08:30', heure_fin: '10:00' },
      { heure_debut: '08:30', heure_fin: '10:00' },
      { heure_debut: '10:15', heure_fin: '12:45' },
      { heure_debut: '10:15', heure_fin: '12:45' },
      { heure_debut: '14:00', heure_fin: '17:00' },
      { heure_debut: '14:00', heure_fin: '17:00' },
      { heure_debut: '08:30', heure_fin: '10:00' },
      { heure_debut: '10:15', heure_fin: '12:45' },
      { heure_debut: '14:00', heure_fin: '17:00' },
      { heure_debut: '08:30', heure_fin: '10:00' }
    ]);

    // Créer 10 Salles
    const salles = await Salle.insertMany([
      { capacite: 30, disponibilite: true },
      { capacite: 25, disponibilite: true },
      { capacite: 40, disponibilite: false },
      { capacite: 35, disponibilite: true },
      { capacite: 20, disponibilite: true },
      { capacite: 30, disponibilite: false },
      { capacite: 45, disponibilite: true },
      { capacite: 25, disponibilite: true },
      { capacite: 30, disponibilite: false },
      { capacite: 50, disponibilite: true }
    ]);

    // Créer 10 Correspondants
    const correspondants = await Correspondant.insertMany([
      { nom: 'Dupont', prenom: 'Marie' },
      { nom: 'Martin', prenom: 'Jean' },
      { nom: 'Bernard', prenom: 'Sophie' },
      { nom: 'Petit', prenom: 'Luc' },
      { nom: 'Leroy', prenom: 'Anne' },
      { nom: 'Moreau', prenom: 'Paul' },
      { nom: 'Simon', prenom: 'Claire' },
      { nom: 'Laurent', prenom: 'Marc' },
      { nom: 'Girard', prenom: 'Julie' },
      { nom: 'Meyer', prenom: 'Thomas' }
    ]);

    // Créer 10 Classes
    const classes = await Classe.insertMany([
      { nom_classe: 'Classe 1A' },
      { nom_classe: 'Classe 1B' },
      { nom_classe: 'Classe 2A' },
      { nom_classe: 'Classe 2B' },
      { nom_classe: 'Classe 3A' },
      { nom_classe: 'Classe 3B' },
      { nom_classe: 'Classe 4A' },
      { nom_classe: 'Classe 4B' },
      { nom_classe: 'Classe 5A' },
      { nom_classe: 'Classe 5B' }
    ]);

    // Créer 10 Étudiants
    const etudiants = await Etudiant.insertMany([
      { prenom: 'Alice', date_naissance: new Date('2005-03-15'), email: 'alice@example.com', numero_tel: '0123456789', classe: classes[0]._id, correspondant: correspondants[0]._id },
      { prenom: 'Bob', date_naissance: new Date('2005-06-22'), email: 'bob@example.com', numero_tel: '0123456790', classe: classes[0]._id, correspondant: correspondants[1]._id },
      { prenom: 'Clara', date_naissance: new Date('2004-09-10'), email: 'clara@example.com', numero_tel: '0123456791', classe: classes[1]._id, correspondant: correspondants[2]._id },
      { prenom: 'David', date_naissance: new Date('2004-12-05'), email: 'david@example.com', numero_tel: '0123456792', classe: classes[1]._id, correspondant: correspondants[3]._id },
      { prenom: 'Emma', date_naissance: new Date('2005-01-30'), email: 'emma@example.com', numero_tel: '0123456793', classe: classes[2]._id, correspondant: correspondants[4]._id },
      { prenom: 'Felix', date_naissance: new Date('2005-04-18'), email: 'felix@example.com', numero_tel: '0123456794', classe: classes[2]._id, correspondant: correspondants[5]._id },
      { prenom: 'Grace', date_naissance: new Date('2004-07-25'), email: 'grace@example.com', numero_tel: '0123456795', classe: classes[3]._id, correspondant: correspondants[6]._id },
      { prenom: 'Hugo', date_naissance: new Date('2004-10-12'), email: 'hugo@example.com', numero_tel: '0123456796', classe: classes[3]._id, correspondant: correspondants[7]._id },
      { prenom: 'Iris', date_naissance: new Date('2005-02-20'), email: 'iris@example.com', numero_tel: '0123456797', classe: classes[4]._id, correspondant: correspondants[8]._id },
      { prenom: 'Jules', date_naissance: new Date('2005-05-28'), email: 'jules@example.com', numero_tel: '0123456798', classe: classes[4]._id, correspondant: correspondants[9]._id }
    ]);

    // Mettre à jour les correspondants avec leurs étudiants
    for (let i = 0; i < correspondants.length; i++) {
      correspondants[i].etudiants = [etudiants[i]._id];
      await correspondants[i].save();
    }

    // Mettre à jour les classes avec leurs étudiants
    classes[0].etudiants = [etudiants[0]._id, etudiants[1]._id];
    classes[1].etudiants = [etudiants[2]._id, etudiants[3]._id];
    classes[2].etudiants = [etudiants[4]._id, etudiants[5]._id];
    classes[3].etudiants = [etudiants[6]._id, etudiants[7]._id];
    classes[4].etudiants = [etudiants[8]._id, etudiants[9]._id];
    for (let i = 0; i < 5; i++) {
      await classes[i].save();
    }

    // Créer 10 Enseignants
    const enseignants = await Enseignant.insertMany([
      { prenom: 'Marie', nom: 'Dupont', email: 'marie.dupont@example.com' },
      { prenom: 'Jean', nom: 'Martin', email: 'jean.martin@example.com' },
      { prenom: 'Sophie', nom: 'Bernard', email: 'sophie.bernard@example.com' },
      { prenom: 'Luc', nom: 'Petit', email: 'luc.petit@example.com' },
      { prenom: 'Anne', nom: 'Leroy', email: 'anne.leroy@example.com' },
      { prenom: 'Paul', nom: 'Moreau', email: 'paul.moreau@example.com' },
      { prenom: 'Claire', nom: 'Simon', email: 'claire.simon@example.com' },
      { prenom: 'Marc', nom: 'Laurent', email: 'marc.laurent@example.com' },
      { prenom: 'Julie', nom: 'Girard', email: 'julie.girard@example.com' },
      { prenom: 'Thomas', nom: 'Meyer', email: 'thomas.meyer@example.com' }
    ]);

    // Créer 10 Matières
    const matieres = await Matiere.insertMany([
      { nom: 'Mathématiques', enseignant: enseignants[0]._id },
      { nom: 'Français', enseignant: enseignants[1]._id },
      { nom: 'Sciences', enseignant: enseignants[2]._id },
      { nom: 'Histoire', enseignant: enseignants[3]._id },
      { nom: 'Anglais', enseignant: enseignants[4]._id },
      { nom: 'Physique', enseignant: enseignants[5]._id },
      { nom: 'Chimie', enseignant: enseignants[6]._id },
      { nom: 'Arts', enseignant: enseignants[7]._id },
      { nom: 'Sport', enseignant: enseignants[8]._id },
      { nom: 'Géographie', enseignant: enseignants[9]._id }
    ]);

    // Mettre à jour les enseignants avec leurs matières
    for (let i = 0; i < enseignants.length; i++) {
      enseignants[i].matieres = [matieres[i]._id];
      await enseignants[i].save();
    }

    // Créer 10 Contenus
    const contenus = await Contenu.insertMany([
      { matiere: matieres[0]._id, classes: [classes[0]._id] },
      { matiere: matieres[1]._id, classes: [classes[0]._id] },
      { matiere: matieres[2]._id, classes: [classes[1]._id] },
      { matiere: matieres[3]._id, classes: [classes[1]._id] },
      { matiere: matieres[4]._id, classes: [classes[2]._id] },
      { matiere: matieres[5]._id, classes: [classes[2]._id] },
      { matiere: matieres[6]._id, classes: [classes[3]._id] },
      { matiere: matieres[7]._id, classes: [classes[3]._id] },
      { matiere: matieres[8]._id, classes: [classes[4]._id] },
      { matiere: matieres[9]._id, classes: [classes[4]._id] }
    ]);

    // Mettre à jour les matières avec leurs contenus
    for (let i = 0; i < matieres.length; i++) {
      matieres[i].contenus = [contenus[i]._id];
      await matieres[i].save();
    }

    // Mettre à jour les classes avec leurs contenus
    classes[0].contenus = [contenus[0]._id, contenus[1]._id];
    classes[1].contenus = [contenus[2]._id, contenus[3]._id];
    classes[2].contenus = [contenus[4]._id, contenus[5]._id];
    classes[3].contenus = [contenus[6]._id, contenus[7]._id];
    classes[4].contenus = [contenus[8]._id, contenus[9]._id];
    for (let i = 0; i < 5; i++) {
      await classes[i].save();
    }

    // Créer 10 Séances
    const seances = await Seance.insertMany([
      { date_seance: new Date('2025-05-05'), salle: salles[0]._id, creneau: creneaux[0]._id, enseignant: enseignants[0]._id },
      { date_seance: new Date('2025-05-06'), salle: salles[1]._id, creneau: creneaux[1]._id, enseignant: enseignants[1]._id },
      { date_seance: new Date('2025-05-07'), salle: salles[2]._id, creneau: creneaux[2]._id, enseignant: enseignants[2]._id },
      { date_seance: new Date('2025-05-08'), salle: salles[3]._id, creneau: creneaux[3]._id, enseignant: enseignants[3]._id },
      { date_seance: new Date('2025-05-09'), salle: salles[4]._id, creneau: creneaux[4]._id, enseignant: enseignants[4]._id },
      { date_seance: new Date('2025-05-10'), salle: salles[5]._id, creneau: creneaux[5]._id, enseignant: enseignants[5]._id },
      { date_seance: new Date('2025-05-11'), salle: salles[6]._id, creneau: creneaux[6]._id, enseignant: enseignants[6]._id },
      { date_seance: new Date('2025-05-12'), salle: salles[7]._id, creneau: creneaux[7]._id, enseignant: enseignants[7]._id },
      { date_seance: new Date('2025-05-13'), salle: salles[8]._id, creneau: creneaux[8]._id, enseignant: enseignants[8]._id },
      { date_seance: new Date('2025-05-14'), salle: salles[9]._id, creneau: creneaux[9]._id, enseignant: enseignants[9]._id }
    ]);

    // Mettre à jour les enseignants avec leurs séances
    for (let i = 0; i < enseignants.length; i++) {
      enseignants[i].seances = [seances[i]._id];
      await enseignants[i].save();
    }

    // Mettre à jour les créneaux avec leurs séances
    for (let i = 0; i < creneaux.length; i++) {
      creneaux[i].seances = [seances[i]._id];
      await creneaux[i].save();
    }

    // Créer 10 Absences
    const absences = await Absence.insertMany([
      { justifiee: true, contenu: contenus[0]._id, etudiant: etudiants[0]._id },
      { justifiee: false, contenu: contenus[1]._id, etudiant: etudiants[1]._id },
      { justifiee: true, contenu: contenus[2]._id, etudiant: etudiants[2]._id },
      { justifiee: false, contenu: contenus[3]._id, etudiant: etudiants[3]._id },
      { justifiee: true, contenu: contenus[4]._id, etudiant: etudiants[4]._id },
      { justifiee: false, contenu: contenus[5]._id, etudiant: etudiants[5]._id },
      { justifiee: true, contenu: contenus[6]._id, etudiant: etudiants[6]._id },
      { justifiee: false, contenu: contenus[7]._id, etudiant: etudiants[7]._id },
      { justifiee: true, contenu: contenus[8]._id, etudiant: etudiants[8]._id },
      { justifiee: false, contenu: contenus[9]._id, etudiant: etudiants[9]._id }
    ]);

    // Mettre à jour les étudiants avec leurs absences
    for (let i = 0; i < etudiants.length; i++) {
      etudiants[i].absences = [absences[i]._id];
      await etudiants[i].save();
    }

    // Mettre à jour les contenus avec leurs absences
    for (let i = 0; i < contenus.length; i++) {
      contenus[i].absences = [absences[i]._id];
      await contenus[i].save();
    }

    console.log('Base de données remplie avec succès !');
  } catch (err) {
    console.error('Erreur lors du remplissage de la base de données :', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();