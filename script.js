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


/* =========================================
   CLOSE MOBILE MENU AFTER CLICKING A LINK
========================================= */

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

const EMAILJS_SERVICE_ID = 'service_c5qxx6m';

const EMAILJS_TEMPLATE_ID = 'template_npaqjwo';


/* =========================================
   INITIALIZE EMAILJS
========================================= */

if (typeof emailjs !== 'undefined') {

    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });

}


/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.querySelector('#contactForm');

const submitButton = document.querySelector('#submitButton');

const formStatus = document.querySelector('#formStatus');


if (contactForm) {

    contactForm.addEventListener('submit', function (event) {

        event.preventDefault();


        /* =========================================
           CHECK EMAILJS
        ========================================= */

        if (typeof emailjs === 'undefined') {

            showFormError(
                'The enquiry service could not be loaded. Please try again or contact us at reachus@jbtechservices.in.'
            );

            return;

        }


        /* =========================================
           DISABLE BUTTON WHILE SENDING
        ========================================= */

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent = 'Sending Enquiry...';

        }


        /* =========================================
           STATUS MESSAGE
        ========================================= */

        if (formStatus) {

            formStatus.style.display = 'block';

            formStatus.style.backgroundColor = '#eef4ff';

            formStatus.style.color = '#1f3c68';

            formStatus.style.border = '1px solid #cbd9ee';

            formStatus.textContent =
                'Please wait while we send your enquiry...';

        }


        /* =========================================
           SEND FORM THROUGH EMAILJS
        ========================================= */

        emailjs.sendForm(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            contactForm
        )

        .then(function () {


            /* =========================================
               SUCCESS
            ========================================= */

            if (formStatus) {

                formStatus.style.display = 'block';

                formStatus.style.backgroundColor = '#eaf8ef';

                formStatus.style.color = '#176b3a';

                formStatus.style.border = '1px solid #b9e4c8';

                formStatus.textContent =
                    'Thank you! Your enquiry has been sent successfully. Our team will contact you shortly.';

            }


            /* RESET FORM */

            contactForm.reset();


            /* RESTORE BUTTON */

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent = 'Send Enquiry';

            }


            /* SCROLL TO SUCCESS MESSAGE */

            if (formStatus) {

                formStatus.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

            }


        })

        .catch(function (error) {


            /* =========================================
               ERROR
            ========================================= */

            console.error(
                'EmailJS Error:',
                error
            );


            showFormError(
                'Sorry, we could not send your enquiry right now. Please try again or email us directly at reachus@jbtechservices.in.'
            );


            /* RESTORE BUTTON */

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent = 'Send Enquiry';

            }

        });

    });

}


/* =========================================
   FORM ERROR FUNCTION
========================================= */

function showFormError(message) {

    if (formStatus) {

        formStatus.style.display = 'block';

        formStatus.style.backgroundColor = '#fff0f0';

        formStatus.style.color = '#a12626';

        formStatus.style.border = '1px solid #efc2c2';

        formStatus.textContent = message;

    }

}


/* =========================================
   SMOOTH SCROLL FOR PAGE ANCHORS
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {

    anchor.addEventListener('click', function (event) {

        const targetId = this.getAttribute('href');

        if (!targetId || targetId === '#') {

            return;

        }

        const targetElement = document.querySelector(targetId);

        if (targetElement) {

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        }

    });

});
