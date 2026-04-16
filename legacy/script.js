// INTERACTIVE EFFECTS: AMBER & OAK

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const heroContent = document.querySelector('.hero-content');
    
    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.8rem 0';
            navbar.style.background = 'rgba(13, 13, 13, 0.98)';
            navbar.style.boxShadow = 'var(--shadow-industrial)';
        } else {
            navbar.style.padding = '1.5rem 0';
            navbar.style.background = 'linear-gradient(to bottom, rgba(13,13,13,0.9), transparent)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Modal Logic
    const modal = document.getElementById('reservation-modal');
    const reserveBtns = document.querySelectorAll('a[href="#reservation"], .nav-cta');
    const closeModal = document.querySelector('.close-modal');

    reserveBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Reveal elements on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Track sections for reveal
    const revealElements = document.querySelectorAll('.brew-card, .menu-card, .kitchen-text, .kitchen-visual, .event-item');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'var(--transition-cinematic)';
        observer.observe(el);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#reservation') return; // Handled by modal logic
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
