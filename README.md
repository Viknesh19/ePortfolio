# ePortfolio

Personal e-portfolio website for Vikneshwaran Murugaian. The site presents profile information, education, certifications, skills, experience, selected projects, and a contact form.

## Overview

This is a static portfolio site built with HTML, CSS, and JavaScript. It does not require a build step or backend server, so it can be hosted on GitHub Pages, Netlify, Vercel static hosting, or any basic web server.

Main sections include:

- Home, profile summary, and contact form
- About and interests overview
- Certifications and education timeline
- Skills and technology interests
- Experience and project highlights
- Detailed project outcomes and tools used

## Pages

- `index.html` - home page, about section, selected skills, project preview, and contact form
- `interest.html` - programming languages, web/backend, mobile development, data analytics, soft skills, and languages
- `edu.html` - education history, certifications, and achievements
- `exp.html` - experience and project summary page
- `project-details.html` - detailed project cards and outcomes

## Tech Stack

- HTML5
- CSS3
- JavaScript
- EmailJS for contact form submission
- ScrollReveal for scroll animations
- Font Awesome and Remix Icon for icons

## Project Structure

```text
.
|-- css/
|   `-- style.css
|-- favicon/
|-- img/
|   |-- edu/
|   |-- int/
|   `-- project img/
|-- js/
|   |-- email.js
|   |-- script.js
|   `-- scrollreveal.min.js
|-- edu.html
|-- exp.html
|-- index.html
|-- interest.html
|-- project-details.html
`-- README.md
```

## Running Locally

Because this is a static site, you can open `index.html` directly in a browser.

For a local server, you can use any static file server. For example, with Python installed:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Contact Form

The contact form is handled by EmailJS in `js/email.js`.

Before deploying or reusing this project, verify the EmailJS configuration:

- Service ID
- Template ID
- Public key
- Email template fields that match the form inputs in `index.html`

## Deployment

This project can be deployed as static files. Common options:

- GitHub Pages
- Netlify
- Vercel
- Any shared hosting provider that serves HTML/CSS/JS files

When deploying, make sure the folder structure stays unchanged so image, CSS, JavaScript, and favicon paths continue to resolve.

## Maintenance Notes

- Keep shared styling in `css/style.css`.
- Keep shared interactive behavior in `js/script.js`.
- Update repeated navigation/footer links consistently across all HTML pages.
- Test the site on mobile and desktop after layout or CSS changes.
- Test the EmailJS contact flow after changing `index.html` or `js/email.js`.
