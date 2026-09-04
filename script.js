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
   CONTACT FORM
========================================= */

const contactForm = document.getElementById('contactForm');
const submitButton = document.getElementById('submitButton');
const formStatus = document.getElementById('formStatus');


if (contactForm) {

    /*
       Initialize EmailJS
    */

    if (typeof emailjs !== 'undefined') {

        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });

    }


    /*
       Submit Contact Form
    */

    contactForm.addEventListener('submit', function (event) {

        event.preventDefault();


        if (submitButton) {

            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

        }


        if (formStatus) {

            formStatus.style.display = 'block';
            formStatus.textContent = 'Sending your enquiry...';

        }


        /*
           Collect form values
        */

        const name = document.getElementById('name').value.trim();
        const company = document.getElementById('company').value.trim();
        const mobile = document.getElementById('mobile').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('service').value;
        const users = document.getElementById('users').value.trim();
        const location = document.getElementById('location').value.trim();
        const budget = document.getElementById('budget').value;
        const requirement = document.getElementById('requirement').value.trim();


        /*
           Send enquiry through EmailJS
        */

        emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
                name: name,
                company: company,
                mobile: mobile,
                email: email,
                service: service,
                users: users,
                location: location,
                budget: budget,
                requirement: requirement
            },
            {
                publicKey: EMAILJS_PUBLIC_KEY
            }
        )

        .then(function (response) {

            console.log(
                'Enquiry sent successfully:',
                response.status,
                response.text
            );


            /*
               SUCCESS MESSAGE
            */

            if (formStatus) {

                formStatus.style.display = 'block';

                formStatus.textContent =
                    'Thank you! Your enquiry has been sent successfully. Our team will get back to you shortly.';

            }


            /*
               Clear form
            */

            contactForm.reset();


            /*
               Restore button
            */

            if (submitButton) {

                submitButton.disabled = false;
                submitButton.textContent = 'Send Enquiry';

            }

        })

        .catch(function (error) {

            console.error('EmailJS submission failed:', error);


            /*
               User-friendly message
            */

            if (formStatus) {

                formStatus.style.display = 'block';

                formStatus.textContent =
                    'We could not send your enquiry at the moment. Please try again or contact us on WhatsApp.';

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
