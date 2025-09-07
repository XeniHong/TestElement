export const scrollManager = (() => {
  function disableScroll() {
    document.body.style.overflow = "hidden";
  }

  function enableScroll() {
    document.body.style.overflow = "";
  }

  return {
    disableScroll,
    enableScroll
  };
})();
