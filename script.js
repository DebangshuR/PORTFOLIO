document.addEventListener("DOMContentLoaded", function () {
  // Typing animation
  const words = ["a Web Developer", "an AI/ML Enthusiast", "a Programmer"];
  let wordIndex = 0;
  let charIndex = 0;
  let currentWord = '';
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const newWordDelay = 2000;

(function(){
    emailjs.init("_yJc2WKyDrHBoL2hJ"); // Replace with your EmailJS public key
})();
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    emailjs.sendForm('service_k8zi864', 'template_maqc7w4', this)
        .then(function() {
            document.getElementById('form-message').innerHTML = "Message sent successfully!";
            document.getElementById('contact-form').reset();
        }, function(error) {
            document.getElementById('form-message').innerHTML = "Failed to send message. Please try again later.";
        });
});

  function type() {
      if (charIndex < words[wordIndex].length) {
          currentWord += words[wordIndex].charAt(charIndex);
          document.querySelector('.typing-animation').textContent = currentWord;
          charIndex++;
          setTimeout(type, typingSpeed);
      } else {
          setTimeout(erase, newWordDelay);
      }
  }

  function erase() {
      if (charIndex > 0) {
          currentWord = currentWord.slice(0, -1);
          document.querySelector('.typing-animation').textContent = currentWord;
          charIndex--;
          setTimeout(erase, erasingSpeed);
      } else {
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, typingSpeed + 1100);
      }
  }

  type();

  // Animate progress bars
  const progressBars = document.querySelectorAll('.progress-done');

  progressBars.forEach(bar => {
      setTimeout(() => {
          bar.style.width = bar.getAttribute('data-done') + '%';
          bar.style.opacity = 1;
      }, 500);
  });

  // Animate circular skills
  const circles = document.querySelectorAll('.circle');

  circles.forEach(circle => {
      let percent = circle.getAttribute('data-percent');
      circle.style.setProperty('--percent', percent);
  });

  // Smooth scrolling for navigation
  document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          if(targetId !== '#') {
              document.querySelector(targetId).scrollIntoView({
                  behavior: 'smooth'
              });
          }
      });
  });

  // Form submission
  const contactForm = document.querySelector('.contact-form form');
  if(contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          alert('Thank you for your message! I will get back to you soon.');
          this.reset();
      });
  }
});

