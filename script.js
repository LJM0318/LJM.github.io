// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initMouseGradient();
    initSmoothScroll();
    initActiveNavLink();
    initScrollReveal();
});

// Mouse Gradient Effect (Brittany Chiang signature effect)
function initMouseGradient() {
    const gradient = document.getElementById('mouseGradient');
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        gradient.style.setProperty('--mouse-x', `${x}%`);
        gradient.style.setProperty('--mouse-y', `${y}%`);
    });
}

// Smooth Scroll
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Active Navigation Link on Scroll
function initActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.about-content p, .experience-card, .strength-card, .goal-card'
    );
    
    revealElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

// Card hover effect - spotlight
document.querySelectorAll('.experience-card, .strength-card, .goal-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--spotlight-x', `${x}px`);
        card.style.setProperty('--spotlight-y', `${y}px`);
    });
});

// Console Easter Egg (Like Brittany's site)
console.log(
    '%c안녕하세요! 👋',
    'color: #64ffda; font-size: 24px; font-weight: bold;'
);
console.log(
    '%c콘솔까지 확인하시다니, 개발에 관심이 많으시군요!',
    'color: #8892b0; font-size: 14px;'
);
console.log(
    '%c저는 김민수입니다. 함께 멋진 프로젝트를 만들어 봐요! 🚀',
    'color: #ccd6f6; font-size: 12px;'
);

// Parallax effect for header on scroll (subtle)
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            const header = document.querySelector('.header-content');
            
            if (header && window.innerWidth > 1024) {
                const opacity = Math.max(0.3, 1 - scrolled / 800);
                header.style.opacity = opacity;
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

