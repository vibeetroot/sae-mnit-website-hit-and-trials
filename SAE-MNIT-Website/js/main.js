"// ===========================
// SMOOTH PAGE TRANSITIONS
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Fade in on page load
    setTimeout(() => {
        const transition = document.querySelector('.page-transition');
        if (transition) {
            transition.classList.remove('active');
        }
    }, 100);

    // Handle all navigation links
    const navLinks = document.querySelectorAll('a[href]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only handle external page transitions (not hash links)
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                e.preventDefault();
                const transition = document.querySelector('.page-transition');
                
                if (transition) {
                    transition.classList.add('active');
                    setTimeout(() => {
                        window.location.href = href;
                    }, 500);
                } else {
                    window.location.href = href;
                }
            }
        });
    });

    // Smooth scroll for hash links
    document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
});

// ===========================
// HEADER SCROLL EFFECT
// ===========================
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===========================
// MOBILE NAV TOGGLE
// ===========================
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Close nav when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}

// ===========================
// FLOATING PARTICLE SYSTEM
// ===========================
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const particles = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((particle, i) => {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particle.x - particles[j].x;
                const dy = particle.y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(0, 217, 255, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

// ===========================
// SCROLL REVEAL ANIMATIONS
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll('.vision-card, .team-card, .stat-card, .member-card, .achievement-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// ===========================
// GEAR ROTATION ON SCROLL
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const gears = document.querySelectorAll('.logo-gear, .footer-gear');
    
    gears.forEach(gear => {
        gear.style.transform = `rotate(${scrolled * 0.2}deg)`;
    });
});

// ===========================
// PROJECTS SLIDER
// ===========================
const sliderWrapper = document.querySelector('.slider-wrapper');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (sliderWrapper && prevBtn && nextBtn) {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.project-slide');
    const totalSlides = slides.length;

    function updateSlider() {
        const offset = -currentSlide * 100;
        sliderWrapper.style.transform = `translateX(${offset}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    // Auto-slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000);
}

// ===========================
// CONTACT FORM HANDLING
// ===========================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple form validation and feedback
        const formData = new FormData(contactForm);
        
        // Show success message (you can customize this)
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// ===========================
// TYPING EFFECT FOR HERO TAGLINE
// ===========================
const typedText = document.getElementById('typed-text');
if (typedText) {
    const text = 'Design. Build. Race.';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typedText.textContent = text.substring(0, index + 1);
            index++;
            setTimeout(type, 100);
        }
    }
    
    // Start typing after a delay
    setTimeout(() => {
        typedText.textContent = '';
        typedText.style.borderRight = '3px solid #00d9ff';
        type();
    }, 1000);
}

// ===========================
// PARALLAX EFFECT
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Parallax for hero gears
    const heroGears = document.querySelector('.hero-gears');
    if (heroGears) {
        heroGears.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    // Parallax for team hero gears
    const teamHeroGear = document.querySelector('.team-hero-gear');
    if (teamHeroGear) {
        teamHeroGear.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.2}px)`;
    }
});

// ===========================
// MECHANICAL GEAR ANIMATIONS
// ===========================
function createRotatingGears() {
    const floatingGears = document.querySelector('.floating-gears');
    
    if (!floatingGears) return;

    // Create multiple floating micro-gears
    for (let i = 0; i < 10; i++) {
        const gear = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        gear.setAttribute('viewBox', '0 0 100 100');
        gear.style.position = 'absolute';
        gear.style.width = `${Math.random() * 50 + 30}px`;
        gear.style.height = `${Math.random() * 50 + 30}px`;
        gear.style.left = `${Math.random() * 100}%`;
        gear.style.top = `${Math.random() * 100}%`;
        gear.style.opacity = `${Math.random() * 0.2 + 0.1}`;
        gear.style.animation = `rotate ${Math.random() * 20 + 10}s linear infinite`;
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M50 10 L55 25 L70 23 L73 38 L88 40 L88 55 L100 60 L93 70 L100 80 L88 85 L88 100 L73 102 L70 117 L55 115 L50 130 L45 115 L30 117 L27 102 L12 100 L12 85 L0 80 L7 70 L0 60 L12 55 L12 40 L27 38 L30 23 L45 25 Z');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', Math.random() > 0.5 ? '#00d9ff' : '#ffd700');
        path.setAttribute('stroke-width', '1');
        
        gear.appendChild(path);
        floatingGears.appendChild(gear);
    }
}

createRotatingGears();

// ===========================
// TEAM CARD HOVER EFFECTS
// ===========================
const teamCards = document.querySelectorAll('.team-card');
teamCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const gear = card.querySelector('.team-bg-gear');
        if (gear) {
            gear.style.animationDuration = '5s';
        }
    });

    card.addEventListener('mouseleave', () => {
        const gear = card.querySelector('.team-bg-gear');
        if (gear) {
            gear.style.animationDuration = '20s';
        }
    });
});

// ===========================
// MESHED GEARS ANIMATION
// ===========================
function animateMeshedGears() {
    const gear1 = document.querySelector('.gear-1');
    const gear2 = document.querySelector('.gear-2');
    
    if (gear1 && gear2) {
        let rotation1 = 0;
        let rotation2 = 0;
        const speed1 = 0.5;
        const speed2 = -0.75; // Opposite direction, different speed

        function animate() {
            rotation1 += speed1;
            rotation2 += speed2;
            
            gear1.style.transform = `rotate(${rotation1}deg)`;
            gear1.style.transformOrigin = '80px 144px';
            
            gear2.style.transform = `rotate(${rotation2}deg)`;
            gear2.style.transformOrigin = '180px 208px';
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
}

animateMeshedGears();

// ===========================
// PISTON MECHANISM ANIMATION
// ===========================
function animatePiston() {
    const pistonGroup = document.querySelector('.piston-group');
    
    if (pistonGroup) {
        const piston = pistonGroup.querySelector('.piston');
        const rod = pistonGroup.querySelector('.piston-rod');
        
        if (piston && rod) {
            let angle = 0;
            const speed = 0.05;
            const amplitude = 15;
            
            function animate() {
                angle += speed;
                const offset = Math.sin(angle) * amplitude;
                
                piston.style.transform = `translateY(${offset}px)`;
                rod.style.transform = `translateY(${offset}px)`;
                
                requestAnimationFrame(animate);
            }
            
            animate();
        }
    }
}

animatePiston();

// ===========================
// VISION ICON ROTATION
// ===========================
const visionIcons = document.querySelectorAll('.vision-icon svg');
visionIcons.forEach((icon, index) => {
    icon.style.animation = `rotate ${15 + index * 2}s linear infinite`;
});

// ===========================
// NEON TEXT GLITCH EFFECT
// ===========================
const neonTitles = document.querySelectorAll('.neon-title');
neonTitles.forEach(title => {
    setInterval(() => {
        const glitch = Math.random() > 0.95;
        if (glitch) {
            title.style.textShadow = '0 0 5px #00d9ff, 0 0 10px #00d9ff, 2px 2px 0 #ff6b35';
            setTimeout(() => {
                title.style.textShadow = '0 0 10px #00d9ff, 0 0 20px #00d9ff, 0 0 40px #00d9ff, 0 0 80px #00d9ff';
            }, 50);
        }
    }, 100);
});

// ===========================
// MEMBER CARD GEAR ROTATION
// ===========================
const memberCards = document.querySelectorAll('.member-card');
memberCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const gear = card.querySelector('.member-gear svg');
        if (gear) {
            gear.style.animation = 'rotate 3s linear infinite';
        }
    });

    card.addEventListener('mouseleave', () => {
        const gear = card.querySelector('.member-gear svg');
        if (gear) {
            gear.style.animation = 'none';
        }
    });
});

// ===========================
// SCROLL-TRIGGERED GEAR SPEED
// ===========================
let lastScrollY = window.scrollY;
let scrollSpeed = 0;

window.addEventListener('scroll', () => {
    scrollSpeed = Math.abs(window.scrollY - lastScrollY);
    lastScrollY = window.scrollY;
    
    // Speed up gear rotations based on scroll speed
    const allGears = document.querySelectorAll('.gear-large, .gear-medium, .team-bg-gear, .hero-rotating-gear');
    allGears.forEach(gear => {
        const currentDuration = parseFloat(window.getComputedStyle(gear).animationDuration);
        const newDuration = Math.max(5, 20 - (scrollSpeed * 0.5));
        gear.style.animationDuration = `${newDuration}s`;
    });
});

// ===========================
// BLUEPRINT LINE ANIMATION
// ===========================
function createBlueprintLines() {
    const blueprintOverlay = document.querySelector('.blueprint-overlay');
    
    if (blueprintOverlay) {
        // Add animated circuit paths
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.position = 'absolute';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.opacity = '0.1';
        svg.setAttribute('viewBox', '0 0 1200 800');
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M 0 400 L 300 400 L 300 200 L 600 200 L 600 600 L 900 600 L 900 400 L 1200 400');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#00d9ff');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-dasharray', '10 5');
        
        const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animate.setAttribute('attributeName', 'stroke-dashoffset');
        animate.setAttribute('from', '0');
        animate.setAttribute('to', '30');
        animate.setAttribute('dur', '1s');
        animate.setAttribute('repeatCount', 'indefinite');
        
        path.appendChild(animate);
        svg.appendChild(path);
        blueprintOverlay.appendChild(svg);
    }
}

createBlueprintLines();

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================
// Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
    // Your scroll-heavy code here
}, 50));

// ===========================
// LOADING ANIMATION
// ===========================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Fade in all sections sequentially
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ===========================
// KEYBOARD NAVIGATION
// ===========================
document.addEventListener('keydown', (e) => {
    // Arrow keys for slider navigation
    if (e.key === 'ArrowRight' && nextBtn) {
        nextBtn.click();
    } else if (e.key === 'ArrowLeft' && prevBtn) {
        prevBtn.click();
    }
});

console.log('%c🏎️ SAE MNIT - Design. Build. Race. 🏁', 'color: #00d9ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00d9ff;');
console.log('%cWebsite powered by futuristic engineering ⚙️', 'color: #ffd700; font-size: 14px;');
"