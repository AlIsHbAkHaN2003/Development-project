// active navbar
let nav = document.querySelector(".navigation-wrap");
window.onscroll = function () {
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add("scroll-on");
    } else {
        nav.classList.remove("scroll-on");
    }
}

// nav hide 
let navBar = document.querySelectorAll('.nav-link');
let navCollapse = document.querySelector('.navbar-collapse.collapse');
navBar.forEach(function (a) {
    a.addEventListener("click", function () {
        navCollapse.classList.remove("show");
    })
})

// counter design
document.addEventListener("DOMContentLoaded", () => {
    function counter(id, start, end, duration) {
        let obj = document.getElementById(id),
            current = start,
            range = end - start,
            increment = end > start ? 1 : -1,
            step = Math.abs(Math.floor(duration / range)),
            timer = setInterval(() => {
                current += increment;
                obj.textContent = current;
                if (current == end) {
                    clearInterval(timer);
                }
            }, step);
    }
    counter("count1", 0, 1287, 3000);
    counter("count2", 100, 5786, 2500);
    counter("count3", 0, 1440, 3000);
    counter("count4", 0, 7110, 3000);
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.newsletter');
    const emailInput = form.querySelector('input[name="email"]');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      const formData = new FormData(form);
      fetch('http://localhost:5000/subscribe', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        showPopup(data.message);
        if (data.message === 'Subscription failed. Please try again.') {
          console.log('Clearing input field'); // Debug message
          emailInput.value = ''; // Clear the input field
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showPopup('Subscription successful!');
        console.log('Clearing input field'); // Debug message
        emailInput.value = ''; // Clear the input field
      });
    });
  
    function showPopup(message) {
      const popupContainer = document.getElementById('popup-container');
      popupContainer.querySelector('.popup-message').textContent = message;
      popupContainer.style.display = 'block';
      setTimeout(() => {
        popupContainer.style.display = 'none';
      }, 3000); // Hide the popup after 3 seconds
    }
  });

 
  