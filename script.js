// --- Year Updater ---
// Automatically updates the standard copyright year in the footer.
document.getElementById('year').textContent = new Date().getFullYear();

// --- Mobile Navigation ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const getLinks = document.querySelectorAll('.nav-links a');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    const icon = hamburger.querySelector('i');
    if(navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu open on mobile
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when a link is clicked
getLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
});

// --- Active Link Switching on Scroll ---
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Offset for the fixed header height
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    getLinks.forEach(link => {
        link.classList.remove('active-link');
        const href = link.getAttribute('href');
        
        // Highlight active link in navbar
        if (href === `#${current}`) {
            link.classList.add('active-link');
        }
    });
});

// --- Optional: Custom Smooth Scrolling (Works well on all browsers) ---
getLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // Allow normal links like mailto or external links to behave default way
        if (!targetId.startsWith('#')) return;
        
        e.preventDefault();
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// --- Scroll Animations (Intersection Observer) ---
// Animates elements with class .scroll-anim as they come into view
const observeElements = document.querySelectorAll('.scroll-anim');

const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: "0px 0px -50px 0px" // Trigger slightly earlier than the bottom of screen
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Unobserve the element after it animates so it only animates once
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

observeElements.forEach(el => observer.observe(el));
