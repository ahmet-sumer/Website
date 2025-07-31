// Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active page highlighting
    document.addEventListener('DOMContentLoaded', function() {
        const currentLocation = location.hash || '#hero-section';
        const menuItems = document.querySelectorAll('#navbar li a');
        
        menuItems.forEach(item => {
            if (item.getAttribute('href') === currentLocation) {
                item.classList.add('active');
            }
        });
    });

class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.wordIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if(this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = this.txt + '<span class="cursor"></span>';

        let typeSpeed = 100; // Typing speed

        if(this.isDeleting) {
            typeSpeed /= 2; // Delete faster
        }

        if(!this.isDeleting && this.txt === fullTxt) {
            // Pause at end
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const welcomeText = document.querySelector('.welcome h1');
    if(welcomeText) {
        // Words to cycle through
        const words = ['Welcome', 'Hoş Geldin', 'Bienvenue', 'Willkommen', 'ようこそ'];
        new TypeWriter(welcomeText, words, 2000);
    }
});

// Smooth navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});