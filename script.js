// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Reveal on scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Stop observing after the first reveal
            observer.unobserve(entry.target);
        }
    });
}, {
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of the element is in view
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Modal functionality
const rulesLink = document.getElementById('rules-link');
const modal = document.getElementById('rules-modal');
const closeButton = document.querySelector('.close-button');

rulesLink.addEventListener('click', function(e) {
    e.preventDefault();
    modal.style.display = 'flex';
});

closeButton.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
