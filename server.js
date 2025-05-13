// server.js
const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = 3000;

// Autoriser les requêtes CORS
app.use(cors());

// Pour lire les formulaires en POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurer l'accès public aux fichiers (uploads et HTML)
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Configurer le stockage des fichiers envoyés
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Connexion à MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // ton mot de passe MySQL ici si tu en as un
  database: 'gestion_cours'
});

// === ROUTES ===

// 1. Route pour connecter un enseignant
app.post('/api/login', (req, res) => {
  const { email, mot_de_passe } = req.body;
  db.query('SELECT * FROM enseignants WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).send('Erreur serveur');
    if (results.length === 0) return res.status(401).send('Email incorrect');

    const enseignant = results[0];
    bcrypt.compare(mot_de_passe, enseignant.mot_de_passe, (err, valid) => {
      if (!valid) return res.status(401).send('Mot de passe incorrect');
      res.json({ id: enseignant.id, nom: enseignant.nom });
    });
  });
});

// 2. Route pour ajouter un cours (seulement pour enseignant connecté)
app.post('/api/ajouter-cours', upload.single('fichier'), (req, res) => {
    const { titre, code, departement, niveau, enseignant_id, credits, description, prerequis, evaluation } = req.body;
    const fichier = req.file ? req.file.filename : null;

    // 🟢 Récupérer et formater les filières cochées
    let filieres = req.body.filieres;
    if (Array.isArray(filieres)) {
        filieres = filieres.join(', '); // Convertir en texte séparé par virgule
    } else if (typeof filieres === 'string') {
        // Si une seule filière cochée
        filieres = filieres;
    } else {
        filieres = ''; // Aucune filière cochée
    }

    db.query(
        'INSERT INTO cours (titre, code, departement, niveau, enseignant_id, credits, description, prerequis, evaluation, fichier, filieres) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [titre, code, departement, niveau, enseignant_id, credits, description, prerequis, evaluation, fichier, filieres],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erreur lors de l\'ajout du cours');
            }
            res.send('Cours ajouté avec succès');
        }
    );
});



// 3. Route pour récupérer la liste des cours
app.get('/api/cours', (req, res) => {
    db.query(
        `SELECT cours.id, cours.titre, cours.code, cours.departement, cours.niveau, cours.credits, cours.description, cours.prerequis, cours.evaluation, cours.fichier, cours.filieres, enseignants.nom AS enseignant_nom 
         FROM cours 
         JOIN enseignants ON cours.enseignant_id = enseignants.id`,
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erreur lors de la récupération des cours');
            }
            res.json(results);
        }
    );
});

// Route pour inscrire un nouvel enseignant
app.post('/api/register', (req, res) => {
  const { nom, email, mot_de_passe } = req.body;

  // Vérifier si l'email existe déjà
  db.query('SELECT * FROM enseignants WHERE email = ?', [email], (err, results) => {
      if (err) return res.status(500).send('Erreur serveur');
      if (results.length > 0) return res.status(400).send('Email déjà utilisé');

      // Hacher le mot de passe
      bcrypt.hash(mot_de_passe, 10, (err, hash) => {
          if (err) return res.status(500).send('Erreur serveur');

          // Insérer dans la base
          db.query('INSERT INTO enseignants (nom, email, mot_de_passe) VALUES (?, ?, ?)',
              [nom, email, hash],
              (err, result) => {
                  if (err) return res.status(500).send('Erreur serveur');
                  res.send('Inscription réussie ! Connectez-vous.');
              }
          );
      });
  });
});


// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
