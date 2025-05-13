document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nom = document.getElementById('nom').value.trim();
            const email = document.getElementById('email').value.trim();
            const mot_de_passe = document.getElementById('mot_de_passe').value.trim();

            fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nom, email, mot_de_passe })
            })
            .then(response => {
                if (!response.ok) throw new Error('Erreur lors de l\'inscription');
                return response.text();
            })
            .then(data => {
                alert(data);
                registerForm.reset();
                window.location.href = 'ajout-cours.html'; // Rediriger vers login après inscription
            })
            .catch(error => {
                alert(error.message);
            });
        });
    }
});
