$(document).ready(function () {
  console.log("Document ready!");

  // Navbar sticky and logo hide on scroll
  $(window).scroll(function () {
    $(".navbar").toggleClass("sticky", this.scrollY > 20);

    const word2 = $(".word2");
    if (this.scrollY > 0) {
      word2.addClass("hidden");
    } else {
      word2.removeClass("hidden");
    }
  });

  // Mobile menu toggle
  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

  // Close mobile menu when a link is clicked
  $(".navbar .menu li a").click(function () {
    $(".navbar .menu").removeClass("active");
    $(".menu-btn i").removeClass("active");
  });

  // Typing animation
  if ($(".typing").length > 0) {
    new Typed(".typing", {
      strings: ["Professor"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });
  }
  if ($(".typing-2").length > 0) {
    new Typed(".typing-2", {
      strings: ["Professor"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });
  }

  // Fixed logo for home page
  if (window.location.href.match(/\/(index.html|home)?$/)) {
    document.getElementById("logo").classList.add("fixed-logo");
  }

  // Initialize the collaborations carousel on document ready
  initializeCollaborationsCarousel();

  // Initialize the collaborations carousel
  function initializeCollaborationsCarousel() {
    console.log("Initializing collaborations carousel");
    
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
        1000: { items: 4 },
      },
    })
    .on("initialized.owl.carousel", function (event) {
      console.log("Collaborations Carousel initialized");
      if ($(window).width() <= 947) {
        createDots(event.item.count);  // Only create dots for mobile size
      }
    })
    .on("changed.owl.carousel", function (event) {
      if ($(window).width() <= 947) {
        updateDots(event.item.index);  // Update dots on carousel change
      }
    });

    // Force reflow if the carousel doesn't show initially
    setTimeout(function () {
      $("#collaborations-carousel").trigger('refresh.owl.carousel');
    }, 100);  // 100ms delay to ensure carousel is ready
  }

  // Create pagination dots for mobile view
  function createDots(numSlides) {
    console.log("Creating dots, numSlides:", numSlides);
    const paginationDotsContainer = $(".pagination-dots");
    paginationDotsContainer.empty();

    for (let i = 0; i < numSlides; i++) {
      const dot = $('<span class="dot"></span>');
      if (i === 0) dot.addClass("active");
      dot.on("click", function () {
        $("#collaborations-carousel").trigger("to.owl.carousel", [i]);
      });
      paginationDotsContainer.append(dot);
    }
  }

  // Update active dot on carousel change
  function updateDots(activeIndex) {
    $(".dot").removeClass("active");
    $(".dot").eq(activeIndex).addClass("active");
  }

  // Fibonacci anti-spam question
  function fibonacci(n) {
    let fib = [0, 1];
    for (let i = 2; i <= n; i++) fib[i] = fib[i - 1] + fib[i - 2];
    return fib[n];
  }

  function generateFibonacciQuestion() {
    const randomN = Math.floor(Math.random() * 20) + 1;
    const answer = fibonacci(randomN);
    const label = document.getElementById("human-question-label");
    if (label) label.textContent = `What is the ${randomN}th Fibonacci number? (Anti-spam)`;
    return answer;
  }

  let correctAnswer = generateFibonacciQuestion();

  // Form submission handler
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Form submitted");

    const userAnswer = parseInt(document.getElementById("human_verification").value);
    if (userAnswer !== correctAnswer) {
      alert("Incorrect answer to the math question. Please try again.");
      correctAnswer = generateFibonacciQuestion();
      return;
    }

    var formData = new FormData(this);
    fetch(this.action, {
      method: this.method,
      body: formData,
      headers: { Accept: "application/json" },
    })
    .then((response) => {
      alert(response.ok ? "Thank you for your message!" : "Oops! There was a problem.");
      if (response.ok) {
        this.reset();
        correctAnswer = generateFibonacciQuestion();
      }
    })
    .catch(() => alert("Oops! There was a problem submitting your form."));
  });

  // Year dropdown change handler
  $("#navbarYearDropdown, #papersYearDropdown, #yearDropdown").change(function(event) {
    const selectedYear = event.target.value;
    showPapers(selectedYear);

    if (selectedYear) {
      const papersSection = document.getElementById("papers" + selectedYear);
      if (papersSection) {
        $("html, body").animate({ scrollTop: $(papersSection).offset().top - 150 }, 1000);
      }
    }
  });

  function showPapers(year) {
    $(".year-section").removeClass("active");
    if (year) $("#papers" + year).addClass("active");
  }

  // Stats animation
  const aboutSection = document.querySelector(".about");
  function showStats() {
    if (isInViewport(aboutSection)) {
      setTimeout(() => {
        $(".stats-container, .stats-card, .stat-item").addClass("show");
      }, 3000);
      window.removeEventListener("scroll", showStats);
    }
  }
  
  window.addEventListener("scroll", showStats);
});

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}
