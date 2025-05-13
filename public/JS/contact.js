document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    emailjs.sendForm('service_4kpd959', 'template_chw32hu', this)
      .then(function () {
        showNotification("Message envoyé avec succès !", "success");
        document.getElementById('contact-form').reset(); // Vider le formulaire
      }, function (error) {
        showNotification("Erreur lors de l'envoi : " + error.text, "error");
      });
  });

  function showNotification(message, type) {
    const notif = document.createElement('div');
    notif.className = `custom-alert ${type}`;
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 4000);
  }