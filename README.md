# ePortfolio

Personal e-portfolio website for Vikneshwaran Murugaian. The site presents profile information, education, certifications, skills, experience, selected projects, and a contact form with a modern IT-focused visual direction.

## Overview

This is a static portfolio site built with HTML, CSS, and JavaScript. It does not require a build step or backend server, so it can be hosted on GitHub Pages, Netlify, Vercel static hosting, or any basic web server.

Main sections include:

- Home, profile summary, and contact form
- About and interests overview
- Certifications and education timeline
- Skills and technology interests
- Experience and project highlights
- Detailed project outcomes and tools used

## Design Direction

- Recruiter-friendly IT portfolio with a dark technical interface, grid backdrop, contained panels, and concise case-study content
- Premium 3D + motion layer (added 2026-06-21), all loaded via CDN with no build step
- Rectangular media panels instead of blob/shaped image masks
- Responsive dashboard-style sections for skills, education, experience, and project details
- Accessible focus states, full reduced-motion support, keyboard-friendly controls, and labeled contact form inputs

## Highlights / Features

- Interactive 3D network background on the hero (Vanta NET, desktop + motion-allowed only)
- 3D parallax tilt on cards and media panels (Vanilla-Tilt)
- Scroll progress bar, soft cursor glow, and reveal-on-scroll animations
- Animated stat counters, a typewriter rotating-role line, and a looping tech marquee
- Skill proficiency meters on the interests page and a vertical education timeline
- Modern glass "command bar" navigation with a pulsing live dot and animated active underline
- Two-column contact section with quick-contact info cards plus the EmailJS form
- Typography system: Space Grotesk (display) + Sora (body) + JetBrains Mono (code/labels)

All enhancements degrade gracefully: if a CDN library fails to load, or the visitor
prefers reduced motion, the site falls back to a clean static experience.

## Pages

- `index.html` - home page, about section, selected skills, project preview, and contact form
- `interest.html` - programming languages, web/backend, mobile development, data analytics, soft skills, and languages
- `edu.html` - education history, certifications, and achievements
- `exp.html` - experience and project summary page
- `project-details.html` - detailed project cards and outcomes

## Tech Stack

- HTML5
- CSS3 (custom design system, no framework)
- JavaScript (vanilla, no build step)
- EmailJS for contact form submission
- ScrollReveal for scroll animations
- Three.js + Vanta.js (NET) for the 3D hero background (CDN)
- Vanilla-Tilt.js for 3D card tilt (CDN)
- Font Awesome and Remix Icon for icons
- Google Fonts: Space Grotesk, Sora, JetBrains Mono

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
|   |-- enhance.js
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

You can also use Node if available:

```bash
npx serve .
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

- Keep shared styling in `css/style.css` (the appended "PREMIUM UPGRADE PASS" block holds the newest components).
- Keep legacy behavior in `js/script.js`; add new motion/3D/UX behavior in `js/enhance.js`.
- New enhancement hooks are data attributes: `data-tilt`, `data-reveal`, `data-count`/`data-suffix`, `data-meter`, `data-typing`, `data-magnetic`, `data-year`.
- Tilt a container element (not a bare `<img>`) so the glare overlay can mount.
- Update repeated navigation/footer links consistently across all HTML pages.
- Test on mobile and desktop after layout or CSS changes, and with "reduce motion" enabled.
- Test the EmailJS contact flow after changing `index.html` or `js/email.js`.
- An internet connection is needed for the CDN libraries (3D/tilt/fonts/icons); offline, the site still works with graceful fallbacks.
- Preserve the modern tech/recruiter design direction: compact headings, contained sections, rectangular image presentation, and clear project outcome copy.
