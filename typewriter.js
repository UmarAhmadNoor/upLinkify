class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

// ************************************************


// JS CODE FOR FORMS


// *************************************************

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
      // Validate email format
      const emailInput = document.querySelector(".email-input");
      if (!isValidEmail(emailInput.value)) {
          alert("Please enter a valid email address.");
          event.preventDefault();
          return;
      }

      // Validate phone format
      const phoneInput = document.querySelector(".phone-input");
      if (!isValidPhone(phoneInput.value)) {
          alert("Please enter a valid phone number.");
          event.preventDefault();
          return;
      }

      // Validate all fields are filled
      const inputs = document.querySelectorAll(".text-input");
      for (const input of inputs) {
          if (!input.value.trim()) {
              alert("Please fill in all fields.");
              event.preventDefault();
              return;
          }
      }
  });

  function isValidEmail(email) {
      // Use a regular expression to validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }

  function isValidPhone(phone) {
      // Use a regular expression to validate phone format
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phone);
  }
});
