document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.remove('reveal');
                el.classList.add('reveal-active');
                // Remove the class after the animation so hover
                // transitions on cards behave normally afterwards
                setTimeout(() => el.classList.remove('reveal-active'), 900);
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    // Apply reveal to sections and specific elements
    const revealElements = document.querySelectorAll('.section-head, .section-subtitle, .about-text, .about-meta, .skill-group, .project-card, .workshop-item, .achievement-card, .timeline-item, .build-card, .currently-item, .contact-info, .contact-form');

    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Add CSS for the reveal effect dynamically
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(24px);
        }

        .reveal,
        .reveal-active {
            transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                        transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Stagger delays for grids */
        .skills-grid .reveal-active:nth-child(2) { transition-delay: 0.08s; }
        .skills-grid .reveal-active:nth-child(3) { transition-delay: 0.16s; }
        .skills-grid .reveal-active:nth-child(4) { transition-delay: 0.24s; }
        .skills-grid .reveal-active:nth-child(5) { transition-delay: 0.32s; }

        .featured-list .reveal-active:nth-child(2) { transition-delay: 0.08s; }
        .featured-list .reveal-active:nth-child(3) { transition-delay: 0.16s; }
        .featured-list .reveal-active:nth-child(4) { transition-delay: 0.24s; }

        .projects-grid .reveal-active:nth-child(2) { transition-delay: 0.08s; }
        .projects-grid .reveal-active:nth-child(3) { transition-delay: 0.16s; }

        .build-grid .reveal-active:nth-child(2) { transition-delay: 0.08s; }
        .build-grid .reveal-active:nth-child(3) { transition-delay: 0.16s; }
        .build-grid .reveal-active:nth-child(4) { transition-delay: 0.24s; }
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
        const setMenu = (open) => {
            menuBtn.classList.toggle('open', open);
            navLinks.classList.toggle('open', open);
            menuBtn.setAttribute('aria-expanded', open);
            menuOpen = open;
        };

        menuBtn.addEventListener('click', () => setMenu(!menuOpen));

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setMenu(false));
        });
    }

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
