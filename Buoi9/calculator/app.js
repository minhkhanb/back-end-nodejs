const one = document.querySelector('#number-one');
const two = document.querySelector('#number-two');
const result = document.querySelector('#result');

const btnSum = document.querySelector('#btn-sum');
const btnSubtract = document.querySelector('#btn-subtract');
const btnMultiply = document.querySelector('#btn-multiply');
const btnDivide = document.querySelector('#btn-divide');

const Calculator = Math.constructor;
Calculator.prototype.sum = (a, b) => a + b;
Calculator.prototype.subtract = (a, b) => a - b;
Calculator.prototype.multiply = (a, b) => a * b;
Calculator.prototype.divide = (a, b) => a / b;

Element.prototype.calculator = function (nums, operator) {
  return this.addEventListener('click', function () {
    const value = Calculator[operator](...nums);

    result.innerText = `Result: ${value}`;
  });
}

const nums = [];
nums.length = 2;

one.addEventListener('change', evt => nums[0] = +evt.target.value);
two.addEventListener('change', evt => nums[1] = +evt.target.value);

btnSum.calculator(nums, 'sum');
btnSubtract.calculator(nums, 'subtract');
btnMultiply.calculator(nums, 'multiply');
btnDivide.calculator(nums, 'divide');

