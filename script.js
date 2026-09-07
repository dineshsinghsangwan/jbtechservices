/* =========================================================
   JB TECH SERVICES
   Main Website JavaScript
   Version: 2026
========================================================= */

document.addEventListener('DOMContentLoaded', function () {


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    const menuToggle =
        document.querySelector('.menu-toggle');

    const navLinks =
        document.querySelector('.nav-links');


    if (menuToggle && navLinks) {

        menuToggle.addEventListener('click', function () {

            const isOpen =
                navLinks.classList.toggle('active');


            menuToggle.setAttribute(
                'aria-expanded',
                isOpen ? 'true' : 'false'
            );


            menuToggle.setAttribute(
                'aria-label',
                isOpen
                    ? 'Close navigation menu'
                    : 'Open navigation menu'
            );

        });


        /* Close after clicking navigation link */

        navLinks.querySelectorAll('a').forEach(function (link) {

            link.addEventListener('click', function () {

                navLinks.classList.remove('active');

                menuToggle.setAttribute(
                    'aria-expanded',
                    'false'
                );

                menuToggle.setAttribute(
                    'aria-label',
                    'Open navigation menu'
                );

            });

        });


        /* Close when clicking outside */

        document.addEventListener('click', function (event) {

            if (
                navLinks.classList.contains('active') &&
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                navLinks.classList.remove('active');

                menuToggle.setAttribute(
                    'aria-expanded',
                    'false'
                );

                menuToggle.setAttribute(
                    'aria-label',
                    'Open navigation menu'
                );

            }

        });


        /* Close with Escape */

        document.addEventListener('keydown', function (event) {

            if (event.key === 'Escape') {

                navLinks.classList.remove('active');

                menuToggle.setAttribute(
                    'aria-expanded',
                    'false'
                );

                menuToggle.setAttribute(
                    'aria-label',
                    'Open navigation menu'
                );

            }

        });

    }



    /* =====================================================
       FAQ ACCORDION
    ====================================================== */

    const faqItems =
        document.querySelectorAll('.faq-item');


    faqItems.forEach(function (item, index) {

        const question =
            item.querySelector('.faq-question');

        const answer =
            item.querySelector('.faq-answer');


        if (!question || !answer) {
            return;
        }


        /* Generate an ID when one is not already present */

        if (!answer.id) {

            answer.id =
                'faq-answer-' + (index + 1);

        }


        question.setAttribute(
            'aria-controls',
            answer.id
        );


        question.setAttribute(
            'aria-expanded',
            'false'
        );


        answer.hidden = true;


        question.addEventListener('click', function () {

            const isOpen =
                question.getAttribute('aria-expanded')
                === 'true';


            /* Close all other FAQ items */

            faqItems.forEach(function (otherItem) {

                if (otherItem !== item) {

                    const otherQuestion =
                        otherItem.querySelector('.faq-question');

                    const otherAnswer =
                        otherItem.querySelector('.faq-answer');


                    if (otherQuestion && otherAnswer) {

                        otherQuestion.setAttribute(
                            'aria-expanded',
                            'false'
                        );

                        otherAnswer.hidden = true;

                        otherItem.classList.remove('active');

                    }

                }

            });


            /* Toggle current item */

            question.setAttribute(
                'aria-expanded',
                isOpen ? 'false' : 'true'
            );


            answer.hidden = isOpen;

            item.classList.toggle(
                'active',
                !isOpen
            );

        });

    });



    /* =====================================================
       SMOOTH SCROLLING
    ====================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');


    internalLinks.forEach(function (link) {

        link.addEventListener('click', function (event) {

            const targetId =
                this.getAttribute('href');


            if (
                !targetId ||
                targetId === '#'
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            if (
                window.matchMedia(
                    '(prefers-reduced-motion: reduce)'
                ).matches
            ) {

                return;

            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });


            /* Keep URL hash without causing a jump */

            if (
                window.history &&
                window.history.replaceState
            ) {

                window.history.replaceState(
                    null,
                    '',
                    targetId
                );

            }

        });

    });



    /* =====================================================
       EMAILJS CONTACT FORM
    ====================================================== */

    const contactForm =
        document.querySelector('#contactForm');


    const submitButton =
        document.querySelector('#submitButton');


    const formStatus =
        document.querySelector('#formStatus');


    if (contactForm) {


        /* -------------------------------------------------
           EMAILJS CONFIGURATION
        -------------------------------------------------- */

        const EMAILJS_PUBLIC_KEY =
            'nT6VAsPKFWv9SyMRl';


        const EMAILJS_SERVICE_ID =
            'service_c5qzx6m';


        const EMAILJS_TEMPLATE_ID =
            'template_npaqjwo';



        /* -------------------------------------------------
           STATUS MESSAGE HELPER
        -------------------------------------------------- */

        function showFormStatus(
            message,
            type
        ) {

            if (!formStatus) {
                return;
            }


            formStatus.style.display =
                'block';


            if (type === 'success') {

                formStatus.style.background =
                    '#e8f7ee';

                formStatus.style.color =
                    '#176b3a';

                formStatus.style.border =
                    '1px solid #b7e4c7';

            } else {

                formStatus.style.background =
                    '#fff0f0';

                formStatus.style.color =
                    '#a52828';

                formStatus.style.border =
                    '1px solid #f0b8b8';

            }


            formStatus.textContent =
                message;

        }



        /* -------------------------------------------------
           INITIALIZE EMAILJS
        -------------------------------------------------- */

        if (typeof emailjs === 'undefined') {

            showFormStatus(
                'The enquiry service could not be loaded. Please try again or contact us on WhatsApp.',
                'error'
            );

        } else {

            emailjs.init({
                publicKey: EMAILJS_PUBLIC_KEY
            });

        }



        /* -------------------------------------------------
           FORM SUBMISSION
        -------------------------------------------------- */

        contactForm.addEventListener(
            'submit',
            function (event) {

                event.preventDefault();


                /* Prevent duplicate submission */

                if (
                    submitButton &&
                    submitButton.disabled
                ) {

                    return;

                }


                /* Check EmailJS */

                if (
                    typeof emailjs === 'undefined'
                ) {

                    showFormStatus(
                        'The enquiry service could not be loaded. Please try again or contact us on WhatsApp.',
                        'error'
                    );

                    return;

                }


                /* Loading state */

                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        'Sending Enquiry...';

                }


                if (formStatus) {

                    formStatus.style.display =
                        'none';

                    formStatus.textContent =
                        '';

                }


                /* Send the complete HTML form */

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


                    showFormStatus(
                        'Thank you! Your enquiry has been sent successfully. Our team will contact you shortly.',
                        'success'
                    );


                    contactForm.reset();


                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            'Send Enquiry';

                    }

                })


                .catch(function (error) {

                    console.error(
                        'EMAILJS ERROR:',
                        error
                    );


                    showFormStatus(
                        'We could not send your enquiry. Please try again or contact us on WhatsApp.',
                        'error'
                    );


                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            'Send Enquiry';

                    }

                });

            }
        );

    }



    /* =====================================================
       EXTERNAL LINK SAFETY
    ====================================================== */

    document
        .querySelectorAll('a[target="_blank"]')
        .forEach(function (link) {

            if (
                !link.hasAttribute('rel')
            ) {

                link.setAttribute(
                    'rel',
                    'noopener noreferrer'
                );

            }

        });


});
