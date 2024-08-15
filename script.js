$(document).ready(function() {
    console.log("Document ready!");

    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    // applying smooth scroll on menu items click
    $('.navbar .menu li a').click(function(){
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script for two elements
    var typed = new Typed(".typing", {
        strings: ["Professor"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed2 = new Typed(".typing-2", {
        strings: ["Professor"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Get the current page URL
    const currentPageUrl = window.location.href;

    // Check if the current page is the home page
    if (currentPageUrl.endsWith("/index.html") || currentPageUrl.endsWith("/") || currentPageUrl.endsWith("/home")) {
        // Add a class to the logo element to apply fixed positioning
        const logoElement = document.getElementById('logo');
        logoElement.classList.add('fixed-logo');
    }

    // Initialize Owl Carousel
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        items: 3, // Adjust the number of items as needed
        autoplay: true,
        autoplayTimeout: 2000, // Adjust the autoplay speed if needed
        autoplayHoverPause: true
    }).on('initialized.owl.carousel', function(event) {
        console.log('Owl Carousel initialized');
    });

    // Handle form submission
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        var form = this;
        var formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json' // Ensure we expect JSON response
            },
        })
        .then(response => {
            if (response.ok) {
                alert("Thank you for your message! We will get back to you shortly.");
                form.reset(); // Reset the form after successful submission
            } else {
                return response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("Oops! There was a problem submitting your form.");
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Oops! There was a problem submitting your form.");
        });
    });


    // Handle URL parameters for error messages
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const errorMessage = document.getElementById('error-message');

    if (status === 'error') {
        errorMessage.textContent = "Failed to send email. Please try again later.";
        errorMessage.style.display = 'block';
    } else if (status === 'invalid') {
        errorMessage.textContent = "Invalid input. Please check your form and try again.";
        errorMessage.style.display = 'block';
    }

    // Function to show papers based on selected year
    function showPapers(year) {
        // Hide all year sections
        var sections = document.querySelectorAll('.year-section');
        sections.forEach(function(section) {
            section.classList.remove('active');
        });

        // Show the selected year's section
        if (year) {
            var sectionToShow = document.getElementById('papers' + year);
            if (sectionToShow) {
                sectionToShow.classList.add('active');
            }
        }
    }

    // Handle dropdown change event
    $('#year-select').change(function() {
        var selectedYear = $(this).val();
        showPapers(selectedYear);
    });
});
