let valueDisplays = document.querySelectorAll(".num");
let totalDuration = 3000; // 3 seconds

// Function to start the counting effect
const startCounting = (valueDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let duration = 20; // 20ms interval for updating the value
    let step = endValue / (totalDuration / duration); // Calculate step size based on total duration and interval
    
    let counter = setInterval(function () {
        startValue += step;
        valueDisplay.textContent = Math.round(startValue); // Round the value to avoid decimals
        if (startValue >= endValue) {
            valueDisplay.textContent = endValue; // Ensure the final value is set correctly
            clearInterval(counter);
        }
    }, duration);
};

// Intersection Observer options
const options = {
    root: null, // Use the viewport as the root
    rootMargin: "0px",
    threshold: 0.1 // Trigger when 10% of the element is visible
};

// Intersection Observer callback
const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounting(entry.target); // Start counting when the element is in view
            observer.unobserve(entry.target); // Stop observing once counting starts
        }
    });
};

// Create an Intersection Observer
const observer = new IntersectionObserver(callback, options);

// Observe each valueDisplay element
valueDisplays.forEach((valueDisplay) => {
    observer.observe(valueDisplay);
});


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

