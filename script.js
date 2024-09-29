$(document).ready(function() {
    console.log("Document ready!");

   $(document).ready(function() {
       $(window).scroll(function() {
           $('.navbar').toggleClass("sticky", this.scrollY > 20);

           const word2 = $('.word2');
           if (this.scrollY > 0) {
               word2.addClass('hidden'); // Hide on scroll
           } else {
               word2.removeClass('hidden'); // Show on top of the page
           }
       });
   });

    $('.menu-btn').click(function() {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    if ($('.typing').length > 0) {
        new Typed(".typing", { strings: ["Professor"], typeSpeed: 100, backSpeed: 60, loop: true });
    }

    if ($('.typing-2').length > 0) {
        new Typed(".typing-2", { strings: ["Professor"], typeSpeed: 100, backSpeed: 60, loop: true });
    }

    if (window.location.href.match(/\/(index.html|home)?$/)) {
        document.getElementById('logo').classList.add('fixed-logo');
    }

//    $("#awards-features-carousel").owlCarousel({
//        loop: true,
//        margin: 20,
//        nav: true,
//        items: 4,
//        autoplay: true,
//        autoplayTimeout: 3000,
//        autoplayHoverPause: true,
//        responsive: {
//            0: { items: 1 },
//            600: { items: 2 },
//            1000: { items: 4 }
//        }
//    }).on('initialized.owl.carousel', function(event) {
//        console.log('Awards Features Carousel initialized');
//    });

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

    function fibonacci(n) {
        let fib = [0, 1];

        for (let i = 2; i <= n; i++) {
            fib[i] = fib[i - 1] + fib[i - 2];
        }
        return fib[n];
    }

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

    function setSubmissionTime() {
        const now = new Date();
        document.getElementById("submissionTimeUTC").value = now.toISOString();
        document.getElementById("submissionTimeLocal").value = now.toLocaleString();
    }

    let correctAnswer = generateFibonacciQuestion();

    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();

        document.getElementById('submissionTimeUTC').value = new Date().toISOString();

        const userAnswer = document.getElementById('human_verification').value;

        if (parseInt(userAnswer) !== correctAnswer) {
            alert("Incorrect answer to the math question. Please try again.");
            correctAnswer = generateFibonacciQuestion(); // Regenerate question on failure
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
                correctAnswer = generateFibonacciQuestion(); // Regenerate question after reset
            }
        }).catch(error => {
            console.error('Error:', error);
            alert("Oops! There was a problem submitting your form.");
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        const status = urlParams.get('status');
        errorMessage.textContent = status === 'error' ? "Failed to send email. Please try again later." : status === 'invalid' ? "Invalid input. Please check your form and try again." : "";
        errorMessage.style.display = status ? 'block' : 'none';
    }

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
});
