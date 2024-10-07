Animated Fiesta Webpage

Overview

Animated Fiesta is a dynamic, interactive webpage featuring a variety of animations, carousels, and form functionalities. The webpage has responsive design elements, including a sticky navigation bar, mobile menu toggling, a carousel for displaying collaborations, and a contact form that incorporates anti-spam protection using a Fibonacci number verification system.

Project Structure
The project is organized into several key directories and files:

yaml
Copy code
animated-fiesta/
├── .idea/                        # IntelliJ project folder (for development environment settings)
├── 2013 Papers/                  # Folder for storing 2013 papers
├── 2014 Papers/                  # Folder for storing 2014 papers
├── 2015 Papers/                  # Folder for storing 2015 papers
├── 2016 Papers/                  # Folder for storing 2016 papers
├── 2017 Papers/                  # Folder for storing 2017 papers
├── 2018 Papers/                  # Folder for storing 2018 papers
├── 2019 Papers/                  # Folder for storing 2019 papers
├── 2020 Papers/                  # Folder for storing 2020 papers
├── 2021 Papers/                  # Folder for storing 2021 papers
├── 2022 Papers/                  # Folder for storing 2022 papers
├── 2023 Papers/                  # Folder for storing 2023 papers
├── 2024 Papers/                  # Folder for storing 2024 papers
├── images/                       # Directory containing image assets used on the webpage
├── confirmation.html             # Contact form confirmation page
├── page.html                     # Main HTML file for the webpage
├── script.js                     # Main JavaScript file for interactions and animations
├── style.css                     # Main stylesheet for custom styles
└── External Libraries/           # Directory for external libraries (e.g., OwlCarousel)

Key Features

Sticky Navbar & Scroll Effects:

The navigation bar sticks to the top when scrolling down and hides part of the logo when the page is scrolled.
Mobile Menu:

The mobile menu toggles open and closed with an icon, and automatically closes when a link is clicked.
Typing Animations:

Text animations are used to create a dynamic typing effect that loops through certain strings.
Collaborations Carousel:

The carousel allows showcasing collaboration cards with responsive design. Dots for pagination are added on mobile screens.
Contact Form with Anti-Spam Protection:

A Fibonacci number-based anti-spam system ensures submissions are valid, with both UTC and local submission time recorded.
Error messages are handled, with feedback provided based on the form submission status.
Year Selection for Papers:

A dropdown allows users to filter papers by year, and the page automatically scrolls to the relevant papers section when a year is selected.
Stats Animation:

Statistics in the "About" section are revealed with a delayed animation once the section is in view.
Libraries and Dependencies
Owl Carousel: A jQuery plugin used to create the carousel for the collaboration section.
Typed.js: A JavaScript library for creating animated typing effects.

How to Use
Setup: Clone the project and open the page.html file in your preferred browser. Make sure to include the external libraries such as owl.carousel.min.js and typed.js.

Navigating the Webpage:

The navigation bar remains fixed as you scroll through the webpage.
On mobile, click the menu icon to reveal navigation options.
Viewing Collaborations:

Use the carousel to browse through collaboration cards.
On mobile, pagination dots appear below the carousel to indicate your current position.
Filtering Papers by Year:

Use the dropdown to select a year and view papers from that specific year. The page will scroll to the section displaying those papers.
Contact Form:

Fill in your details and answer the Fibonacci anti-spam question. Upon successful submission, the form will validate the input and send it using Formspree.
Customization
Adding New Papers:

New papers for a specific year can be added by placing them in the corresponding folder (e.g., 2013 Papers/, 2014 Papers/, etc.).
Modifying the Carousel:

Update the items or content of the carousel by editing the HTML in the collaborations section and adjusting the carousel settings in script.js.
Contact Form Setup:

The form is configured to use Formspree for handling submissions. Update the form action URL in the HTML to point to your Formspree endpoint.

Known Issues

Fibonacci Anti-Spam: Users may occasionally enter incorrect answers, requiring them to refresh the question.
Mobile Menu Positioning: On smaller screens, the position of the menu might need further adjustment depending on specific device sizes.
