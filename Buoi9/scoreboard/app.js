// Lấy danh sách action
const actions = document.querySelectorAll('.action');

// Duyệt từng action
actions.forEach((action) => {
  // Lấy danh sách button của từng action
  const scoreNums = action.querySelectorAll('button');

  // Duyệt tất cả các button của mỗi action
  scoreNums.forEach((scoreNum) => {
    // Lắng nghe sự kiện click của từng button của mỗi action
    scoreNum.addEventListener('click', (evt) => {
      // Lấy giá trị của button mình vừa click
      const score = evt.target.innerText;

      // Select tới box score của mỗi action
      const boxScore = evt.target.closest('.box-score-wrapper').querySelector('.box-score');

      // Tính score của mỗi action
      const currentScore = +boxScore.innerText + +score;

      // Render score
      boxScore.innerText = currentScore < 10 ? '0'.concat(currentScore.toString()) : currentScore;
    });
  });
});

