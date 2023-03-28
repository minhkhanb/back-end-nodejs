let count = 0;
const number = document.querySelector('#number');
const saveNumber = document.querySelector('#saved-number');

function decrease() {
  if (count <= 0) return;

  number.innerText = --count;
}

function increase() {
  number.innerText = ++count;
}

function save() {
  saveNumber.innerText = `Save Numbers: ${count}`;
}

