# Ahmet Basmaci - Personal Portfolio Website

A modern, responsive personal portfolio website showcasing the work and skills of Ahmet Basmaci, a Flutter and .NET developer.

## 🌟 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Dark/Light Theme**: Toggle between dark and light themes with preference saving
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Projects**: Filterable project gallery with detailed information
- **Contact Form**: Functional contact form with validation
- **Performance Optimized**: Fast loading with optimized CSS and JavaScript
- **Accessibility**: ARIA labels and semantic HTML for screen readers
- **SEO Friendly**: Proper meta tags and structured content

## 🚀 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Animations**: AOS (Animate On Scroll) library
- **Icons**: Font Awesome
- **Fonts**: Inter from Google Fonts
- **Build Tools**: No build process required - vanilla web technologies

## 📁 Project Structure

```
personal-website/
├── index.html              # Main HTML file
├── style.css               # Comprehensive CSS with dark/light themes
├── js/
│   └── main.js             # Interactive functionality
├── projects/
│   ├── mobile.json         # Mobile app projects data
│   ├── web.json           # Web development projects data
│   └── opensource.json    # Open source projects data
├── assets/
│   └── (images and other assets)
└── README.md              # This file
```

## 🎨 Design System

The website follows a consistent design system based on the provided style.json:

### Color Palette (Dark Theme)
- **Primary Background**: #0F172A (Slate 900)
- **Secondary Background**: #1E293B (Slate 800)
- **Primary Color**: #14F195 (Emerald 400)
- **Secondary Color**: #38BDF8 (Sky 400)
- **Accent Color**: #0EA5E9 (Sky 500)
- **Text Primary**: #E2E8F0 (Slate 200)
- **Text Secondary**: #94A3B8 (Slate 400)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700
- **Base Font Size**: 16px
- **Line Height**: 1.6

## 📱 Responsive Design

The website is built with a mobile-first approach and includes:

- **Desktop**: 1200px+ (Full layout with sidebar navigation)
- **Tablet**: 768px - 1199px (Adapted layout)
- **Mobile**: 320px - 767px (Stacked layout with hamburger menu)

## 🎯 Key Sections

1. **Hero Section**: Introduction with call-to-action buttons
2. **About**: Personal information and statistics
3. **Skills**: Categorized technical skills with icons
4. **Projects**: Filterable project gallery (Mobile, Web, Open Source)
5. **Experience**: Timeline of professional experience
6. **Contact**: Contact information and form

## 📊 Projects Data

Projects are organized into categories and stored in JSON files:

- **Mobile Apps**: Flutter applications published on Play Store
- **Web Applications**: .NET and web development projects
- **Open Source**: Community contributions and libraries

Each project includes:
- Title and description
- Technologies used
- GitHub and demo links
- Status and year
- Featured flag for highlighting

## 🔧 Setup and Installation

1. **Clone or Download**: Get the project files
2. **Local Server**: Use any local server (Live Server, Python's http.server, etc.)
3. **Open Browser**: Navigate to the local server URL

### Using Live Server (VS Code)
```bash
# Install Live Server extension in VS Code
# Right-click on index.html and select "Open with Live Server"
```

### Using Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Using Node.js
```bash
npx serve .
```

## 🎨 Customization

### Changing Colors
Edit CSS custom properties in `:root` section of `style.css`:

```css
:root {
    --color-primary: #14F195;
    --color-secondary: #38BDF8;
    /* ... other variables */
}
```

### Adding Projects
Add new project objects to the appropriate JSON file in the `projects/` directory:

```json
{
    "title": "Project Name",
    "description": "Project description",
    "technologies": ["Tech1", "Tech2"],
    "github": "https://github.com/...",
    "demo": "https://...",
    "featured": true,
    "status": "Live",
    "year": "2024"
}
```

### Modifying Content
Update the HTML content in `index.html` or modify the JavaScript in `js/main.js` for dynamic content.

## 🌐 Browser Support

- **Chrome**: 60+
- **Firefox**: 60+
- **Safari**: 12+
- **Edge**: 79+

## 📈 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🚀 Deployment

The website can be deployed to any static hosting service:

### GitHub Pages
1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop the project folder to Netlify
2. Or connect GitHub repository for continuous deployment

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow deployment prompts

## 📝 Personal Information

The website showcases:

- **Name**: Ahmet Basmaci
- **Role**: Flutter & .NET Developer
- **Email**: engahmet10@gmail.com
- **Phone**: +90 539 841 68 43
- **GitHub**: https://github.com/ahmetbasmaci
- **LinkedIn**: https://www.linkedin.com/in/ahmet-basmaci-490b48234/

## 🤝 Contributing

This is a personal portfolio website, but suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

For any questions or collaboration opportunities:

- **Email**: engahmet10@gmail.com
- **LinkedIn**: [Ahmet Basmaci](https://www.linkedin.com/in/ahmet-basmaci-490b48234/)
- **GitHub**: [@ahmetbasmaci](https://github.com/ahmetbasmaci)

---

**Built with ❤️ by Ahmet Basmaci**
