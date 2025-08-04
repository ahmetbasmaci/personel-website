// Main JavaScript for Ahmet Basmaci Personal Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initThemeToggle();
    initScrollAnimations();
    // Remove project filter since we only show Flutter projects
    initContactForm();
    initSmoothScrolling();
    
    // Load Flutter projects after language manager is ready
    setTimeout(() => {
        loadProjects();
    }, 500);
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        offset: 100,
        once: true,
        easing: 'ease-out-cubic'
    });
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(icon, currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(icon, newTheme);
    });
}

function updateThemeIcon(icon, theme) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Projects filter functionality - REMOVED (only showing Flutter projects)
// function initProjectsFilter() {
//     const filterButtons = document.querySelectorAll('.filter-btn');
//     const projectsGrid = document.getElementById('projects-grid');

//     filterButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             // Remove active class from all buttons
//             filterButtons.forEach(btn => btn.classList.remove('active'));
//             // Add active class to clicked button
//             button.classList.add('active');

//             // Get filter value
//             const filterValue = button.getAttribute('data-filter');
            
//             // Filter projects
//             filterProjects(filterValue);
//         });
//     });
// }

// function filterProjects(category) {
//     const projectCards = document.querySelectorAll('.project-card');
    
//     projectCards.forEach(card => {
//         const cardCategory = card.getAttribute('data-category');
        
//         if (category === 'all' || cardCategory === category) {
//             card.style.display = 'block';
//             setTimeout(() => {
//                 card.style.opacity = '1';
//                 card.style.transform = 'translateY(0)';
//             }, 100);
//         } else {
//             card.style.opacity = '0';
//             card.style.transform = 'translateY(20px)';
//             setTimeout(() => {
//                 card.style.display = 'none';
//             }, 300);
//         }
//     });
// }

// Load projects dynamically
async function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    try {
        // Load only mobile projects from JSON file (Flutter projects from CV)
        const mobileProjects = await fetch('./projects/mobile.json')
            .then(res => res.ok ? res.json() : [])
            .catch(() => []);

        // Only show mobile projects with category 'mobile'
        const allProjects = mobileProjects.map(p => ({ ...p, category: 'mobile' }));

        if (allProjects.length > 0) {
            renderProjects(allProjects);
        } else {
            // Fallback to hardcoded Flutter projects if JSON file doesn't exist
            renderFallbackProjects();
        }
    } catch (error) {
        console.log('Loading fallback Flutter projects...');
        renderFallbackProjects();
    }
}

function renderProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';

    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project);
        projectCard.setAttribute('data-aos', 'fade-up');
        projectCard.setAttribute('data-aos-delay', (index * 100).toString());
        projectsGrid.appendChild(projectCard);
    });

    // Notify language manager that projects are loaded
    if (window.languageManager) {
        window.languageManager.onProjectsLoaded();
    }
}

function renderFallbackProjects() {
    const fallbackProjects = [
        {
            title: "Islamic Apps Collection",
            description: "A comprehensive collection of Islamic mobile applications including prayer times, Quran reading, hadith collections, and Islamic calendar. Published on Google Play Store with thousands of downloads and positive user feedback.",
            category: "mobile",
            technologies: ["Flutter", "Dart", "Firebase", "SQLite", "Provider State Management", "Material Design"],
            github: "https://github.com/ahmetbasmaci/Islamic_App",
            demo: "https://play.google.com/store/apps/developer?id=dev.+ahmet+basmac%C4%B1"
        },
        {
            title: "Hadith Books Mobile App",
            description: "Mobile application featuring authentic hadith collections from major Islamic sources. Includes advanced search functionality, bookmarking capabilities, and offline reading support.",
            category: "mobile",
            technologies: ["Flutter", "Dart", "Local Database", "SQLite", "Search Algorithms"],
            github: "https://github.com/ahmetbasmaci/hadith_books",
            demo: "https://play.google.com/store/apps/developer?id=dev.+ahmet+basmac%C4%B1"
        },
        {
            title: "Prayer Times & Qibla App",
            description: "Accurate prayer times calculator with Qibla direction finder. Features location-based services, multiple calculation methods, and notification system for prayer reminders.",
            category: "mobile",
            technologies: ["Flutter", "Dart", "GPS Location", "Push Notifications", "Compass API", "Background Services"],
            demo: "https://play.google.com/store/apps/developer?id=dev.+ahmet+basmac%C4%B1"
        },
        {
            title: "Quran Reading App",
            description: "Beautiful Quran reading application with multiple translations, audio recitation, and verse-by-verse learning features. Supports multiple languages and reading modes.",
            category: "mobile",
            technologies: ["Flutter", "Dart", "Audio Streaming", "Multi-language Support", "Custom UI", "Offline Storage"],
            demo: "https://play.google.com/store/apps/developer?id=dev.+ahmet+basmac%C4%B1"
        },
        {
            title: "E-Commerce Mobile App",
            description: "Cross-platform e-commerce mobile application with product catalog, shopping cart, payment integration, and order tracking. Built with modern Flutter architecture patterns.",
            category: "mobile",
            technologies: ["Flutter", "Dart", "REST API", "Payment Gateway", "State Management", "Push Notifications"],
            github: "https://github.com/ahmetbasmaci"
        },
        {
            title: "Task Management App",
            description: "Productivity mobile application with task organization, priority management, team collaboration, and real-time synchronization across devices.",
            category: "mobile",
            technologies: ["Flutter", "Dart", "Cloud Firestore", "Authentication", "Real-time Sync", "Bloc Pattern"],
            github: "https://github.com/ahmetbasmaci"
        }
    ];

    renderProjects(fallbackProjects);
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);

    // Project mapping to translation keys
    const projectTranslationMap = {
        "Zad-Almumin: Islamic App": "islamicApp",
        "Hadith Books Collection": "hadithBooks",
        "Mandalawi Quran Recitation Academy": "mandalawiQuran",
        "Alkot Mobilya Business Manager": "alkotMobilya",
        "Tradesman's Financial Notebook": "tradesmensNotebook",
        "Asaltna - Islamic Quiz Application": "asaltnaQuiz"
    };

    // Store the project key as a data attribute for language switching
    const projectKey = projectTranslationMap[project.title];
    if (projectKey) {
        card.setAttribute('data-project-key', projectKey);
    }

    const categoryColors = {
        mobile: '#14F195',
        web: '#38BDF8',
        opensource: '#0EA5E9'
    };

    // Get translated category names
    const getCategoryName = (category) => {
        if (window.languageManager) {
            const translationKey = `projects.filter.${category}`;
            return window.languageManager.translateDynamicContent(null, translationKey, category);
        }
        
        // Fallback category names
        const categoryNames = {
            mobile: 'Mobile',
            web: 'Web',
            opensource: 'Open Source'
        };
        return categoryNames[category] || category;
    };

    // Get translated link texts
    const getLinkText = (key, fallback) => {
        if (window.languageManager) {
            const translationKey = `projects.links.${key}`;
            return window.languageManager.translateDynamicContent(null, translationKey, fallback);
        }
        return fallback;
    };

    // Get translated project title and description
    const getProjectText = (key, fallback) => {
        if (window.languageManager && projectKey) {
            const translationKey = `projects.${projectKey}.${key}`;
            return window.languageManager.translateDynamicContent(null, translationKey, fallback);
        }
        return fallback;
    };

    const categoryName = getCategoryName(project.category);
    const codeText = getLinkText('code', 'Code');
    const demoText = getLinkText('demo', 'Live Demo');
    const playStoreText = getLinkText('playStore', 'Play Store');
    const projectTitle = getProjectText('title', project.title);
    const projectDescription = getProjectText('description', project.description);

    card.innerHTML = `
        <div class="project-header">
            <span class="project-category" style="background-color: ${categoryColors[project.category]}20; color: ${categoryColors[project.category]}">
                ${categoryName}
            </span>
        </div>
        <h3 class="project-title">${projectTitle}</h3>
        <p class="project-description">${projectDescription}</p>
        <div class="project-tech">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-links">
            ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener" class="project-link"><i class="fab fa-github"></i> ${codeText}</a>` : ''}
            ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener" class="project-link"><i class="fas fa-external-link-alt"></i> ${project.category === 'mobile' ? playStoreText : demoText}</a>` : ''}
        </div>
    `;

    return card;
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Simple form validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        showNotification('Thank you for your message! I will get back to you soon.', 'success');
        
        // Reset form
        this.reset();
        
        // In a real application, you would send the data to a server
        console.log('Form submitted:', { name, email, subject, message });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease-in-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #14F195, #38BDF8)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #EF4444, #DC2626)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Handle profile image loading
function handleProfileImageError() {
    const profileImages = document.querySelectorAll('.profile-image, .about-profile-image');
    
    profileImages.forEach(img => {
        img.addEventListener('error', function() {
            // Create fallback placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.innerHTML = this.classList.contains('profile-image') ? 
                '<i class="fas fa-code"></i>' : 
                '<i class="fas fa-user"></i>';
            
            // Replace image with placeholder
            this.parentNode.replaceChild(placeholder, this);
        });
    });
}

// Initialize profile image error handling
document.addEventListener('DOMContentLoaded', handleProfileImageError);

// Utility functions
function debounce(func, wait) {
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

// Typewriter effect for hero section
function initTypewriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typewriter effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }, 10));
}

// Initialize additional effects after page load
window.addEventListener('load', () => {
    initTypewriter();
    initParallax();
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate any responsive elements if needed
    AOS.refresh();
}, 250));

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Refresh animations when page becomes visible
        AOS.refresh();
    }
});

// Performance optimization: Lazy load images when they come into view
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}
