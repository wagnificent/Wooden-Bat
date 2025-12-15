document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav ul');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            const hamburger = this.querySelector('.hamburger');
            hamburger.classList.toggle('active');

            if (hamburger.classList.contains('active')) {
                mainNav.style.display = 'flex';
                mainNav.style.flexDirection = 'column';
                mainNav.style.gap = '15px';
                mainNav.style.marginTop = '20px';
            } else {
                mainNav.style.display = 'flex';
                mainNav.style.flexDirection = 'row';
                mainNav.style.gap = '30px';
                mainNav.style.marginTop = '0';
            }
        });
    }

    // Tab Functionality for Registration Page
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');

                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Schedule Tabs Functionality
    const scheduleTabButtons = document.querySelectorAll('.schedule-tab-btn');
    const scheduleContents = document.querySelectorAll('.schedule-content');

    if (scheduleTabButtons.length > 0 && scheduleContents.length > 0) {
        scheduleTabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const scheduleId = this.getAttribute('data-schedule');

                // Remove active class from all buttons and contents
                scheduleTabButtons.forEach(btn => btn.classList.remove('active'));
                scheduleContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                document.getElementById(scheduleId).classList.add('active');
            });
        });
    }

    // Standings Tabs Functionality
    const standingsTabButtons = document.querySelectorAll('.standings-tab-btn');
    const standingsContents = document.querySelectorAll('.standings-content');

    if (standingsTabButtons.length > 0 && standingsContents.length > 0) {
        standingsTabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const standingsId = this.getAttribute('data-standings');

                // Remove active class from all buttons and contents
                standingsTabButtons.forEach(btn => btn.classList.remove('active'));
                standingsContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                document.getElementById(`standings-${standingsId}`).classList.add('active');
            });
        });
    }

    // Photo Archive Filter Functionality
    const yearFilter = document.getElementById('year-filter');
    const divisionFilter = document.getElementById('division-filter');
    const photoItems = document.querySelectorAll('.photo-item');

    if (yearFilter && divisionFilter && photoItems.length > 0) {
        function filterPhotos() {
            const yearValue = yearFilter.value;
            const divisionValue = divisionFilter.value;

            photoItems.forEach(item => {
                const itemYear = item.getAttribute('data-year');
                const itemDivision = item.getAttribute('data-division');

                let shouldShow = true;

                if (yearValue !== 'all' && itemYear !== yearValue) {
                    shouldShow = false;
                }

                if (divisionValue !== 'all' && itemDivision !== divisionValue) {
                    shouldShow = false;
                }

                if (shouldShow) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        yearFilter.addEventListener('change', filterPhotos);
        divisionFilter.addEventListener('change', filterPhotos);

        // Initialize filters
        filterPhotos();
    }

    // Countdown Timer for Tournament Hub
    function initializeCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;

        // Set the target date (January 19, 2026)
        const targetDate = new Date('January 19, 2026 08:00:00').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            // Calculate days, hours, minutes, seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update the HTML
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

            // If countdown is finished
            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownElement.innerHTML = '<div class="countdown-complete">Tournament is underway!</div>';
            }
        }

        // Update countdown every second
        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Initialize immediately
    }

    // Initialize countdown if on tournament hub page
    initializeCountdown();

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const checkbox = this.querySelector('input[type="checkbox"]');

            if (emailInput.value && checkbox.checked) {
                alert('Thank you for subscribing to tournament updates!');
                emailInput.value = '';
                checkbox.checked = false;
            } else {
                alert('Please enter a valid email and agree to receive updates.');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
});
