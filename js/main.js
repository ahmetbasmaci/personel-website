// Main JavaScript for Ahmet Basmaci Personal Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initThemeToggle();
    initScrollAnimations();
    initProjectsFilter();
    initContactForm();
    initSmoothScrolling();
    loadProjects();
    
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

// Projects filter functionality
function initProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.getElementById('projects-grid');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            filterProjects(filterValue);
        });
    });
}

function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Load projects dynamically
async function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    try {
        // Try to load projects from JSON files
        const [mobileProjects, webProjects, openSourceProjects] = await Promise.all([
            fetch('./projects/mobile.json').then(res => res.ok ? res.json() : []).catch(() => []),
            fetch('./projects/web.json').then(res => res.ok ? res.json() : []).catch(() => []),
            fetch('./projects/opensource.json').then(res => res.ok ? res.json() : []).catch(() => [])
        ]);

        const allProjects = [
            ...mobileProjects.map(p => ({ ...p, category: 'mobile' })),
            ...webProjects.map(p => ({ ...p, category: 'web' })),
            ...openSourceProjects.map(p => ({ ...p, category: 'opensource' }))
        ];

        if (allProjects.length > 0) {
            renderProjects(allProjects);
        } else {
            // Fallback to hardcoded projects if JSON files don't exist
            renderFallbackProjects();
        }
    } catch (error) {
        console.log('Loading fallback projects...');
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
}

function renderFallbackProjects() {
    const fallbackProjects = [
        {
            title: "Islamic Apps Collection",
            description: "A collection of Islamic mobile applications including prayer times, Quran reading, and hadith collections. Published on Google Play Store with positive user feedback.",
            category: "mobile",
            technologies: ["Flutter", "Dart", "Firebase", "SQLite"],
            github: "https://github.com/ahmetbasmaci/Islamic_App",
            demo: "https://play.google.com/store/apps/developer?id=dev.+ahmet+basmac%C4%B1"
        },
        {
            title: "Hadith Books App",
            description: "Mobile application featuring authentic hadith collections with search functionality and bookmarking capabilities.",
            category: "mobile",
            technologies: ["Flutter", "Dart", "Local Database"],
            github: "https://github.com/ahmetbasmaci/hadith_books",
            demo: "https://play.google.com/store/apps/developer?id=dev.+ahmet+basmac%C4%B1"
        },
        {
            title: "Primeware Web Solutions",
            description: "Enterprise web applications developed using .NET framework and modern web technologies for various client projects.",
            category: "web",
            technologies: [".NET", "C#", "ASP.NET", "SQL Server", "JavaScript"],
            demo: "https://www.primeware.com.tr/"
        },
        {
            title: "Flutter Components Library",
            description: "Open source collection of reusable Flutter widgets and components to accelerate mobile app development.",
            category: "opensource",
            technologies: ["Flutter", "Dart", "Material Design"],
            github: "https://github.com/ahmetbasmaci"
        },
        {
            title: "Personal Portfolio Website",
            description: "Modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript featuring dark/light theme support.",
            category: "web",
            technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
            github: "https://github.com/ahmetbasmaci"
        },
        {
            title: ".NET Core API Template",
            description: "Boilerplate project template for .NET Core Web API with authentication, logging, and database integration.",
            category: "opensource",
            technologies: [".NET Core", "Entity Framework", "JWT", "Swagger"],
            github: "https://github.com/ahmetbasmaci"
        }
    ];

    renderProjects(fallbackProjects);
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);

    const categoryColors = {
        mobile: '#14F195',
        web: '#38BDF8',
        opensource: '#0EA5E9'
    };

    const categoryNames = {
        mobile: 'Mobile App',
        web: 'Web Application',
        opensource: 'Open Source'
    };

    card.innerHTML = `
        <div class="project-header">
            <span class="project-category" style="background-color: ${categoryColors[project.category]}20; color: ${categoryColors[project.category]}">
                ${categoryNames[project.category]}
            </span>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-links">
            ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener" class="project-link"><i class="fab fa-github"></i> Code</a>` : ''}
            ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener" class="project-link"><i class="fas fa-external-link-alt"></i> ${project.category === 'mobile' ? 'Play Store' : 'Live Demo'}</a>` : ''}
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
