import { modalManager } from "./modalManager.js";
import { scrollManager } from "./strollManager.js";

export const formManager = (() => {
  const btnTalk = document.querySelector(".btn-talkForma");
  const contactForm = document.getElementById("contactForm");
  const successPopup = document.getElementById("successPopup");

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function showError(fieldName, message) {
    const input = contactForm[fieldName];
    const errorDiv = document.getElementById("error" + capitalize(fieldName));
    input.classList.add("error");
    errorDiv.textContent = message;
  }

  function clearErrors() {
    ["name", "email", "message"].forEach((field) => {
      const input = contactForm[field];
      const errorDiv = document.getElementById("error" + capitalize(field));
      input.classList.remove("error");
      errorDiv.textContent = "";
    });
  }

  function validate() {
    let valid = true;

    clearErrors();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (name.length === 0) {
      showError("name", "Please enter your name");
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length === 0) {
      showError("email", "Please enter your email");
      valid = false;
    } else if (!emailRegex.test(email)) {
      showError("email", "Please enter a valid email");
      valid = false;
    }

    if (message.length === 0) {
      showError("message", "Please enter your message");
      valid = false;
    }

    return valid;
  }

  function showSuccessPopup() {
    successPopup.classList.add("show");
    setTimeout(() => {
      successPopup.classList.remove("show");
    }, 5000);
  }

  function resetForm() {
    clearErrors();
    contactForm.reset();
  }

  function init() {
    btnTalk.addEventListener("click", () => {
      modalManager.openModal();
      scrollManager.disableScroll();
    });

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!validate()) return;

      // или https: //reqres.in/api/users или http://localhost:9000/Post
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: contactForm.name.value.trim(),
          email: contactForm.email.value.trim(),
          message: contactForm.message.value.trim()
        })
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network error");
          return response.json();
        })
        .then((data) => {
          closeModal();
          showSuccessPopup();
        })
        .catch(() => {
          alert("Something went wrong. Please try again later.");
        });
    });
    modalManager.init();
  }

  return {
    init
  };
})();
