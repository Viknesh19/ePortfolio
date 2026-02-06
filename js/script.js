/* SHOW MENU */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* MENU SHOW */
//Validate if constant exists
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* MENU HIDDEN */
// Validate if constant exists
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* REMOVE MENU MOBILE */
const navLink = document.querySelectorAll('.nav_link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav_link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* ADD BLUR TO HEADER */
const blurHeader = () =>{
    const header = document.getElementById('header')
    //when the scroll is greater than 50 viewport height, add the blur-header class to the header
    this.scrollY >= 50 ? header.classList.add('blur-header') 
                       : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/* SHOW SCROLL UP */ 
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 veiwport height, add the show-scroll class to the
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') 
                        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/* ACTIVE LINK */
const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('nav .nav_link').forEach(link => {
    if(link.href.includes(`${activePage}`)){
        link.classList.add('active');
    }
})

/* PROJECT DETAILS SLIDER */
const projectSlider = document.querySelector('[data-project-slider]')
if(projectSlider){
    const cards = Array.from(projectSlider.querySelectorAll('.project_card'))
    const dotsContainer = document.querySelector('[data-project-dots]')
    const prevButton = document.querySelector('.project_nav--prev')
    const nextButton = document.querySelector('.project_nav--next')
    let activeIndex = 0
    let scrollTimeout

    const setActiveDot = () => {
        if(!dotsContainer){
            return
        }

        const dots = dotsContainer.querySelectorAll('.project_dot')
        dots.forEach((dot, index) => {
            const isActive = index === activeIndex
            dot.classList.toggle('project_dot--active', isActive)
            dot.setAttribute('aria-current', isActive ? 'true' : 'false')
        })
    }

    const updateNavButtons = () => {
        if(prevButton){
            prevButton.disabled = activeIndex === 0
        }
        if(nextButton){
            nextButton.disabled = activeIndex === cards.length - 1
        }
    }

    const scrollToCard = (index) => {
        if(!cards[index]){
            return
        }
        activeIndex = index
        projectSlider.scrollTo({
            left: cards[index].offsetLeft,
            behavior: 'smooth'
        })
        setActiveDot()
        updateNavButtons()
    }

    if(dotsContainer){
        dotsContainer.innerHTML = ''
        cards.forEach((card, index) => {
            const dot = document.createElement('button')
            dot.type = 'button'
            dot.className = 'project_dot'
            const title = card.querySelector('.project_title')
            dot.setAttribute('aria-label', `Go to ${title ? title.textContent : `project ${index + 1}`}`)
            dot.addEventListener('click', () => scrollToCard(index))
            dotsContainer.appendChild(dot)
        })
    }

    if(prevButton){
        prevButton.addEventListener('click', () => scrollToCard(activeIndex - 1))
    }

    if(nextButton){
        nextButton.addEventListener('click', () => scrollToCard(activeIndex + 1))
    }

    projectSlider.addEventListener('scroll', () => {
        window.clearTimeout(scrollTimeout)
        scrollTimeout = window.setTimeout(() => {
            const sliderCenter = projectSlider.scrollLeft + projectSlider.offsetWidth / 2
            let closestIndex = 0
            let closestDistance = Infinity
            cards.forEach((card, index) => {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2
                const distance = Math.abs(sliderCenter - cardCenter)
                if(distance < closestDistance){
                    closestDistance = distance
                    closestIndex = index
                }
            })

            if(activeIndex !== closestIndex){
                activeIndex = closestIndex
                setActiveDot()
                updateNavButtons()
            }
        }, 120)
    })

    const hash = window.location.hash.replace('#', '')
    if(hash){
        const targetIndex = cards.findIndex(card => card.id === hash)
        if(targetIndex >= 0){
            scrollToCard(targetIndex)
        }
    }

    setActiveDot()
    updateNavButtons()
}

/* SCROLL REVEAL ANIMATION */
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.home_data, .home_social, .contact`)
sr.reveal(`.home_image`, {origin:'bottom'})
sr.reveal(`.about_data, .skills_data`, {origin:'left'})
sr.reveal(`.about_image, .skills_content`, {origin:'right'})
sr.reveal(`.exp_card, .edu_card, .expe_card`, {interval: 1000})

//edu.index
sr.reveal(`.edu_data, .edu2_image`)
sr.reveal(`.edu_image, .edu2_data, .sport_data`, {origin:'bottom'})
sr.reveal(`.int_card`, {interval: 100})

//exp
sr.reveal(`.exp1, .exp2`)
sr.reveal(`.exp1_image, .exp2_data`, {origin:'left'})
sr.reveal(`.exp1_data, .exp2_image`, {origin:'right'})
sr.reveal(`.exp1, .exp1_image, .exp1_data`, {interval: 1000})
sr.reveal(`.exp2, .exp2_image, .exp2_data`, {interval: 1000})
