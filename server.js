const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Connexion à MongoDB
mongoose.connect('mongodb+srv://konanclaudeboriskoffi:l239GQBlHDu2Vdgv@cluster0.wgbnxzs.mongodb.net/schoolManagement')
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('MongoDB connection error:', err));

const Enseignant = require('./models/Enseignant');
const Matiere = require('./models/Matiere');
const Seance = require('./models/Seance');
const CreneauHoraire = require('./models/CreneauHoraire');
const Salle = require('./models/Salle');
const Classe = require('./models/Classe');
const Etudiant = require('./models/Etudiant')
const Contenu = require('./models/Contenu'); 
const Absence = require('./models/Absence');
const Correspondant = require('./models/Correspondant');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/enseignements', async (req, res) => {
    const enseignants = await Enseignant.find()
                                        .populate({
                                            path: 'matieres',
                                            select: 'nom'
                                        })
                                        .populate({
                                            path: 'seances',
                                            populate: [
                                            { path: 'creneau', select: 'heure_debut heure_fin' },
                                            { path: 'salle', select: 'capacite disponibilite' }
                                            ]
                                        });
    console.log('enseignants', enseignants)
    res.render('enseignements', { enseignants });
});

// GET - Formulaire de création enseignant
app.get('/enseignant/ajout', async (req, res) => {
    const matieres = await Matiere.find();
    const seances = await Seance.find().populate('creneau');
    res.render('enseignementForm', { matieres, seances });
});

// POST - Traitement du formulaire
app.post('/enseignant/ajout', async (req, res) => {
    const { prenom, nom, email, matieres, seances } = req.body;
  
    const enseignant = new Enseignant({
      prenom,
      nom,
      email,
      matieres: Array.isArray(matieres) ? matieres : [matieres].filter(Boolean),
      seances: Array.isArray(seances) ? seances : [seances].filter(Boolean)
    });

    console.log('enseignement', enseignant)
  
    try {
      await enseignant.save();
      res.redirect('/enseignements');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur lors de l’enregistrement');
    }
});

// Afficher la liste des classes
app.get('/classes', async (req, res) => {
    const classes = await Classe.find()
                                .populate({ path: 'contenus', populate: { path: 'matiere', select: 'nom' } })
                                .populate('etudiants');
    res.render('classes', { classes });
});
  
  // Formulaire d'ajout de classe
app.get('/classes/ajout', (req, res) => {
    res.render('classeForm');
});
  
  // Enregistrement d'une nouvelle classe
app.post('/classes/ajout', async (req, res) => {
    const { nom_classe } = req.body;

    try {
        const nouvelleClasse = new Classe({ nom_classe });
        await nouvelleClasse.save();
        res.redirect('/classes');
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de l'ajout de la classe");
    }
});

// Liste des absences
app.get('/absences', async (req, res) => {
    const absences = await Absence.find()
      .populate('etudiant', 'prenom email')
      .populate({
        path: 'contenu',
        populate: { path: 'matiere', select: 'nom' }
      });
  
    res.render('absences', { absences });
});
  
  // Formulaire d'ajout
app.get('/absence/ajout', async (req, res) => {
    const etudiants = await Etudiant.find();
    const contenus = await Contenu.find().populate('matiere');
    res.render('absenceForm', { etudiants, contenus });
});
  
  // Enregistrement
app.post('/absence/ajout', async (req, res) => {
    const { etudiant, contenu, justifiee } = req.body;
  
    const absence = new Absence({
      etudiant,
      contenu,
      justifiee: justifiee === 'on'
    });
  
    try {
        const etudiantDetails = await Etudiant.findById(etudiant).populate('correspondant');
        if (!etudiantDetails || !etudiantDetails.correspondant) {
          return res.status(400).send("Aucun correspondant trouvé pour cet étudiant.");
        }

        // Fais la configuration avec mailTrap
    
        const transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: '2525' || '587',
            auth: {
              user: 'bf3f286e25d493',
              pass: 'b9afd031efe062',
            }
        });
    
        // Préparer l'email
        const mailOptions = {
          from: 'bf3f286e25d493',
          to: etudiantDetails.correspondant.email, 
          subject: 'Absence enregistrée pour un étudiant',
          text: `Bonjour,\n\nUn étudiant nommé ${etudiantDetails.prenom} ${etudiantDetails.nom} a été enregistré comme absent.\n\nDétails de l'absence :\n\nContenu : ${contenu}\nAbsence justifiée : ${justifiee === 'on' ? 'Oui' : 'Non'}.`
        };
    
        // Envoyer l'email
        await transporter.sendMail(mailOptions);
    
        await absence.save(); 

        res.redirect('/absences');
    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur lors de l'enregistrement");
    }
});

// Liste des étudiants
app.get('/etudiants', async (req, res) => {
    const etudiants = await Etudiant.find()
      .populate('classe')
      .populate('correspondant')
      .populate({
        path: 'absences',
        populate: {
          path: 'contenu',
          populate: {
            path: 'matiere',
            select: 'nom'
          }
        }
      });
    res.render('etudiants', { etudiants });
});
  
  // Formulaire d’ajout
app.get('/etudiants/ajout', async (req, res) => {
    const classes = await Classe.find();
    const correspondants = await Correspondant.find();
    res.render('etudiantForm', { classes, correspondants });
});
  
  // Enregistrement
app.post('/etudiants/ajout', async (req, res) => {
    const { prenom, date_naissance, email, numero_tel, classe, correspondant } = req.body;
  
    try {
      const etudiant = new Etudiant({
        prenom,
        date_naissance,
        email,
        numero_tel,
        classe,
        correspondant
      });
      await etudiant.save();
      res.redirect('/etudiants');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur lors de l’enregistrement de l’étudiant');
    }
});

// Affichage de la liste des créneaux horaires
app.get('/creneaux', async (req, res) => {
    const creneaux = await CreneauHoraire.find()
    .populate({
      path: 'seances', 
      populate: {
        path: 'salle', 
        select: 'nom capacite' 
      },
      populate: {
        path: 'enseignant',  
        select: 'nom prenom' 
      }
    });
    res.render('creneaux', { creneaux });
});

app.get('/creneaux/ajout', (req, res) => {
    res.render('creneaux/form');
});  

app.post('/creneaux/ajout', async (req, res) => {
    const { heure_debut, heure_fin } = req.body;
  
    try {
      const creneauHoraire = new CreneauHoraire({
        heure_debut,
        heure_fin
      });
      await creneauHoraire.save();
      res.redirect('/creneaux');
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur lors de l’enregistrement du créneau horaire');
    }
});  

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).render('404', { message: 'Page non trouvée' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'Une erreur est survenue sur le serveur' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});