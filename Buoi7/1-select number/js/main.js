const boxs = document.querySelectorAll('.container .box');

boxs.forEach((box) => {
  box.onclick = function () {
    console.log(box.innerText);
  };
});