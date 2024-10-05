$(document).ready(function() {
    console.log("Document ready!");

    // Navbar sticky and logo hide on scroll
    $(window).scroll(function() {
        $('.navbar').toggleClass("sticky", this.scrollY > 20);

        const word2 = $('.word2');
        if (this.scrollY > 0) {
            word2.addClass('hidden');
        } else {
            word2.removeClass('hidden');
        }
    });

    // Mobile menu toggle
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // Close mobile menu when a link is clicked
    $('.navbar .menu li a').click(function() {
        $('.navbar .menu').removeClass("active");
        $('.menu-btn i').removeClass("active");
    });

    // Typing animation
    if ($('.typing').length > 0) {
        new Typed(".typing", { strings: ["Professor"], typeSpeed: 100, backSpeed: 60, loop: true });
    }
    if ($('.typing-2').length > 0) {
        new Typed(".typing-2", { strings: ["Professor"], typeSpeed: 100, backSpeed: 60, loop: true });
    }

    // Fixed logo for home page
    if (window.location.href.match(/\/(index.html|home)?$/)) {
        document.getElementById('logo').classList.add('fixed-logo');
    }

    // Collaborations carousel
    $("#collaborations-carousel").owlCarousel({
        loop: false,
        margin: 0,
        nav: true,
        items: 4,
        autoplay: false,
        autoplayTimeout: 2000,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 4 }
        }
    }).on('initialized.owl.carousel', function(event) {
        console.log('Collaborations Carousel initialized');
    });

    // Fibonacci function for anti-spam
    function fibonacci(n) {
        let fib = [0, 1];
        for (let i = 2; i <= n; i++) {
            fib[i] = fib[i - 1] + fib[i - 2];
        }
        return fib[n];
    }

    // Generate Fibonacci question
    function generateFibonacciQuestion() {
        const randomN = Math.floor(Math.random() * 20) + 1;
        const answer = fibonacci(randomN);
        if (document.getElementById('human-question-label')) {
            document.getElementById('human-question-label').textContent = `What is the ${randomN}th Fibonacci number? (Anti-spam)`;
        } else {
            console.error("Element with ID 'human-question-label' not found.");
        }
        return answer;
    }

    // Set submission time
    function setSubmissionTime() {
        const now = new Date();
        document.getElementById("submissionTimeUTC").value = now.toISOString();
        document.getElementById("submissionTimeLocal").value = now.toLocaleString();
    }

    let correctAnswer = generateFibonacciQuestion();

    // Form submission
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('submissionTimeUTC').value = new Date().toISOString();
        const userAnswer = document.getElementById('human_verification').value;

        if (parseInt(userAnswer) !== correctAnswer) {
            alert("Incorrect answer to the math question. Please try again.");
            correctAnswer = generateFibonacciQuestion();
            return;
        }

        var formData = new FormData(this);
        fetch(this.action, {
            method: this.method,
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            alert(response.ok ? "Thank you for your message! We will get back to you shortly." : "Oops! There was a problem submitting your form.");
            if (response.ok) {
                this.reset();
                correctAnswer = generateFibonacciQuestion();
            }
        }).catch(error => {
            console.error('Error:', error);
            alert("Oops! There was a problem submitting your form.");
        });
    });

    // Error message display
    const urlParams = new URLSearchParams(window.location.search);
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        const status = urlParams.get('status');
        errorMessage.textContent = status === 'error' ? "Failed to send email. Please try again later." : status === 'invalid' ? "Invalid input. Please check your form and try again." : "";
        errorMessage.style.display = status ? 'block' : 'none';
    }

    // Year dropdown change handler
    function handleYearDropdownChange(event) {
        var selectedYear = event.target.value;
        showPapers(selectedYear);

        if (selectedYear) {
            const papersSection = document.getElementById('papers' + selectedYear);
            if (papersSection) {
                $('html, body').animate({ scrollTop: $(papersSection).offset().top - 150 }, 1000);
            }
        }
    }

    $('#navbarYearDropdown, #papersYearDropdown, #yearDropdown').change(handleYearDropdownChange);

    function showPapers(year) {
        console.log("showPapers called with year:", year);
        $('.year-section').removeClass('active');
        if (year) $('#papers' + year).addClass('active');
    }

    showPapers('');

    // Stats animation
    const aboutSection = document.querySelector('.about');
    const statsContainer = document.querySelector('.about .stats-container');
    const statsCard = document.querySelector('.about .stats-card');
    const statItems = document.querySelectorAll('.about .stat-item');

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function showStats() {
        if (isInViewport(aboutSection)) {
            console.log("About section is in viewport");
            setTimeout(() => {
                console.log("Showing stats");
                statsContainer.classList.add('show');
                statsCard.classList.add('show');
                statItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('show');
                    }, index * 100);
                });
            }, 3000);

            window.removeEventListener('scroll', showStats);
        }
    }

    window.addEventListener('scroll', showStats);
    showStats(); // Check on initial load
});