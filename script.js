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


/* Close mobile menu after clicking a link */

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


    /* Initialize EmailJS */

    if (typeof emailjs !== 'undefined') {

        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });

    }


    /* Submit Contact Form */

    contactForm.addEventListener('submit', function (event) {

        event.preventDefault();


        /* Prevent double clicking */

        if (submitButton && submitButton.disabled) {
            return;
        }


        /* Check EmailJS */

        if (typeof emailjs === 'undefined') {

            if (formStatus) {

                formStatus.style.display = 'block';

                formStatus.textContent =
                    'Unable to connect to the enquiry service. Please try again or contact us on WhatsApp.';

            }

            return;
        }


        /* Button loading state */

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent = 'Sending...';

        }


        /* Hide previous status */

        if (formStatus) {

            formStatus.style.display = 'none';

            formStatus.textContent = '';

        }


        /* Send form through EmailJS */

        emailjs.sendForm(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            contactForm
        )

        .then(function () {


            /* Success message */

            if (formStatus) {

                formStatus.style.display = 'block';

                formStatus.textContent =
                    'Thank you! Your enquiry has been sent successfully. Our team will get back to you shortly.';

            }


            /* Clear form */

            contactForm.reset();


            /* Restore button */

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent = 'Send Enquiry';

            }

        })


        .catch(function (error) {


            console.error('EmailJS Error:', error);


            /* Error message */

            if (formStatus) {

                formStatus.style.display = 'block';

                formStatus.textContent =
                    'Sorry, we could not send your enquiry right now. Please try again or contact us on WhatsApp.';

            }


            /* Restore button */

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
