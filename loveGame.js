document.addEventListener('DOMContentLoaded', function() {
    const loveGameForm = document.getElementById('loveGameForm');
    const gameResult = document.getElementById('gameResult');

    let chaydathAppeared = false; // Variable pour suivre si "Chaydath" a déjà été généré

    loveGameForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const age = parseInt(document.getElementById('age').value);
        const girlNameInput = document.getElementById('girlName'); // Ajout de l'élément pour obtenir le nom de la fille
        const boyNameInput = document.getElementById('boyName'); // Ajout de l'élément pour obtenir le nom du garçon

        const girlName = girlNameInput.value; // Récupère le nom de la fille entré par l'utilisateur
        const boyName = boyNameInput.value; // Récupère le nom du garçon entré par l'utilisateur

        const numChildren = Math.floor(Math.random() * 5) + 1;
        const children = [];

        // Génère les données pour chaque enfant
        for (let i = 0; i < numChildren; i++) {
            const childName = generateChildName();
            const childAge = Math.floor(Math.random() * 17) + 12; // Âge entre 12 et 28
            children.push({ name: childName, age: childAge });
        }

        // Trie les enfants par âge
        children.sort((a, b) => a.age - b.age);

        // Crée le message formaté pour le site
        let siteMessage = `Félicitations, ${girlName} et ${boyName} ! Vous aurez ${numChildren} enfant(s). L'âge de vos enfants à 50 ans sera compris entre ${age - 5} et ${age + 5}.`;

        siteMessage += `<br><button id="continueButton" class="btn btn-primary">Voulez-vous continuer ?</button>`;

        gameResult.innerHTML = siteMessage;

        const continueButton = document.getElementById('continueButton');
        continueButton.addEventListener('click', function() {
            // Affiche les informations sur les enfants triés par âge
            siteMessage = `À 50 ans vous aurez ${numChildren} enfant(s) :<ul>`;
            children.forEach(child => {
                siteMessage += `<li>${child.name} : ${child.age} ans</li>`;
            });
            siteMessage += `</ul>`;

            // Ajoute le bouton de partage
            siteMessage += `<i class="fas fa-share-alt" id="shareIcon" style="cursor: pointer;">Partager sur whatsapp</i>`;

            gameResult.innerHTML = siteMessage;

        // Écoutez le clic sur l'icône de partage pour effectuer le partage
        const shareIcon = document.getElementById('shareIcon');
        shareIcon.addEventListener('click', function() {
            // Partage le message formaté sur WhatsApp
            const whatsappMessage = generateWhatsAppMessage(children, girlName, boyName);
            
            // Vérifiez d'abord si la fonction de partage est prise en charge par le navigateur
            if (navigator.share) {
                navigator.share({
                    title: 'Prédiction de famille',
                    text: whatsappMessage
                }).then(() => {
                    console.log('Partagé avec succès');
                }).catch((error) => {
                    console.error('Échec du partage', error);
                });
            } else {
                console.log("L'API de partage n'est pas prise en charge par ce navigateur.");

                // Si l'API de partage n'est pas prise en charge, vous pouvez proposer un lien de partage WhatsApp
                const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
                window.open(whatsappLink, '_blank');
            }
        });

        });

        // Réinitialise la variable chaydathAppeared pour le prochain jeu
        chaydathAppeared = false;
    });

    // Fonction pour générer le nom des enfants avec plus de chances pour "Chaydath" et des prénoms musulmans
    function generateChildName() {
        const names = ["Chaydath", "Eliott", "Léo", "Noah", "Louis", "Gabriel", "Arthur", "Léa", "Emma", "Chloé", "Inès", "Jade", "Louise", "Amina", "Omar", "Hassan", "Layla", "Youssef", "Zahra", "Amina", "Jamal", "Leïla", "Karim", "Hakim", "Sami", "Malik", "Farid", "Aïsha", "Zakariya", "Soraya", "Amin", "Sofia", "Tariq", "Samira", "Hamza", "Fadila"];
        if (!chaydathAppeared && Math.random() < 0.7) {
            chaydathAppeared = true;
            return "Chaydath";
        } else {
            return names[Math.floor(Math.random() * names.length)];
        }
    }

    // Fonction pour générer un message WhatsApp avec les noms et âges des enfants
    function generateWhatsAppMessage(children, girlName, boyName) {
        let whatsappMessage = `🎉 *Félicitations* à *Mr ${boyName}* et *Mme ${girlName}* ! 👩‍❤️‍👨\n`;
        whatsappMessage += `🍼 *Vous serez bientôt les heureux parents de ${children.length} adorables petits anges.* 👨‍👩‍👧‍👦\n`;
        whatsappMessage += `*Voici les noms de vos futurs trésors* :`;

        // Crée une liste de noms et d'âges des enfants pour WhatsApp
        whatsappMessage += `\n`;
        children.forEach(child => {
            whatsappMessage += `\n👶 ${child.name} : *${child.age} ans* 🍭`;
        });

        return whatsappMessage;
    }
});
