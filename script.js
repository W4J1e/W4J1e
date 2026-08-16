// ===== 导航栏滚动效果 =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== 移动端导航切换 =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== 平滑滚动 =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== 打字机效果（循环） =====
const typewriterEl = document.getElementById('typewriter');
const phrases = [typewriterEl.textContent.trim()];
typewriterEl.textContent = '';
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriterLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeWriterLoop, 2000);
            return;
        }
        setTimeout(typeWriterLoop, 80);
    } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            setTimeout(typeWriterLoop, 500);
            return;
        }
        setTimeout(typeWriterLoop, 40);
    }
}

setTimeout(typeWriterLoop, 800);

// ===== 流星效果 =====
function createComets() {
    const cometsContainer = document.querySelector('.comets');
    for (let i = 0; i < 4; i++) {
        const comet = document.createElement('div');
        comet.classList.add('comet');
        cometsContainer.appendChild(comet);
    }
}
createComets();

// ===== 作品卡片横向流动（悬停暂停） =====
(function () {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;
    const track = document.createElement('div');
    track.className = 'projects-track';
    while (grid.firstChild) track.appendChild(grid.firstChild);
    grid.appendChild(track);
    track.innerHTML += track.innerHTML; // 复制一份实现无缝循环
})();

// ===== 技能条动画 =====
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-progress');
            bars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// ===== 卡片渐入动画 =====
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.about-card, .skill-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// ===== 鼠标跟随光效 =====
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.about-card, .skill-card, .project-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});