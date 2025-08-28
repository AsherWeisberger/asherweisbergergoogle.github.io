// A simple observer for 'reveal' on scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.2 // Trigger when 20% of the element is in view
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Modal functionality (remains the same as it's clean and functional)
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

// The new, core functionality: scroll-driven content reveal
const carInteractiveSection = document.querySelector('.car-interactive-section');
const carImage = document.getElementById('car-image');
const detailPanels = document.querySelectorAll('.detail-panel');

const imageSources = [
    'https://images.unsplash.com/photo-1623916298270-f4b6a5051b66?q=80&w=2670&auto=format&fit=crop', // Default image (Hero)
    'https://images.unsplash.com/photo-1629704771465-950c44152e93?q=80&w=2670&auto=format&fit=crop', // New image for panel 1
    'https://images.unsplash.com/photo-1623062366112-9c972886f44d?q=80&w=2670&auto=format&fit=crop', // New image for panel 2
    'https://images.unsplash.com/photo-1621251347640-f10f274a72d7?q=80&w=2670&auto=format&fit=crop'  // New image for panel 3
];

const sectionHeight = carInteractiveSection.clientHeight;

window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const sectionTop = carInteractiveSection.offsetTop;
    
    // Check if the user is inside the interactive section
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Calculate the progress within the section (0 to 1)
        const progress = (scrollPosition - sectionTop) / sectionHeight;
        
        // Determine which panel should be active based on scroll progress
        let activePanelIndex = -1;
        if (progress < 0.33) {
            activePanelIndex = 0;
        } else if (progress < 0.66) {
            activePanelIndex = 1;
        } else {
            activePanelIndex = 2;
        }

        // Fade in the correct panel and update the image
        detailPanels.forEach((panel, index) => {
            if (index === activePanelIndex) {
                panel.classList.add('active');
                carImage.src = imageSources[index + 1]; // +1 to skip the hero image
            } else {
                panel.classList.remove('active');
            }
        });

    } else {
        // Hide all panels when outside the section
        detailPanels.forEach(panel => panel.classList.remove('active'));
    }
});
