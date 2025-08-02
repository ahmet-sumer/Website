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
// Contact Form Validation and Animation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form form');
    const inputs = document.querySelectorAll('#email, #name, #write-box');
    const submitButton = document.getElementById('submit');

    // Form validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateForm() {
        let isValid = true;

        inputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            const errorMessage = formGroup.querySelector('.error-message');
            
            // Remove previous states
            formGroup.classList.remove('error', 'success');
            errorMessage.classList.remove('show');

            if (!input.value.trim()) {
                formGroup.classList.add('error');
                errorMessage.textContent = `Please enter your ${input.placeholder.toLowerCase()}`;
                errorMessage.classList.add('show');
                isValid = false;
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                formGroup.classList.add('error');
                errorMessage.textContent = 'Please enter a valid email address';
                errorMessage.classList.add('show');
                isValid = false;
            } else {
                formGroup.classList.add('success');
            }
        });

        return isValid;
    }

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const formGroup = this.closest('.form-group');
            const errorMessage = formGroup.querySelector('.error-message');
            
            formGroup.classList.remove('error', 'success');
            errorMessage.classList.remove('show');

            if (!this.value.trim()) {
                formGroup.classList.add('error');
                errorMessage.textContent = `Please enter your ${this.placeholder.toLowerCase()}`;
                errorMessage.classList.add('show');
            } else if (this.type === 'email' && !validateEmail(this.value)) {
                formGroup.classList.add('error');
                errorMessage.textContent = 'Please enter a valid email address';
                errorMessage.classList.add('show');
            } else {
                formGroup.classList.add('success');
            }
        });

        input.addEventListener('focus', function() {
            const formGroup = this.closest('.form-group');
            formGroup.classList.remove('error');
            formGroup.querySelector('.error-message').classList.remove('show');
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Add loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            form.classList.add('loading');

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                const successMessage = document.querySelector('.success-message');
                successMessage.classList.add('show');
                
                // Reset form
                form.reset();
                inputs.forEach(input => {
                    input.closest('.form-group').classList.remove('success');
                });
                
                // Reset button
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
                form.classList.remove('loading');
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
                
            }, 2000);
        }
    });

    // Animate social icons on scroll
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const socialIcons = entry.target.querySelectorAll('#logos li');
                socialIcons.forEach((icon, index) => {
                    setTimeout(() => {
                        icon.style.opacity = '1';
                        icon.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    const socialSection = document.querySelector('.social-section');
    if (socialSection) {
        // Initially hide social icons
        const socialIcons = socialSection.querySelectorAll('#logos li');
        socialIcons.forEach(icon => {
            icon.style.opacity = '0';
            icon.style.transform = 'translateY(30px) scale(0.8)';
            icon.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });

        observer.observe(socialSection);
    }
});
