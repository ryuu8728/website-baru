// Typing Text Animation
const typingTexts = ['Web Developer', 'Front-End Developer', 'Problem Solver'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeText() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => {
            isDeleting = true;
        }, pauseTime);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }
    
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeText, speed);
}

// Start typing animation
setTimeout(typeText, 1000);

// Smooth scrolling untuk navigasi
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

// Highlight active navigation link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animasi fade in saat scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe semua elemen yang ingin dianimasikan
document.querySelectorAll('.about-text, .code-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Music Player with Auto Play
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

// Auto play music saat halaman dimuat
window.addEventListener('load', () => {
    // Beberapa browser memblokir autoplay, jadi kita coba dengan user interaction
    music.play().then(() => {
        musicToggle.classList.add('playing');
    }).catch(() => {
        // Jika autoplay diblokir, musik akan play saat user klik apapun di halaman
        document.body.addEventListener('click', function playOnFirstClick() {
            music.play();
            musicToggle.classList.add('playing');
            document.body.removeEventListener('click', playOnFirstClick);
        }, { once: true });
    });
});

musicToggle.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        musicToggle.classList.add('playing');
    } else {
        music.pause();
        musicToggle.classList.remove('playing');
    }
});

// Auto play music saat halaman dimuat (optional)
// Uncomment kode di bawah jika ingin musik otomatis play
// window.addEventListener('load', () => {
//     music.play();
//     musicToggle.classList.add('playing');
// });