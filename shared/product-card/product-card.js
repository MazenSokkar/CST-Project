let productCards = document.querySelectorAll('.product-card');
let productCardSpans = document.querySelectorAll('.product-card-img > span');

productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.children[0].children[2].src = `assets/images/${getRandomInt(1, 6)}.png`;
        productCardSpans.forEach(span => span.style.display = 'block');
    });
    card.addEventListener('mouseleave', () => {
        card.children[0].children[2].src = `assets/images/${getRandomInt(1, 6)}.png`;
        productCardSpans.forEach(span => span.style.display = 'none');
    });
});

// helpers
//get random number between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}