const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach((item) => {
  item.onclick = () => {
    const accordionCollapse = item.querySelector('.accordion-collapse');
    accordionCollapse.classList.toggle('collapse');
  };
});