// Multi-language support functionality

class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.translations = {};
        this.supportedLanguages = ['en', 'tr', 'ar'];
        this.rtlLanguages = ['ar'];
        
        this.init();
    }

    async init() {
        // Load translation files
        await this.loadTranslations();
        
        // Set initial language
        await this.setLanguage(this.currentLanguage);
        
        // Initialize language switcher
        this.initLanguageSwitcher();
        
        // Update current language indicator
        this.updateLanguageIndicator();
    }

    async loadTranslations() {
        try {
            const loadPromises = this.supportedLanguages.map(async (lang) => {
                try {
                    const response = await fetch(`./lang/${lang}.json`);
                    if (response.ok) {
                        this.translations[lang] = await response.json();
                    } else {
                        console.warn(`Failed to load translations for ${lang}`);
                        this.translations[lang] = {};
                    }
                } catch (error) {
                    console.warn(`Error loading translations for ${lang}:`, error);
                    this.translations[lang] = {};
                }
            });
            
            await Promise.all(loadPromises);
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    initLanguageSwitcher() {
        const langToggle = document.getElementById('lang-toggle');
        const langDropdown = document.getElementById('lang-dropdown');
        const langOptions = document.querySelectorAll('.lang-option');

        if (!langToggle || !langDropdown) return;

        // Toggle dropdown
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.remove('active');
            }
        });

        // Handle language selection
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const selectedLang = option.getAttribute('data-lang');
                if (selectedLang && this.supportedLanguages.includes(selectedLang)) {
                    this.setLanguage(selectedLang);
                    langDropdown.classList.remove('active');
                }
            });
        });

        // Mark active language
        this.updateActiveLanguageOption();
    }

    updateActiveLanguageOption() {
        const langOptions = document.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === this.currentLanguage) {
                option.classList.add('active');
            }
        });
    }

    updateLanguageIndicator() {
        const currentLangElement = document.getElementById('current-lang');
        if (currentLangElement) {
            const langNames = {
                'en': 'EN',
                'tr': 'TR',
                'ar': 'AR'
            };
            currentLangElement.textContent = langNames[this.currentLanguage] || 'EN';
        }
    }

    async setLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            console.warn(`Language ${lang} is not supported`);
            return;
        }

        this.currentLanguage = lang;
        localStorage.setItem('language', lang);

        // Set document language and direction
        document.documentElement.lang = lang;
        
        if (this.rtlLanguages.includes(lang)) {
            document.documentElement.dir = 'rtl';
            document.body.classList.add('rtl');
        } else {
            document.documentElement.dir = 'ltr';
            document.body.classList.remove('rtl');
        }

        // Apply translations
        this.applyTranslations();
        
        // Update language indicator
        this.updateLanguageIndicator();
        
        // Update active language option
        this.updateActiveLanguageOption();

        // Update dynamic content (projects, etc.)
        this.updateProjectCards();

        // Load language-specific fonts if needed
        this.loadLanguageSpecificFonts(lang);

        // Refresh AOS animations to recalculate positions
        if (typeof AOS !== 'undefined') {
            setTimeout(() => {
                AOS.refresh();
            }, 100);
        }
    }

    loadLanguageSpecificFonts(lang) {
        // Remove existing language-specific font links
        const existingFontLinks = document.querySelectorAll('link[data-lang-font]');
        existingFontLinks.forEach(link => link.remove());

        // Add language-specific fonts
        if (lang === 'ar') {
            const arabicFontLink = document.createElement('link');
            arabicFontLink.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap';
            arabicFontLink.rel = 'stylesheet';
            arabicFontLink.setAttribute('data-lang-font', 'ar');
            document.head.appendChild(arabicFontLink);
        }
    }

    applyTranslations() {
        const translations = this.translations[this.currentLanguage] || this.translations['en'] || {};
        
        // Translate elements with data-translate attribute
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getNestedValue(translations, key);
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Translate elements with data-translate-attr attribute (for attributes)
        const attrElements = document.querySelectorAll('[data-translate-attr]');
        attrElements.forEach(element => {
            const attrData = element.getAttribute('data-translate-attr');
            const [attr, key] = attrData.split(':');
            const translation = this.getNestedValue(translations, key);
            
            if (translation && attr) {
                element.setAttribute(attr, translation);
            }
        });

        // Update project filter buttons (they might be dynamically created)
        this.updateProjectFilters();
    }

    updateProjectFilters() {
        const translations = this.translations[this.currentLanguage] || this.translations['en'] || {};
        const filterButtons = document.querySelectorAll('.filter-btn[data-translate]');
        
        filterButtons.forEach(button => {
            const key = button.getAttribute('data-translate');
            const translation = this.getNestedValue(translations, key);
            if (translation) {
                button.textContent = translation;
            }
        });
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }

    // Method to translate dynamic content (like project cards)
    translateDynamicContent(element, translationKey, defaultText = '') {
        const translations = this.translations[this.currentLanguage] || this.translations['en'] || {};
        const translation = this.getNestedValue(translations, translationKey);
        return translation || defaultText;
    }

    // Get current language direction
    isRTL() {
        return this.rtlLanguages.includes(this.currentLanguage);
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Method to be called when projects are dynamically loaded
    onProjectsLoaded() {
        // Re-apply translations to project filter buttons
        this.updateProjectFilters();
        
        // Update project categories and links in existing project cards
        this.updateProjectCards();
    }

    updateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Update category names
            const categoryElement = card.querySelector('.project-category');
            if (categoryElement) {
                const category = card.getAttribute('data-category');
                if (category) {
                    const translationKey = `projects.filter.${category}`;
                    const translation = this.translateDynamicContent(categoryElement, translationKey, category);
                    if (translation !== category) {
                        categoryElement.textContent = translation;
                    }
                }
            }

            // Update project links
            const projectLinks = card.querySelectorAll('.project-link');
            projectLinks.forEach(link => {
                const text = link.textContent.trim();
                const icon = link.querySelector('i');
                const iconClass = icon ? icon.className : '';
                
                let newText = text;
                
                if (iconClass.includes('fa-github')) {
                    newText = this.translateDynamicContent(link, 'projects.links.code', 'Code');
                } else if (iconClass.includes('fa-external-link-alt')) {
                    const card = link.closest('.project-card');
                    const category = card ? card.getAttribute('data-category') : '';
                    if (category === 'mobile') {
                        newText = this.translateDynamicContent(link, 'projects.links.playStore', 'Play Store');
                    } else {
                        newText = this.translateDynamicContent(link, 'projects.links.demo', 'Live Demo');
                    }
                }
                
                if (newText !== text) {
                    // Preserve the icon and update only the text
                    const iconHTML = icon ? icon.outerHTML : '';
                    link.innerHTML = `${iconHTML} ${newText}`;
                }
            });
        });
    }
}

// Initialize language manager
let languageManager;

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
    languageManager = new LanguageManager();
    
    // Export for use in other scripts
    if (typeof window !== 'undefined') {
        window.languageManager = languageManager;
    }
});
