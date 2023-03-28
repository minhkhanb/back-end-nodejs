{
  <!--Thêm class title vào thẻ h1-->
  <!--Thay thế class sub-title ở thẻ p bằng class content-->
  // const h1 = document.querySelector('h1');
  // const p = document.querySelector('.sub-title');
  // h1.classList.add('title');
  // p.classList.replace('sub-title', 'content');
}

{
  // Cho trước thẻ button, các bạn hãy viết code JS sao cho khi click vào button sẽ đổi màu chữ button sang màu #fff.
  // const button = document.querySelector('button');
  //
  // button.onclick = function() {
  //   this.classList.toggle('white');
  // }
  // const button = document.querySelector('button');
  // setInterval(() => button.classList.toggle('white'), 800);
}
{
  // Cho trước file HTML có các thẻ div, các bạn hãy thêm class box vào các thẻ div này nhé.
  const boxs = document.querySelectorAll('div');
  boxs.forEach((box) => box.classList.add('box'));
}