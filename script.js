// Animation pour faire clignoter le titre "Notre Histoire"
function blinkTitle() {
    const title = document.querySelector('h1');
    setInterval(() => {
        title.style.opacity = (title.style.opacity === '0') ? '1' : '0';
    }, 1000);
}

// Animation pour faire bouger l'image
function moveImage() {
    const image = document.querySelector('.image img');
    image.style.transition = 'transform 2s ease-in-out';
    image.style.transform = 'rotate(360deg)';
}

// Appeler les animations
blinkTitle();
moveImage();
