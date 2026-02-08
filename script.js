document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Apply reveal to sections and specific elements
    const revealElements = document.querySelectorAll('.section-title, .about-text, .stat-card, .skill-category, .project-card, .workshop-item, .achievement-card, .contact-info, .contact-form');

    // Add reveal class to all elements initially
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Add CSS for the reveal effect dynamically
    const style = document.createElement('style');
    style.textContent = `
        .reveal-active {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        /* Stagger delays for grids */
        .skills-grid .skill-category:nth-child(2) { transition-delay: 0.1s; }
        .skills-grid .skill-category:nth-child(3) { transition-delay: 0.2s; }
        .skills-grid .skill-category:nth-child(4) { transition-delay: 0.3s; }
        
        .projects-grid .project-card:nth-child(2) { transition-delay: 0.1s; }
        .projects-grid .project-card:nth-child(3) { transition-delay: 0.2s; }
    `;
    document.head.appendChild(style);

    // 4. Update Footer Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // 5. Contact Form Submission (Functional)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;

            // Get form data
            const formData = new FormData(contactForm);

            btn.disabled = true;
            btn.textContent = 'Sending...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    btn.textContent = 'Message Sent! ✨';
                    contactForm.reset();
                } else {
                    btn.textContent = 'Oops! Error';
                }
            } catch (error) {
                btn.textContent = 'Connection Error';
            }

            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = originalText;
            }, 3000);
        });
    }

    // 6. Mobile Menu Logic
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            if (!menuOpen) {
                menuBtn.classList.add('open');
                navLinks.classList.add('open');
                menuOpen = true;
            } else {
                menuBtn.classList.remove('open');
                navLinks.classList.remove('open');
                menuOpen = false;
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('open');
                navLinks.classList.remove('open');
                menuOpen = false;
            });
        });
    }

    // 7. Hero Badge dynamic text
    const badge = document.getElementById('hero-badge');
    const badges = [
        'Available for ambitious projects',
        'Top 10 Finalist @ IIT Hyderabad',
        'Best UI Design Award Winner',
        'Salesforce Agentblazer Legend'
    ];
    let badgeIndex = 0;

    setInterval(() => {
        badge.style.opacity = '0';
        setTimeout(() => {
            badgeIndex = (badgeIndex + 1) % badges.length;
            badge.textContent = badges[badgeIndex];
            badge.style.opacity = '1';
        }, 500);
    }, 4000);

    badge.style.transition = 'opacity 0.5s ease';

    // 8. Back to Top Logic
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
