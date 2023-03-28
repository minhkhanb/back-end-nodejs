const img = document.querySelector('.container .image');

img.addEventListener('click', function () {
  const alt = this.getAttribute('alt');
  const src = this.getAttribute('src');

  let status = alt === 'turn_off' ? 'turn_on' : 'turn_off';

  this.setAttribute('src', src.replace(new RegExp(alt), status));
  this.setAttribute('alt', status);
});