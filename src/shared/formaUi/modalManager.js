export const modalManager = (() => {
  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");

  // блокируем скролл
  function openModal() {
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // появляется скролл
  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function init() {
    modalClose.addEventListener("click", closeModal);

    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  return {
    openModal,
    closeModal,
    init
  };
})();
