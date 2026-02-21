let productCards = document.querySelectorAll('.product-card');
let productCardSpans = document.querySelectorAll('.product-card-img > span');

productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        productCardSpans.forEach(span => span.style.display = 'block');
    });
    card.addEventListener('mouseleave', () => {
        productCardSpans.forEach(span => span.style.display = 'none');
    });
});