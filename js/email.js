
/* EMAIL JS */
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

const sendEmail = (e) =>{
    e.preventDefault()

    //serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_gu1wgkf', 'template_zr5vezs', '#contact-form', 'ycRdhsEF17Ri84UqE')
        .then(() =>{
            // Show sent message
            contactMessage.textContent = 'Message sent successfully ✅'

            //removing the contents
            setTimeout(() =>{ 
                contactMessage.textContent = ''
            }, 5000)

            contactForm.reset()

        }, () =>{
            //Display error message
            contactMessage.textContent = 'Message not sent (service error) ❌'
        })
}

contactForm.addEventListener('submit', sendEmail);