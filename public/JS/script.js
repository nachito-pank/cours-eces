/*
 * script.js - Fichier JavaScript principal pour le site web de l'Université XYZ
 * Ce fichier contient toutes les fonctionnalités interactives du site.
 */

// Attendre que le document HTML soit complètement chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function () {
    console.log('Le document est chargé et prêt !');

    // Initialiser toutes les fonctionnalités
    initClassesPage();
    initCoursesPage();
    initAddCourseForm();
});

// ===== FONCTIONNALITÉS DE LA PAGE CLASSES =====

/**
 * Initialise les fonctionnalités de la page des classes
 */
function initClassesPage() {
    // Vérifier si nous sommes sur la page des classes
    if (!document.querySelector('.classes-list')) {
        return; // Sortir de la fonction si nous ne sommes pas sur la page des classes
    }

    console.log('Initialisation de la page des classes...');

    // Données simulées des cours pour chaque classe
    // Dans une application réelle, ces données viendraient d'une base de données
    const coursesData = {
        'L1-info': [
            { code: 'INFO101', title: 'Introduction à la Programmation', teacher: 'Dr. Martin Dupont', credits: 6 },
            { code: 'INFO102', title: 'Algorithmique', teacher: 'Prof. Sophie Lefebvre', credits: 6 },
            { code: 'MATH101', title: 'Mathématiques Discrètes', teacher: 'Dr. Claire Dubois', credits: 6 },
            { code: 'INFO103', title: 'Architecture des Ordinateurs', teacher: 'Prof. Thomas Bernard', credits: 4 }
        ],
        'L2-info': [
            { code: 'INFO201', title: 'Programmation Orientée Objet', teacher: 'Prof. Jean Moreau', credits: 6 },
            { code: 'INFO202', title: 'Structures de Données Avancées', teacher: 'Dr. Sophie Lefebvre', credits: 6 },
            { code: 'INFO203', title: 'Réseaux Informatiques', teacher: 'Prof. Marc Leroy', credits: 4 },
            { code: 'INFO204', title: 'Systèmes d\'Exploitation', teacher: 'Dr. Émilie Rousseau', credits: 4 }
        ],
        'L3-info': [
            { code: 'INFO301', title: 'Bases de Données', teacher: 'Dr. Émilie Rousseau', credits: 6 },
            { code: 'INFO302', title: 'Développement Web', teacher: 'Prof. Jean Moreau', credits: 6 },
            { code: 'INFO303', title: 'Intelligence Artificielle', teacher: 'Dr. Marie Lambert', credits: 4 },
            { code: 'INFO304', title: 'Génie Logiciel', teacher: 'Prof. Thomas Bernard', credits: 4 }
        ],
        'L1-math': [
            { code: 'MATH101', title: 'Analyse Mathématique', teacher: 'Dr. Claire Dubois', credits: 6 },
            { code: 'MATH102', title: 'Algèbre', teacher: 'Prof. Philippe Martin', credits: 6 },
            { code: 'MATH103', title: 'Géométrie', teacher: 'Dr. Julien Petit', credits: 4 },
            { code: 'INFO101', title: 'Introduction à la Programmation', teacher: 'Dr. Martin Dupont', credits: 4 }
        ],
        'L2-math': [
            { code: 'MATH201', title: 'Algèbre Linéaire', teacher: 'Prof. Philippe Martin', credits: 6 },
            { code: 'MATH202', title: 'Analyse Complexe', teacher: 'Dr. Claire Dubois', credits: 6 },
            { code: 'MATH203', title: 'Probabilités', teacher: 'Prof. Julien Petit', credits: 4 },
            { code: 'MATH204', title: 'Statistiques', teacher: 'Dr. Marie Lambert', credits: 4 }
        ],
        'M1-ia': [
            { code: 'IA101', title: 'Apprentissage Automatique', teacher: 'Prof. Marie Lambert', credits: 6 },
            { code: 'IA102', title: 'Traitement du Langage Naturel', teacher: 'Dr. Thomas Bernard', credits: 6 },
            { code: 'IA103', title: 'Vision par Ordinateur', teacher: 'Prof. Jean Moreau', credits: 4 },
            { code: 'IA104', title: 'Éthique de l\'IA', teacher: 'Dr. Sophie Lefebvre', credits: 4 }
        ]
    };

    // Sélectionner tous les boutons "Voir les cours"
    const viewCoursesButtons = document.querySelectorAll('.view-courses');

    // Ajouter un écouteur d'événement à chaque bouton
    viewCoursesButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Récupérer l'identifiant de la classe depuis l'attribut data-id du parent
            const classId = this.closest('.class-card').dataset.id;

            // Récupérer les cours de cette classe
            const courses = coursesData[classId] || [];

            // Afficher les cours
            displayClassCourses(classId, courses);
        });
    });
}

/**
 * Affiche les cours d'une classe spécifique
 * @param {string} classId - L'identifiant de la classe
 * @param {Array} courses - Les cours à afficher
 */
function displayClassCourses(classId, courses) {
    console.log(`Affichage des cours pour la classe ${classId}`);

    // Sélectionner la section des cours de classe
    const classCoursesSection = document.getElementById('class-courses');
    const coursesContainer = classCoursesSection.querySelector('.courses-container');

    // Récupérer le titre de la classe
    const classTitle = document.querySelector(`.class-card[data-id="${classId}"] h3`).textContent;

    // Mettre à jour le titre de la section
    classCoursesSection.querySelector('h3').textContent = `Cours de ${classTitle}`;

    // Vider le conteneur des cours
    coursesContainer.innerHTML = '';

    // Si aucun cours n'est disponible
    if (courses.length === 0) {
        coursesContainer.innerHTML = '<p>Aucun cours disponible pour cette classe.</p>';
    } else {
        // Créer un élément pour chaque cours
        courses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = 'course-item';
            courseElement.innerHTML = `
                <h4>${course.code} - ${course.title}</h4>
                <p><strong>Enseignant :</strong> ${course.teacher}</p>
                <p><strong>Crédits :</strong> ${course.credits} ECTS</p>
            `;
            coursesContainer.appendChild(courseElement);
        });
    }

    // Afficher la section des cours
    classCoursesSection.style.display = 'block';

    // Faire défiler jusqu'à la section des cours
    classCoursesSection.scrollIntoView({ behavior: 'smooth' });
}

// ===== FONCTIONNALITÉS DE LA PAGE COURS =====

/**
 * Initialise les fonctionnalités de la page des cours (affichage et filtrage)
 */
document.addEventListener('DOMContentLoaded', function () {
    const coursesList = document.querySelector('.courses-list');
    const filterFiliere = document.getElementById('filter-filiere');
    const searchBar = document.getElementById('search-bar');
    const filterNiveau = document.getElementById('filter-niveau');
    const resetFilter = document.getElementById('reset-filter');

    let allCourses = []; // On stocke tous les cours ici après chargement

    filterFiliere.addEventListener('change', filterCourses);
    filterNiveau.addEventListener('change', filterCourses);
    searchBar.addEventListener('input', filterCourses);
    resetFilter.addEventListener('click', function () {
        filterFiliere.value = '';
        filterNiveau.value = '';
        searchBar.value = '';
        displayCourses(allCourses);
    });


    // Charger tous les cours depuis l'API
    function loadCourses() {
        fetch('http://localhost:3000/api/cours')
            .then(response => response.json())
            .then(courses => {
                allCourses = courses;
                displayCourses(allCourses);
            })
            .catch(error => console.error('Erreur chargement cours :', error));
    }

    // Afficher une liste de cours
    function displayCourses(courses) {
        coursesList.innerHTML = '';
        if (courses.length === 0) {
            coursesList.innerHTML = '<p>Aucun cours trouvé.</p>';
            return;
        }

        courses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'course-card';
            card.innerHTML = `
                <h3>${course.titre}</h3>
                <p><strong>Code :</strong> ${course.code}</p>
                <p><strong>Département :</strong> ${course.departement}</p>
                <p><strong>Niveau :</strong> ${course.niveau}</p>
                <p><strong>Filières concernées :</strong> ${course.filieres}</p>
                <p><strong>Enseignant :</strong> ${course.enseignant_nom}</p>
                <p><strong>Crédits :</strong> ${course.credits} ECTS</p>
                <p><strong>Description :</strong> ${course.description}</p>
                <p><strong>Prérequis :</strong> ${course.prerequis || 'Aucun'}</p>
                <p><strong>Évaluation :</strong> ${course.evaluation}</p>
                ${course.fichier ? `<a href="/uploads/${course.fichier}" class="btn" download>Télécharger le PDF</a>` : ''}
            `;
            coursesList.appendChild(card);
        });
    }



    // Filtrer les cours
    function filterCourses() {
        const filiereValue = filterFiliere.value.toLowerCase();
        const niveauValue = filterNiveau.value;
        const searchValue = searchBar.value.toLowerCase();

        const filtered = allCourses.filter(course => {
            const matchFiliere = filiereValue === '' || course.filieres.toLowerCase().includes(filiereValue);
            const matchNiveau = niveauValue === '' || course.niveau === niveauValue;
            const matchSearch = course.titre.toLowerCase().includes(searchValue) || course.filieres.toLowerCase().includes(searchValue);
            return matchFiliere && matchNiveau && matchSearch;
        });

        displayCourses(filtered);
        updateFilterSummary(filtered);
    }

    function updateFilterSummary(filteredCourses) {
        const filiereValue = filterFiliere.value;
        const niveauValue = filterNiveau.value;

        let message = '';

        if (filiereValue && niveauValue) {
            message = `${filteredCourses.length} cours trouvés pour ${filiereValue} (${niveauValue})`;
        } else if (filiereValue) {
            message = `${filteredCourses.length} cours trouvés pour ${filiereValue}`;
        } else if (niveauValue) {
            message = `${filteredCourses.length} cours trouvés pour niveau ${niveauValue}`;
        } else {
            message = `${filteredCourses.length} cours disponibles`;
        }

        document.getElementById('filter-summary').textContent = message;
    }



    // Événements sur les filtres
    filterFiliere.addEventListener('change', filterCourses);
    filterNiveau.addEventListener('change', filterCourses);
    resetFilter.addEventListener('click', function () {
        filterFiliere.value = '';
        filterNiveau.value = '';
        displayCourses(allCourses);
        updateFilterSummary(allCourses);
    });
    // Charger les cours au démarrage
    loadCourses();
});


// ===== FONCTIONNALITÉS DU FORMULAIRE D'AJOUT DE COURS =====
function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.textContent = message;

    container.appendChild(notif);

    // Supprimer après 3 secondes
    setTimeout(() => {
        notif.remove();
    }, 6000);
}


/**
 * Initialise les fonctionnalités du formulaire d'ajout de cours
 */
function initAddCourseForm() {
    // Vérifier si nous sommes sur la page d'ajout de cours
    if (!document.getElementById('add-course-form')) {
        return; // Sortir de la fonction si nous ne sommes pas sur la page d'ajout de cours
    }

    console.log('Initialisation du formulaire d\'ajout de cours...');

    // Sélectionner le formulaire
    const form = document.getElementById('add-course-form');

    // Ajouter un écouteur d'événement pour la soumission du formulaire
    form.addEventListener('submit', function (event) {
        // Empêcher la soumission normale du formulaire
        event.preventDefault();

        // Valider le formulaire
        if (validateForm()) {
            // Si le formulaire est valide, simuler l'ajout du cours
            addCourse();
        }
    });

    // Ajouter un écouteur d'événement pour le bouton "Ajouter un autre cours"
    const addAnotherButton = document.getElementById('add-another');
    if (addAnotherButton) {
        addAnotherButton.addEventListener('click', function () {
            // Réinitialiser le formulaire
            form.reset();

            // Masquer la section de résultat
            document.getElementById('submission-result').style.display = 'none';

            // Faire défiler jusqu'au formulaire
            form.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

/**
 * Valide le formulaire d'ajout de cours
 * @returns {boolean} - True si le formulaire est valide, false sinon
 */
function validateForm() {
    console.log('Validation du formulaire...');

    // Réinitialiser tous les messages d'erreur
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => {
        message.style.display = 'none';
    });

    // Récupérer les valeurs des champs
    const title = document.getElementById('course-title').value.trim();
    const code = document.getElementById('course-code').value.trim();
    const department = document.getElementById('course-department').value;
    const level = document.getElementById('course-level').value;
    const teacher = document.getElementById('course-teacher').value.trim();
    const credits = document.getElementById('course-credits').value;
    const description = document.getElementById('course-description').value.trim();
    const evaluation = document.getElementById('course-evaluation').value.trim();
    // Récupérer les filières cochées (en tableau de valeurs)
    const checkedFilieres = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
    let filieres = Array.from(checkedFilieres).map(cb => cb.value);


    // Vérifier si les champs obligatoires sont remplis
    let isValid = true;

    // Vérifier le titre
    if (title === '') {
        document.getElementById('title-error').textContent = 'Le titre du cours est obligatoire.';
        document.getElementById('title-error').style.display = 'block';
        isValid = false;
    }

    // Vérifier le code
    if (code === '') {
        document.getElementById('code-error').textContent = 'Le code du cours est obligatoire.';
        document.getElementById('code-error').style.display = 'block';
        isValid = false;
    } else if (!/^[A-Z]{3,4}[0-9]{2,3}$/.test(code)) {
        document.getElementById('code-error').textContent = 'Le code doit être au format DEPT123 (ex: INFO101).';
        document.getElementById('code-error').style.display = 'block';
        isValid = false;
    }

    // Vérifier le département
    if (department === '') {
        document.getElementById('department-error').textContent = 'Veuillez sélectionner un département.';
        document.getElementById('department-error').style.display = 'block';
        isValid = false;
    }

    // Vérifier le niveau
    if (level === '') {
        document.getElementById('level-error').textContent = 'Veuillez sélectionner un niveau.';
        document.getElementById('level-error').style.display = 'block';
        isValid = false;
    }

    // Vérifier l'enseignant
    if (teacher === '') {
        document.getElementById('teacher-error').textContent = 'Le nom de l\'enseignant est obligatoire.';
        document.getElementById('teacher-error').style.display = 'block';
        isValid = false;
    }

    // Vérifier les crédits
    if (credits === '' || isNaN(credits) || credits < 1 || credits > 30) {
        document.getElementById('credits-error').textContent = 'Les crédits doivent être un nombre entre 1 et 30.';
        document.getElementById('credits-error').style.display = 'block';
        isValid = false;
    }

    // Vérifier la description
    if (description === '') {
        document.getElementById('description-error').textContent = 'La description du cours est obligatoire.';
        document.getElementById('description-error').style.display = 'block';
        isValid = false;
    }

    // Vérifier l'évaluation
    if (evaluation === '') {
        document.getElementById('evaluation-error').textContent = 'Les méthodes d\'évaluation sont obligatoires.';
        document.getElementById('evaluation-error').style.display = 'block';
        isValid = false;
    }

    return isValid;
}

/**
 * Simule l'ajout d'un cours (sans base de données)
 */
function addCourse() {
    console.log('Ajout du cours...');

    // Récupérer les valeurs des champs
    const title = document.getElementById('course-title').value.trim();
    const code = document.getElementById('course-code').value.trim();
    const department = document.getElementById('course-department').value;
    const departmentText = document.getElementById('course-department').options[document.getElementById('course-department').selectedIndex].text;
    const level = document.getElementById('course-level').value;
    const teacher = document.getElementById('course-teacher').value.trim();
    const credits = document.getElementById('course-credits').value;
    const description = document.getElementById('course-description').value.trim();
    const prerequisites = document.getElementById('course-prerequisites').value.trim() || 'Aucun';
    const evaluation = document.getElementById('course-evaluation').value.trim();

    // Créer l'aperçu du cours
    const coursePreview = document.querySelector('.course-preview');
    coursePreview.innerHTML = `
        <h4>${code} - ${title}</h4>
        <p><strong>Département :</strong> ${department}</p>
        <p><strong>Niveau :</strong> ${level}</p>
        <p><strong>Enseignant :</strong> ${teacher}</p>
        <p><strong>Crédits :</strong> ${credits} ECTS</p>
        <p><strong>Filières concernées :</strong> ${departmentText}</p>
        <p><strong>Description :</strong> ${description}</p>
        <p><strong>Prérequis :</strong> ${prerequisites}</p>
        <p><strong>Évaluation :</strong> ${evaluation}</p>
    `;

    // Afficher la section de résultat
    document.getElementById('submission-result').style.display = 'block';

    // Faire défiler jusqu'à la section de résultat
    document.getElementById('submission-result').scrollIntoView({ behavior: 'smooth' });
}


// script pour la page de connexion

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const addCourseSection = document.getElementById('add-course-section');
    const teacherInput = document.getElementById('course-teacher');
    const hiddenTeacherId = document.createElement('input');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = document.getElementById('email').value.trim();
            const mot_de_passe = document.getElementById('mot_de_passe').value.trim();

            fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, mot_de_passe })
            })
                .then(response => {
                    if (!response.ok) throw new Error('Échec de la connexion, veuillez vérifier vos identifiants et/ou mot de.');
                    return response.json();
                })
                .then(data => {
                    showNotification('Bienvenue ' + data.nom, 'success');

                    // Cache la section login
                    loginSection.style.display = 'none';
                    // Montre la section ajout de cours
                    addCourseSection.style.display = 'block';

                    // Remplit automatiquement le champ enseignant
                    const teacherInput = document.getElementById('course-teacher');
                    teacherInput.value = data.nom;
                    teacherInput.readOnly = true; // lecture seule

                    // Créer et ajouter un champ caché pour l'ID
                    let hiddenTeacherId = document.createElement('input');
                    hiddenTeacherId.type = 'hidden';
                    hiddenTeacherId.name = 'enseignant_id'; // C'EST TRES IMPORTANT
                    hiddenTeacherId.value = data.id; // l'ID numérique
                    document.getElementById('add-course-form').appendChild(hiddenTeacherId);
                })

                .catch(error => {
                    showNotification(error.message, 'error');
                });
        });
    }
});


// soumission du formulaire d'ajout de cours

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('add-course-form');
    const toggleButton = document.getElementById('toggle-filters');

    if (toggleButton) {
        toggleButton.addEventListener('click', function () {
            const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);

            checkboxes.forEach(cb => cb.checked = !allChecked);
            toggleButton.textContent = !allChecked ? 'Tout décocher' : 'Tout cocher';
        });
    }

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            // 🟢 Récupérer les filières cochées
            const checkedFilieres = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
            const formData = new FormData(form);
            // Vérifier si au moins une filière est cochée
            if (checkedFilieres.length === 0) {
                event.preventDefault();
                showNotification('Veuillez cocher au moins une filière concernée par ce cours.', 'error');
                return;
            }

            fetch('http://localhost:3000/api/ajouter-cours', {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (!response.ok) throw new Error('Erreur lors de l\'ajout du cours');
                    return response.text();
                })
                .then(data => {
                    showNotification(data, 'success');  // ✅ Remplace alert(data)
                    form.reset();
                })
                .catch(error => {
                    showNotification(error.message, 'error');  // ✅ Remplace alert(error.message)
                });

        });
    }
});

// telecharger le fichier du cours

document.addEventListener('DOMContentLoaded', function () {
    const coursesList = document.querySelector('.courses-list');

    if (coursesList) {
        fetch('http://localhost:3000/api/cours')
            .then(response => response.json())
            .then(courses => {
                coursesList.innerHTML = ''; // Vider la liste actuelle

                courses.forEach(course => {
                    const card = document.createElement('div');
                    card.className = 'course-card';
                    card.innerHTML = `
                    <h3>${course.titre}</h3>
                    <p><strong>Code :</strong> ${course.code}</p>
                    <p><strong>Département :</strong> ${course.departement}</p>
                    <p><strong>Niveau :</strong> ${course.niveau}</p>
                    <p><strong>Filières concernées :</strong> ${course.filieres}</p>
                    <p><strong>Enseignant :</strong> ${course.enseignant_nom}</p>
                    <p><strong>Crédits :</strong> ${course.credits} ECTS</p>
                    <p><strong>Description :</strong> ${course.description}</p>
                    <p><strong>Prérequis :</strong> ${course.prerequis || 'Aucun'}</p>
                    <p><strong>Évaluation :</strong> ${course.evaluation}</p>
                    ${course.fichier ? `<a href="/uploads/${course.fichier}" class="btn" download>Télécharger le cours PDF</a>` : ''}
                `;
                    coursesList.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Erreur chargement cours :', error);
            });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const navToggler = document.querySelector(".nav-toggler"); // Bouton menu
    const navbar = document.querySelector(".links-container"); // Navbar

    navToggler.addEventListener("click", function () {
        navbar.classList.toggle("active"); // Afficher/cacher la navbar
    });

    // Cacher la navbar si on clique ailleurs
    document.addEventListener("click", function (event) {
        if (!navToggler.contains(event.target) && !navbar.contains(event.target)) {
            navbar.classList.remove("active");
        }
    });

});

// script pour le Dark MOde
const darkModeCheckbox = document.getElementById('toggle-darkmode');

darkModeCheckbox.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');

    // Sauvegarder l'état dans le navigateur (optionnel mais pro)
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
});

// Charger l'état au démarrage
if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeCheckbox.checked = true;
}


// script pour le bouton "Haut de page"
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Loader de la page
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(reg => console.log('Service Worker enregistré'))
        .catch(err => console.error('Erreur SW', err));
}


// Initialiser AOS (Animate On Scroll)
AOS.init();