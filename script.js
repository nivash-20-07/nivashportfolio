document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Toggle ---
    const themeBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeBtn.querySelector('i');
    
    // Check local storage for theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // --- 2. Personalized Greeting Effect ---
    const greetingText = document.getElementById('greeting-text');
    const greetings = ["Welcome to my portfolio!", "Hello, I am Nivash N!", "Glad to see you here!"];
    let gIndex = 0;
    
    // Simple fade cycle for greeting
    setInterval(() => {
        greetingText.style.opacity = '0';
        setTimeout(() => {
            gIndex = (gIndex + 1) % greetings.length;
            greetingText.textContent = greetings[gIndex];
            greetingText.style.opacity = '1';
        }, 500); // 500ms fade out
    }, 4000); // Change every 4s
    
    // Greeting transition setup
    greetingText.style.transition = 'opacity 0.5s ease';

    // --- 3. Image Fallback Handling ---
    const profileImg = document.getElementById('profile-img');
    const imgFallback = document.getElementById('img-fallback');

    profileImg.addEventListener('error', function() {
        this.style.display = 'none';
        imgFallback.style.display = 'flex';
    });

    // --- 4. Show/Hide Project Details ---
    const detailButtons = document.querySelectorAll('.toggle-details-btn');
    
    detailButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectCard = this.closest('.project-info');
            const detailsElement = projectCard.querySelector('.project-details');
            
            if (detailsElement.style.display === 'none' || detailsElement.style.display === '') {
                detailsElement.style.display = 'block';
                this.textContent = 'Hide Details';
                this.classList.add('active'); // Optional: change button style
            } else {
                detailsElement.style.display = 'none';
                this.textContent = 'Show Details';
                this.classList.remove('active');
            }
        });
    });

    // --- 5. Mobile Navbar (Hamburger) ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- 6. Scroll Animations & Active Nav Highlight ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    // Observer for fade-in animations
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('show');
            entry.target.classList.remove('hidden');
            observer.unobserve(entry.target); // Stop observing once revealed
        });
    }, revealOptions);

    sections.forEach(section => {
        revealOnScroll.observe(section);
    });

    // Observer for active navigation link
    const highlightOptions = {
        threshold: 0.3,
        rootMargin: "-20% 0px -60% 0px"
    };

    const highlightNav = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${currentId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, highlightOptions);

    sections.forEach(section => {
        highlightNav.observe(section);
    });
});
