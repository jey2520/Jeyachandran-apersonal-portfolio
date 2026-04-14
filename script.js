// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

    // 0. Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorGlow = document.querySelector('.cursor-glow');

    if (cursorDot && cursorGlow) {
        // Track mouse movement
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Direct update for the dot for instant feel
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Slightly delayed/eased update for the glow
            cursorGlow.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effects for interactive elements
        const iteractives = document.querySelectorAll('a, button, .glass-card, .service-card, .pricing-card, input, textarea');
        
        iteractives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    // 1. Sticky Header Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle 
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '75px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(5, 5, 10, 0.95)';
                navLinks.style.backdropFilter = 'blur(15px)';
                navLinks.style.padding = '30px 0';
                navLinks.style.borderBottom = '1px solid rgba(0,240,255,0.2)';
            }
        });
    }

    // Reset mobile menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.background = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.borderBottom = 'none';
        } else if (navLinks) {
            navLinks.style.display = 'none';
        }
    });

    // 3. Advanced Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.fade-in-up');
    
    const revealOptions = {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't unobserve, let it animate out and in if they scroll!
                // Or unobserve for performance. Let's keep it observed for "amazing" bouncy feel when scrolling up and down.
            } else {
                // Remove class when out of view so it animates again when scrolling back
                entry.target.classList.remove('visible');
            }
        });
    }, revealOptions);
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 4. Form Submission Simulation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Loading state
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Transmitting...';
            btn.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.5)';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                btn.style.background = 'linear-gradient(135deg, #00F0FF, #00FF88)';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.boxShadow = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
