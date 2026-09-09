/* =========================================================
   JB TECH SERVICES
   Main Website JavaScript
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {


    /* =====================================================
       MOBILE NAVIGATION
       Supports:
       - Existing pages: .nav-links
       - New dedicated pages: .main-nav
    ====================================================== */

    const menuToggle = document.querySelector('.menu-toggle');

    const navLinks =
        document.querySelector('.nav-links') ||
        document.querySelector('.main-nav');


    if (menuToggle && navLinks) {

        function closeNavigation() {

            navLinks.classList.remove('active');
            navLinks.classList.remove('open');

            menuToggle.setAttribute(
                'aria-expanded',
                'false'
            );

            menuToggle.setAttribute(
                'aria-label',
                'Open navigation menu'
            );
        }


        function openNavigation() {

            navLinks.classList.add('active');
            navLinks.classList.add('open');

            menuToggle.setAttribute(
                'aria-expanded',
                'true'
            );

            menuToggle.setAttribute(
                'aria-label',
                'Close navigation menu'
            );
        }


        menuToggle.addEventListener(
            'click',
            function (event) {

                event.stopPropagation();

                const isOpen =
                    navLinks.classList.contains('active') ||
                    navLinks.classList.contains('open');


                if (isOpen) {
                    closeNavigation();
                } else {
                    openNavigation();
                }

            }
        );


        /* Close menu after selecting a navigation link */

        navLinks.querySelectorAll('a').forEach(
            function (link) {

                link.addEventListener(
                    'click',
                    function () {
                        closeNavigation();
                    }
                );

            }
        );


        /* Close menu when clicking outside */

        document.addEventListener(
            'click',
            function (event) {

                const isOpen =
                    navLinks.classList.contains('active') ||
                    navLinks.classList.contains('open');


                if (
                    isOpen &&
                    !navLinks.contains(event.target) &&
                    !menuToggle.contains(event.target)
                ) {
                    closeNavigation();
                }

            }
        );


        /* Close menu with Escape */

        document.addEventListener(
            'keydown',
            function (event) {

                if (event.key === 'Escape') {
                    closeNavigation();
                }

            }
        );


        /* Reset mobile state when returning to desktop */

        window.addEventListener(
            'resize',
            function () {

                if (window.innerWidth > 900) {
                    closeNavigation();
                }

            }
        );

    }


    /* =====================================================
       FAQ ACCORDION
    ====================================================== */

    const faqItems =
        document.querySelectorAll('.faq-item');


    faqItems.forEach(
        function (item, index) {

            const question =
                item.querySelector('.faq-question');

            const answer =
                item.querySelector('.faq-answer');


            if (!question || !answer) {
                return;
            }


            /* Create an ID if the answer doesn't already have one */

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


            question.addEventListener(
                'click',
                function () {

                    const isOpen =
                        question.getAttribute(
                            'aria-expanded'
                        ) === 'true';


                    /*
                     * Close all other FAQ items
                     */

                    faqItems.forEach(
                        function (otherItem) {

                            if (otherItem !== item) {

                                const otherQuestion =
                                    otherItem.querySelector(
                                        '.faq-question'
                                    );

                                const otherAnswer =
                                    otherItem.querySelector(
                                        '.faq-answer'
                                    );


                                if (
                                    otherQuestion &&
                                    otherAnswer
                                ) {

                                    otherQuestion.setAttribute(
                                        'aria-expanded',
                                        'false'
                                    );

                                    otherAnswer.hidden = true;

                                    otherItem.classList.remove(
                                        'active'
                                    );

                                }

                            }

                        }
                    );


                    /*
                     * Toggle current FAQ item
                     */

                    question.setAttribute(
                        'aria-expanded',
                        isOpen ? 'false' : 'true'
                    );


                    answer.hidden = isOpen;


                    item.classList.toggle(
                        'active',
                        !isOpen
                    );

                }
            );

        }
    );


    /* =====================================================
       SMOOTH SCROLLING
    ====================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(
        function (link) {

            link.addEventListener(
                'click',
                function (event) {

                    const targetId =
                        this.getAttribute('href');


                    if (
                        !targetId ||
                        targetId === '#'
                    ) {
                        return;
                    }


                    let target = null;


                    try {

                        target =
                            document.querySelector(
                                targetId
                            );

                    } catch (error) {

                        return;

                    }


                    if (!target) {
                        return;
                    }


                    /*
                     * Respect users who prefer reduced motion.
                     */

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


                    /*
                     * Update the URL without causing a page reload.
                     */

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

                }
            );

        }
    );


    /* =====================================================
       EMAILJS CONTACT FORM
       Existing JB TECH SERVICES configuration preserved.
    ====================================================== */

    const contactForm =
        document.querySelector('#contactForm');


    const submitButton =
        document.querySelector('#submitButton');


    const formStatus =
        document.querySelector('#formStatus');


    if (contactForm) {


        /*
         * Existing EmailJS configuration.
         * Do not change these values.
         */

        const EMAILJS_PUBLIC_KEY =
            'nT6VAsPKFWv9SyMRl';


        const EMAILJS_SERVICE_ID =
            'service_c5qzx6m';


        const EMAILJS_TEMPLATE_ID =
            'template_npaqjwo';


        /*
         * Display form status message.
         */

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


        /*
         * Initialize EmailJS.
         */

        if (
            typeof emailjs !== 'undefined'
        ) {

            emailjs.init({
                publicKey:
                    EMAILJS_PUBLIC_KEY
            });

        }


        /*
         * Contact form submission.
         */

        contactForm.addEventListener(
            'submit',
            function (event) {

                event.preventDefault();


                /*
                 * Prevent double submission.
                 */

                if (
                    submitButton &&
                    submitButton.disabled
                ) {
                    return;
                }


                /*
                 * Check whether EmailJS loaded.
                 */

                if (
                    typeof emailjs === 'undefined'
                ) {

                    showFormStatus(
                        'The enquiry service could not be loaded. Please try again or contact us on WhatsApp.',
                        'error'
                    );

                    return;
                }


                /*
                 * Disable submit button while sending.
                 */

                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.setAttribute(
                        'aria-busy',
                        'true'
                    );

                    submitButton.textContent =
                        'Sending Enquiry...';

                }


                if (formStatus) {

                    formStatus.style.display =
                        'none';

                    formStatus.textContent =
                        '';

                }


                /*
                 * Send form through EmailJS.
                 */

                emailjs.sendForm(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    contactForm
                )

                .then(
                    function (response) {

                        console.log(
                            'EMAILJS SUCCESS:',
                            response.status,
                            response.text
                        );


                        showFormStatus(
                            'Thank you! Your enquiry has been sent successfully. Our team will contact you shortly.',
                            'success'
                        );


                        /*
                         * Clear form after successful submission.
                         */

                        contactForm.reset();


                        if (submitButton) {

                            submitButton.disabled =
                                false;

                            submitButton.removeAttribute(
                                'aria-busy'
                            );

                            submitButton.textContent =
                                'Send Enquiry';

                        }

                    }
                )

                .catch(
                    function (error) {

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

                            submitButton.removeAttribute(
                                'aria-busy'
                            );

                            submitButton.textContent =
                                'Send Enquiry';

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       EXTERNAL LINK SAFETY
    ====================================================== */

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach(
            function (link) {

                const currentRel =
                    link.getAttribute('rel') || '';


                const relTokens =
                    currentRel
                        .split(/\s+/)
                        .filter(Boolean);


                if (
                    !relTokens.includes(
                        'noopener'
                    )
                ) {

                    relTokens.push(
                        'noopener'
                    );

                }


                if (
                    !relTokens.includes(
                        'noreferrer'
                    )
                ) {

                    relTokens.push(
                        'noreferrer'
                    );

                }


                link.setAttribute(
                    'rel',
                    relTokens.join(' ')
                );

            }
        );

});
