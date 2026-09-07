/* =========================================================
   JB TECH SERVICES
   Main Website JavaScript
   Version: Modern Website Foundation
========================================================= */


/* =========================================================
   RUN AFTER DOM IS READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");


    if (menuToggle && navLinks) {

        /*
         * Accessibility state
         */

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        /*
         * Mobile menu toggle
         */

        menuToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    navLinks.classList.toggle("active");


                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                /*
                 * Optional accessibility label
                 */

                menuToggle.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                );

            }
        );


        /*
         * Close menu after selecting a navigation link
         */

        navLinks
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navLinks.classList.remove("active");

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        menuToggle.setAttribute(
                            "aria-label",
                            "Open navigation menu"
                        );

                    }
                );

            });


        /*
         * Close menu when clicking outside it
         */

        document.addEventListener(
            "click",
            function (event) {

                const clickedInsideMenu =
                    navLinks.contains(event.target);

                const clickedToggle =
                    menuToggle.contains(event.target);


                if (
                    !clickedInsideMenu &&
                    !clickedToggle
                ) {

                    navLinks.classList.remove("active");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }

            }
        );


        /*
         * Close mobile menu with Escape key
         */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    navLinks.classList.remove("active");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                    menuToggle.focus();

                }

            }
        );

    }


    /* =====================================================
       FAQ ACCORDION
       Future-ready for the new FAQ sections
    ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(function (item) {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");


        if (!question || !answer) {
            return;
        }


        /*
         * Initial accessibility state
         */

        question.setAttribute(
            "aria-expanded",
            item.classList.contains("active")
                ? "true"
                : "false"
        );


        question.setAttribute(
            "type",
            "button"
        );


        /*
         * Give each answer an ID if it doesn't already have one
         */

        if (!answer.id) {

            answer.id =
                "faq-answer-" +
                Math.random()
                    .toString(36)
                    .slice(2, 10);

        }


        question.setAttribute(
            "aria-controls",
            answer.id
        );


        /*
         * FAQ click
         */

        question.addEventListener(
            "click",
            function () {

                const isOpen =
                    item.classList.contains("active");


                /*
                 * Close all other FAQ items
                 *
                 * This keeps the FAQ clean and avoids
                 * opening many answers at once.
                 */

                faqItems.forEach(
                    function (otherItem) {

                        if (otherItem !== item) {

                            otherItem.classList.remove(
                                "active"
                            );


                            const otherQuestion =
                                otherItem.querySelector(
                                    ".faq-question"
                                );


                            if (otherQuestion) {

                                otherQuestion.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }

                        }

                    }
                );


                /*
                 * Toggle selected FAQ
                 */

                item.classList.toggle(
                    "active",
                    !isOpen
                );


                question.setAttribute(
                    "aria-expanded",
                    String(!isOpen)
                );

            }
        );

    });


    /* =====================================================
       SMOOTH SCROLLING
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                /*
                 * Ignore empty anchors
                 */

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(targetId);


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({

                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth",

                    block: "start"

                });


                /*
                 * Update URL hash without causing
                 * another automatic jump.
                 */

                if (
                    window.history &&
                    window.history.replaceState
                ) {

                    window.history.replaceState(
                        null,
                        "",
                        targetId
                    );

                }

            }
        );

    });


    /* =====================================================
       EMAILJS CONFIGURATION
    ===================================================== */

    const EMAILJS_PUBLIC_KEY =
        "nT6VAsPKFWv9SyMRl";


    const EMAILJS_SERVICE_ID =
        "service_c5qzx6m";


    const EMAILJS_TEMPLATE_ID =
        "template_npaqjwo";


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.querySelector("#contactForm");


    const submitButton =
        document.querySelector("#submitButton");


    const formStatus =
        document.querySelector("#formStatus");


    /*
     * No contact form on this page?
     *
     * That's normal for Home, About, Services etc.
     */

    if (!contactForm) {
        return;
    }


    /* =====================================================
       FORM HELPER
    ===================================================== */

    function showFormStatus(
        message,
        type
    ) {

        if (!formStatus) {
            return;
        }


        formStatus.style.display = "block";


        if (type === "success") {

            formStatus.style.background =
                "#e8f7ee";

            formStatus.style.color =
                "#176b3a";

            formStatus.style.border =
                "1px solid #b7e4c7";

        } else {

            formStatus.style.background =
                "#fff0f0";

            formStatus.style.color =
                "#a52828";

            formStatus.style.border =
                "1px solid #f0b8b8";

        }


        formStatus.textContent =
            message;

    }


    /* =====================================================
       CHECK EMAILJS
    ===================================================== */

    if (
        typeof emailjs === "undefined"
    ) {

        console.error(
            "JB TECH SERVICES: EmailJS library failed to load."
        );


        showFormStatus(
            "The enquiry service could not be loaded. Please contact us on WhatsApp.",
            "error"
        );


        return;
    }


    /* =====================================================
       INITIALIZE EMAILJS
    ===================================================== */

    emailjs.init({

        publicKey:
            EMAILJS_PUBLIC_KEY

    });


    /* =====================================================
       FORM SUBMISSION
    ===================================================== */

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /*
             * Prevent duplicate submissions
             */

            if (
                submitButton &&
                submitButton.disabled
            ) {

                return;

            }


            /*
             * Loading state
             */

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.setAttribute(
                    "aria-busy",
                    "true"
                );

                submitButton.textContent =
                    "Sending Enquiry...";

            }


            /*
             * Hide previous status
             */

            if (formStatus) {

                formStatus.style.display =
                    "none";

                formStatus.textContent =
                    "";

            }


            /*
             * Collect form fields
             *
             * These IDs match the current
             * JB TECH SERVICES contact form.
             */

            const nameField =
                document.getElementById("name");

            const companyField =
                document.getElementById("company");

            const mobileField =
                document.getElementById("mobile");

            const emailField =
                document.getElementById("email");

            const serviceField =
                document.getElementById("service");

            const usersField =
                document.getElementById("users");

            const locationField =
                document.getElementById("location");

            const budgetField =
                document.getElementById("budget");

            const requirementField =
                document.getElementById("requirement");


            /*
             * Safely read values
             */

            const templateParams = {

                name:
                    nameField
                        ? nameField.value.trim()
                        : "",

                company:
                    companyField
                        ? companyField.value.trim()
                        : "",

                mobile:
                    mobileField
                        ? mobileField.value.trim()
                        : "",

                email:
                    emailField
                        ? emailField.value.trim()
                        : "",

                service:
                    serviceField
                        ? serviceField.value
                        : "",

                users:
                    usersField
                        ? usersField.value.trim()
                        : "",

                location:
                    locationField
                        ? locationField.value.trim()
                        : "",

                budget:
                    budgetField
                        ? budgetField.value
                        : "",

                requirement:
                    requirementField
                        ? requirementField.value.trim()
                        : ""

            };


            console.log(
                "JB TECH SERVICES enquiry:",
                templateParams
            );


            /* =================================================
               SEND TO EMAILJS
            ================================================= */

            emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            )


            .then(function (response) {

                console.log(
                    "EMAILJS SUCCESS:",
                    response.status,
                    response.text
                );


                /*
                 * Success message
                 */

                showFormStatus(
                    "Thank you! Your enquiry has been sent successfully. Our team will contact you shortly.",
                    "success"
                );


                /*
                 * Clear form
                 */

                contactForm.reset();


                /*
                 * Restore button
                 */

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.removeAttribute(
                        "aria-busy"
                    );

                    submitButton.textContent =
                        "Send Enquiry";

                }

            })


            .catch(function (error) {

                console.error(
                    "EMAILJS ERROR:",
                    error
                );


                /*
                 * Error message
                 */

                showFormStatus(
                    "We could not send your enquiry. Please try again or contact us on WhatsApp.",
                    "error"
                );


                /*
                 * Restore button
                 */

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.removeAttribute(
                        "aria-busy"
                    );

                    submitButton.textContent =
                        "Send Enquiry";

                }

            });

        }
    );

});
