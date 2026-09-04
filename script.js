/* =========================================
   JB TECH SERVICES
   Main JavaScript
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

}


document.querySelectorAll('.nav-links a').forEach(link => {

    link.addEventListener('click', () => {

        if (navLinks) {
            navLinks.classList.remove('active');
        }

    });

});


/* =========================================
   EMAILJS CONFIGURATION
========================================= */

const EMAILJS_PUBLIC_KEY = 'nT6VAsPKFWv9SyMRl';
const EMAILJS_SERVICE_ID = 'service_c5qxx6m';
const EMAILJS_TEMPLATE_ID = 'template_npaqjwo';


/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.querySelector('#contactForm');
const submitButton = document.querySelector('#submitButton');
const formStatus = document.querySelector('#formStatus');


if (contactForm) {

    /*
       Check whether EmailJS library loaded
    */

    if (typeof emailjs === 'undefined') {

        console.error('EmailJS library was not loaded.');

        if (formStatus) {

            formStatus.style.display = 'block';

            formStatus.textContent =
                'Email service could not be loaded. Please refresh the page and try again.';

        }

    } else {

        /*
           Initialize EmailJS
        */

        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });

    }


    /*
       Form submission
    */

    contactForm.addEventListener('submit', function (event) {

        event.preventDefault();


        /*
           Prevent double submission
        */

        if (submitButton && submitButton.disabled) {
            return;
        }


        /*
           Check EmailJS
        */

        if (typeof emailjs === 'undefined') {

            if (formStatus) {

                formStatus.style.display = 'block';

                formStatus.textContent =
                    'Email service is not available. Please try again later or contact us on WhatsApp.';

            }

            return;
        }


        /*
           Show Sending status
        */

        if (submitButton) {

            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

        }


        if (formStatus) {

            formStatus.style.display = 'block';

            formStatus.textContent =
                'Sending your enquiry...';

        }


        /*
           Send form through EmailJS
        */

        emailjs.sendForm(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            contactForm
        )

        .then(function (response) {

            console.log(
                'EMAILJS SUCCESS:',
                response.status,
                response.text
            );


            if (formStatus) {

                formStatus.style.display = 'block';

                formStatus.textContent =
                    'Thank you! Your enquiry has been sent successfully. Our team will get back to you shortly.';

            }


            contactForm.reset();


            if (submitButton) {

                submitButton.disabled = false;
                submitButton.textContent = 'Send Enquiry';

            }

        })


        .catch(function (error) {

            /*
               IMPORTANT:
               Show the REAL EmailJS error
            */

            console.error('EMAILJS ERROR:', error);

            console.error('ERROR STATUS:', error.status);

            console.error('ERROR TEXT:', error.text);


            if (formStatus) {

                formStatus.style.display = 'block';

                formStatus.textContent =
                    'EmailJS Error ' +
                    (error.status || '') +
                    ': ' +
                    (error.text || 'Unable to send enquiry.');

            }


            if (submitButton) {

                submitButton.disabled = false;
                submitButton.textContent = 'Send Enquiry';

            }

        });

    });

}


/* =========================================
   SMOOTH SCROLLING
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener('click', function (event) {

        const targetId = this.getAttribute('href');


        if (!targetId || targetId === '#') {
            return;
        }


        const target = document.querySelector(targetId);


        if (target) {

            event.preventDefault();


            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        }

    });

});
