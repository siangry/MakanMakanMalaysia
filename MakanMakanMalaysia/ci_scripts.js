document.addEventListener('DOMContentLoaded', () => {
    //Down arrow click event
    const downArrow = document.querySelector('.ci-arrow-down a');

    downArrow.addEventListener('click', (event) => {
        event.preventDefault();
        const targetID = downArrow.getAttribute('href');
        document.querySelector(targetID).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.ci-his-timeline li');
    const eraImage = document.getElementById('ci-his-right-img');
    const eraDescription = document.getElementById('ci-his-right-desc');

    const eras = {
        'pre-colonial': {
            image: 'images/ci/precolonial.jpg',
            description: 'Indigenous ingredients like rice, coconut, bananas, and spices were staples. Cooking methods included grilling, steaming, and boiling.'
        },
        'colonial': {
            image: 'images/ci/colonial.jpg',
            description: 'Colonial powers introduced new ingredients and cooking techniques, such as the use of bread, cakes, and curries.'
        },
        'chinese': {
            image: 'images/ci/chinese.jpg',
            description: 'Chinese influence brought noodles, stir-frying, and soy sauce, enriching the Malaysian culinary landscape.'
        },
        'indian': {
            image: 'images/ci/indian.jpg',
            description: 'Indian influence is seen in the use of spices, rice dishes, and vegetarian meals, adding diversity to Malaysian cuisine.'
        },
        'modern': {
            image: 'images/ci/modern.jpg',
            description: 'Modern Malaysian cuisine is a fusion of traditional and contemporary influences, incorporating global culinary trends.'
        }
    };

    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            document.querySelector('.ci-his-timeline li.ci-his-active').classList.remove('ci-his-active');
            this.classList.add('ci-his-active');

            const era = this.getAttribute('data-era');
            eraImage.src = eras[era].image;
            eraDescription.textContent = eras[era].description;
        });
    });
});

//Traditions click event
let curSlide = 1;

function moveSlide(n) {
  showSlides(curSlide += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("ci-tdt-slide");
  
  if (n > slides.length) {curSlide = 1} // Wrap to the first slide
  if (n < 1) {curSlide = slides.length} // Wrap to the last slide

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; // Hide all slides
  }
  
  slides[curSlide - 1].style.display = "flex"; // Show the current slide and ensure it's displayed as a flex container
}

// Initial call to display the first slide when the page loads
showSlides(curSlide);

// Get the button
let mybutton = document.getElementById("myBtn");
            
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
