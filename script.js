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

    menuToggle.addEventListener('click', function () {

        navLinks.classList.toggle('active');

    });

}


/* Close mobile menu after clicking a link */

document.querySelectorAll('.nav-links a').forEach(function (link) {

    link.addEventListener('click', function () {

        if (navLinks) {
            navLinks.classList.remove('active');
        }

    });

});


/* =========================================
   EMAILJS CONFIGURATION
========================================= */

const EMAILJS_PUBLIC_KEY = 'nT6VAsPKFWv9SyMRl';

/*
   IMPORTANT:
   This is the exact Service ID shown
   in the EmailJS dashboard.
*/

const EMAILJS_SERVICE_ID = 'service_c5qzx6m';

const EMAILJS_TEMPLATE_ID = 'template_npaqjwo';


/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.querySelector('#contactForm');
const submitButton = document.querySelector('#submitButton');
const formStatus = document.querySelector('#formStatus');


if (contactForm) {

    /*
     * Initialize EmailJS
     */

    if (typeof emailjs !== 'undefined') {

        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });

    }


    /*
     * Submit enquiry
     */

    contactForm.addEventListener('submit', function (event) {

        event.preventDefault();


        /*
         * Prevent duplicate submissions
         */

        if (submitButton && submitButton.disabled) {
            return;
        }


        /*
         * Check EmailJS library
         */

        if (typeof emailjs === 'undefined') {

            if (formStatus) {

                formStatus.style.display = 'block';
                formStatus.style.background = '#fff0f0';
                formStatus.style.color = '#a52828';
                formStatus.style.border = '1px solid #f0b8b8';

                formStatus.textContent =
                    'The enquiry service could not be loaded. Please try again or contact us on WhatsApp.';

            }

            return;
        }


        /*
         * Change button while sending
         */

        if (submitButton) {

            submitButton.disabled = true;
            submitButton.textContent = 'Sending Enquiry...';

        }


        /*
         * Clear previous status
         */

        if (formStatus) {

            formStatus.style.display = 'none';
            formStatus.textContent = '';

        }


        /*
         * Send form through EmailJS
         *
         * The form fields are automatically
         * collected using their name="" values.
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


            /*
             * Show success message
             */

            if (formStatus) {

                formStatus.style.display = 'block';
                formStatus.style.background = '#e8f7ee';
                formStatus.style.color = '#176b3a';
                formStatus.style.border = '1px solid #b7e4c7';

                formStatus.textContent =
                    'Thank you! Your enquiry has been sent successfully. Our team will contact you shortly.';

            }


            /*
             * Clear form
             */

            contactForm.reset();


            /*
             * Restore button
             */

            if (submitButton) {

                submitButton.disabled = false;
                submitButton.textContent = 'Send Enquiry';

            }

        })


        .catch(function (error) {

            console.error(
                'EMAILJS ERROR:',
                error
            );


            /*
             * Show actual EmailJS error in console
             */

            if (formStatus) {

                formStatus.style.display = 'block';
                formStatus.style.background = '#fff0f0';
                formStatus.style.color = '#a52828';
                formStatus.style.border = '1px solid #f0b8b8';

                formStatus.textContent =
                    'We could not send your enquiry. Please try again or contact us on WhatsApp.';

            }


            /*
             * Restore button
             */

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

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

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
