// ajouter-enseignant.js
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

// Connexion à la base
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // mets ton mot de passe MySQL si tu en as un
  database: 'gestion_cours'
});

// Données de l'enseignant à enregistrer
const nom = 'Dona Bakala';
const email = 'bergerdona424@gmail.com';
const mot_de_passe_en_clair = 'don@tello';

// Crypter le mot de passe
bcrypt.hash(mot_de_passe_en_clair, 10, (err, hash) => {
  if (err) throw err;

  // Insérer l'enseignant dans la base
  db.query('INSERT INTO enseignants (nom, email, mot_de_passe) VALUES (?, ?, ?)', 
    [nom, email, hash],
    (err, result) => {
      if (err) throw err;
      console.log('Enseignant ajouté avec succès !');
      db.end(); // Fermer la connexion
    }
  );
});
