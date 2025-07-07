document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero Section Animations - New Particle System
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor(x, y, size, color, speedX, speedY) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.color = color;
                this.speedX = speedX;
                this.speedY = speedY;
                this.opacity = 1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity -= 0.005; // Fade out slowly

                // Bounce off edges or reappear
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1; // Bounce for now
                 // Or reappear from top/bottom for a continuous flow effect:
                // if (this.y < 0 - this.size || this.opacity <= 0) {
                //    this.y = canvas.height + this.size;
                //    this.x = Math.random() * canvas.width;
                //    this.opacity = 1;
                //    this.speedY = (Math.random() * 1 + 0.5) * -1; // Reset speed
                // }

            }

            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1; // Reset globalAlpha
            }
        }

        function initParticles() {
            particles = [];
            const numberOfParticles = 80; // Slightly more particles for a richer feel with more colors
            const baseColors = [
                'rgba(230,0,18,0.7)',    // Coca-Cola Red
                'rgba(255,255,255,0.3)', // White/Light Grey
                'rgba(200,0,15,0.5)',    // Darker Red
                'rgba(255,215,0,0.6)',   // Gold
                'rgba(255,223,0,0.4)'    // Corrected Lighter Gold / More transparent gold (was 215, now 223 for slightly different shade)
            ];

            for (let i = 0; i < numberOfParticles; i++) {
                const size = Math.random() * 2.5 + 0.5; // Particle size (0.5px to 3px)
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height; // Start particles all over the canvas
                const color = baseColors[Math.floor(Math.random() * baseColors.length)]; // Corrected to use baseColors
                const speedX = (Math.random() - 0.5) * 1; // Horizontal speed and direction
                const speedY = (Math.random() - 0.5) * 1; // Vertical speed and direction (can be upwards or downwards)

                particles.push(new Particle(x, y, size, color, speedX, speedY));
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                // Remove faded particles and add new ones for continuous effect
                if (particles[i].opacity <= 0) {
                    particles.splice(i, 1);
                    i--; // Adjust index after removal

                    // Add a new particle to replace the faded one
                    const size = Math.random() * 3 + 1;
                    const x = Math.random() * canvas.width;
                    // const y = canvas.height + size; // Emerge from bottom
                    const y = Math.random() * canvas.height; // Or appear randomly
                    // Use the same baseColors array for consistency
                    const color = baseColors[Math.floor(Math.random() * baseColors.length)];
                    const speedX = (Math.random() - 0.5) * 0.8;
                    const speedY = (Math.random() * 0.8 + 0.2) * (Math.random() < 0.5 ? 1 : -1); // Random up/down initial direction
                    particles.push(new Particle(x, y, size, color, speedX, speedY));
                }
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    // Interactive Navigation
    // CSS handles hover effects (:hover, ::after). JS can be used for more complex interactions if needed.
    // For example, a "fizzing" effect on click or more elaborate hover animations with GSAP.
    // Currently, CSS handles the visual feedback for navigation.

    // Product Highlights
    // CSS handles hover effects. For rotation/pouring, libraries like Three.js or GSAP would be better.
    // This script will ensure the basic hover effects are smooth.
    // Adding an example of a slight "wiggle" or "pop" on click for product items could be done here.
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('click', () => {
            // Example: Add a temporary class for a click animation
            item.classList.add('product-item-clicked');
            setTimeout(() => {
                item.classList.remove('product-item-clicked');
            }, 300); // Duration of the click animation
        });
    });
    // CSS for .product-item-clicked:
    // .product-item-clicked { transform: translateY(-12px) scale(1.05); /* Slightly more pop */ }


    // Call-to-Action Button Enhancements
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1.05)'; // From hover
        });
        button.addEventListener('mouseleave', () => {
            // Ensure it goes back to hover scale if mouse leaves while pressed
            if (button.style.transform === 'scale(0.95)') {
                 button.style.transform = 'scale(1.05)';
            }
        });
    });


    // Basic mobile menu toggle (if you add a .menu-toggle button in HTML)
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            const isActive = navUl.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            if (isActive) {
                menuToggle.setAttribute('aria-label', 'Close navigation menu');
                menuToggle.textContent = '✕'; // Close icon
            } else {
                menuToggle.setAttribute('aria-label', 'Open navigation menu');
                menuToggle.textContent = '☰'; // Hamburger icon
            }
        });
    }

    // --- Focus management for accessibility ---
    // Ensure keyboard navigation is logical, especially for the mobile menu.
    // When the mobile menu opens, focus should ideally move to the first item in the menu.
    // When it closes, focus should return to the toggle button.
    // This can be complex and might require more advanced focus trapping logic.
    // For now, the ARIA attributes provide a good baseline.

    // --- Scroll Animations ---
    // Basic implementation for .animate-on-scroll elements
    const scrollAnimatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Unobserve after animation to save resources
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove class if you want animation to re-trigger on scroll up
                // entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    scrollAnimatedElements.forEach(el => {
        observer.observe(el);
    });


    // --- Advanced Animation Placeholders ---
    // Storytelling Animations (e.g., Parallax on scroll)
    // The .animate-on-scroll provides a basic fade/slide in.
    // For true parallax or more complex timeline animations, GSAP ScrollTrigger is recommended.

    // Product Rotation/Pouring Animations
    // For product item querySelectorAll('.product-item img')
    // On hover or click, you could use CSS transforms for rotation.
    // For pouring, SVG animations or a library like Lottie would be suitable.

    // Global Community Map
    // Pulsing pins: CSS animations.
    // Expanding to show stories: JS to change size/opacity and display content.

    console.log("Coca-Cola script enhanced. Basic animations and interactions are set up.");
    console.log("CSS handles wave, bubble, hover effects. JS enhances bubbles and CTA interactions.");
    console.log("For complex animations (storytelling, product pouring, map interactions), consider GSAP, Lottie, or Three.js.");
});
