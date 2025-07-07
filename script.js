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

    // Hero Section Animations
    // Wave animation is handled by CSS keyframes (.coke-wave and @keyframes waveScroll in style.css)
    // Bubbles Animation
    const bubblesContainer = document.querySelector('#hero .bubbles');
    if (bubblesContainer) {
        const numberOfBubbles = 30; // Reduced for performance, adjust as needed
        for (let i = 0; i < numberOfBubbles; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');

            const size = Math.random() * 15 + 5; // Bubbles between 5px and 20px
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;

            bubble.style.left = `${Math.random() * 100}%`;

            // Animation duration between 5s and 12s
            const duration = Math.random() * 7 + 5;
            bubble.style.animationDuration = `${duration}s`;

            // Animation delay up to 5s
            const delay = Math.random() * 5;
            bubble.style.animationDelay = `${delay}s`;

            bubblesContainer.appendChild(bubble);
        }
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

    // --- Advanced Animation Placeholders ---
    // Storytelling Animations (e.g., Parallax on scroll)
    // This would require a scroll event listener and updating element positions/opacity.
    // Example (very basic, recommend GSAP ScrollTrigger for production):
    /*
    window.addEventListener('scroll', () => {
        const historySection = document.querySelector('#history');
        if (historySection) {
            const sectionTop = historySection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.75) {
                // Start animation for elements within #history
            }
        }
    });
    */

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
