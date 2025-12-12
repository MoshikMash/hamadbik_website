// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (menuToggle && mainNav) {
        const setMenuOpen = (open) => {
            menuToggle.classList.toggle('active', open);
            mainNav.classList.toggle('active', open);
            menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        };

        menuToggle.addEventListener('click', function() {
            const isOpen = menuToggle.classList.contains('active');
            setMenuOpen(!isOpen);
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                setMenuOpen(false);
            });
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setMenuOpen(false);
        });

        // Close when clicking outside (mobile)
        document.addEventListener('click', (e) => {
            const isOpen = menuToggle.classList.contains('active');
            if (!isOpen) return;
            if (menuToggle.contains(e.target) || mainNav.contains(e.target)) return;
            setMenuOpen(false);
        });
    }

    // Navigation smooth scroll
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // Language switching functionality
    let currentLang = localStorage.getItem('language') || 'he';
    
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Update HTML lang and dir attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
        document.body.dir = lang === 'he' ? 'rtl' : 'ltr';
        
        // Update button text
        const langText = document.getElementById('langText');
        if (langText) {
            langText.textContent = lang === 'he' ? 'EN' : 'HE';
        }
        
        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });
        
        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && lang === 'en') {
            metaDesc.content = 'Hamadbik Ltd. - Leading vehicle parts renewal specialists. Years of experience with government institutions and major garages.';
        } else if (metaDesc) {
            metaDesc.content = 'המדביק בע״מ - מובילים בתחום חידוש חלקי חילוף לרכב. ניסיון של שנים רבות בעבודה עם מוסדות ממשלתיים ומוסכים גדולים.';
        }
        
        // Update title
        document.title = lang === 'he' ? 'המדביק בע״מ - חידוש חלקי חילוף לרכב' : 'Hamadbik Ltd. - Vehicle Parts Renewal';
        
        // Update navigation text alignment for LTR/RTL
        const navList = document.querySelector('.nav-list');
        if (navList) {
            navList.style.justifyContent = lang === 'he' ? 'flex-end' : 'flex-start';
        }
        
        // Update Google Maps iframe language
        const googleMap = document.getElementById('googleMap');
        if (googleMap) {
            if (lang === 'en') {
                googleMap.src = 'https://www.google.com/maps?q=Hamadbik+Ltd.+16+Beit+Alfa+Street+Tel+Aviv&hl=en&gl=il&ie=UTF8&t=m&z=15&iwloc=B&output=embed&markers=color:0x25D366|label:Hamadbik+Ltd.|32.0652778,34.7894444';
            } else {
                googleMap.src = 'https://www.google.com/maps?q=המדביק בע״מ בית אלפא 16 תל אביב&hl=he&gl=il&ie=UTF8&t=m&z=15&iwloc=B&output=embed&markers=color:0x25D366|label:המדביק בע״מ|32.0652778,34.7894444';
            }
        }
        
        // Update map navigation link language
        const mapNavLink = document.querySelector('.btn-navigate');
        if (mapNavLink) {
            if (lang === 'en') {
                mapNavLink.href = 'https://www.google.com/maps/dir/?api=1&destination=32.0652778,34.7894444&hl=en';
            } else {
                mapNavLink.href = 'https://www.google.com/maps/dir/?api=1&destination=32.0652778,34.7894444&hl=he';
            }
        }
    }
    
    // Initialize language on page load
    setLanguage(currentLang);
    
    // Language switch button click handler
    const langSwitch = document.getElementById('langSwitch');
    if (langSwitch) {
        langSwitch.addEventListener('click', function() {
            const newLang = currentLang === 'he' ? 'en' : 'he';
            setLanguage(newLang);
        });
    }

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and contact items
    const animatedElements = document.querySelectorAll('.service-card, .contact-item, .stat-item, .gallery-item, .team-member');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Carousel functionality
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    let currentSlide = 0;

    function showSlide(index) {
        carouselSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        carouselDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % carouselSlides.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        showSlide(prev);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-play carousel (optional - uncomment to enable)
    // setInterval(nextSlide, 5000);
});

