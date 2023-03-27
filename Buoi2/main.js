/**
 * Fullstack version: {Frontend: 1}, {Backend: 2}
 * version format: <fullstack>.<k12>.<buoi2>
 *
 */
const LogLevel = {
  Student: 'Student',
  Teacher: 'Teacher'
};

const BTVN = {
  version: '2.12.2',
  bai1: function () {
    /*------------------------Bai 1--------------------------*/
    const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
    // Expected output: Array ["exuberant", "destruction", "present"]
    const newWords = words.slice(words.length / 2);
    console.log('newWords: ', newWords);
  },
  bai2: function () {
    /*------------------------Bai 2--------------------------*/
    const filtered = [12, 5, 8, 130, 44];
    // filtered is [12, 130, 44]
    const newFiltered = filtered.filter(num => num >= 12);
    console.log('filtered: ', newFiltered);
  },
  bai3: function () {
    /*------------------------Bai 3--------------------------*/
    const array1 = [5, 12, 8, 130, 44];
    // Expected output: 12
    const sorted = array1.sort((current, next) => current - next);
    const index = Math.floor(sorted.length / 2);
    const output = sorted[index];
    console.log('output: ', output);
  },
  bai4: function () {
    /*------------------------Bai 4--------------------------*/
    const inventory = [
      {name: 'apples', quantity: 2},
      {name: 'bananas', quantity: 0},
      {name: 'cherries', quantity: 5},
    ];
    // { name: 'cherries', quantity: 5 }
    const find = inventory.find(item => item.name === 'cherries');
    console.log('find: ', find);
  },
  bai5: function () {
    /*------------------------Bai 5--------------------------*/
    const array1 = [1, 4, 9, 16];
    // Expected output: Array [2, 8, 18, 32]
    const output = array1.map(num => num * 2);
    console.log('output: ', output);
  },
  bai6: function () {
    /*------------------------Bai 6--------------------------*/
    const numbers = [1, 4, 9];
    // roots is now     [1, 2, 3]
    const roots = numbers.map((num, index) => num / ++index);
    console.log('roots: ', roots);
  },
  bai7: function () {
    /*------------------------Bai 7--------------------------*/
    const array1 = [1, 2, 3, 4];

    // 0 + 1 + 2 + 3 + 4
    // Expected output: 10
    const output = array1.reduce((total, num) => total + num, 0);
    console.log('output: ', output);
  },
  bai8: function () {
    /*------------------------Bai 8--------------------------*/
    const array1 = ['a', 'b', 'c'];
    const a = array1.shift();
    console.log('a: ', a);

    const b = array1.shift();
    console.log('b: ', b);

    const c = array1.pop();
    console.log('c: ', c);

    // Expected output: "a"
    // Expected output: "b"
    // Expected output: "c"
  },
  bai9: function () {
    /*------------------------Bai 9--------------------------*/
    const ratings = [5, 4, 5];
    // expected output: 14
    const output = ratings.reduce((total, num) => total + num, 0);
    console.log('output: ', output);
  },
  bai10: function () {
    /*------------------------Bai 10--------------------------*/
    const arraySparse = [1, 3, /* empty */, 7];
    // { element: 1 }
    // { element: 3 }
    // { element: 7 }
    // { numCallbackRuns: 3 }
    arraySparse.forEach(num => console.log({element: num}));
  },
  bai11: function () {
    /*------------------------Bai 11--------------------------*/
    const array1 = [1, 30, 39, 29, 10, 13];
    // Expected output: true
    const output = array1.some(num => num % 3 === 0);
    console.log('output: ', output);
  },
  bai12: function () {
    /*------------------------Bai 12--------------------------*/
    // Làm phẳng mảng mảng
    let depthArray = [1, 2, [3, 4], 5, 6, [7, 8, 9]];
    // [1,2,3,4,5,6,7,8,9]
    const flat = depthArray.flat();
    console.log('flat: ', flat);
  },
  bai13: function () {
    /*------------------------Bai 13--------------------------*/
    // lấy các khóa học và đưa vào 1 mảng mới
    const Topics = [
      {
        topic: 'Front-end',
        coures: [
          {
            id: 1,
            title: 'HTML, CSS'
          },
          {
            id: 2,
            title: 'ReactJS'
          },
          {
            id: 3,
            title: 'Javacript'
          }
        ]
      },
      {
        topic: 'Back-end',
        coures: [
          {
            id: 1,
            title: 'PHP'
          },
          {
            id: 2,
            title: 'NodeJs'
          }
        ]
      }
    ];

    /**
     *  [{
      id: 1,
      title: 'HTML, CSS'
      },
     {
      id: 2,
      title: 'ReactJS'
    },
     {
      id: 3,
      title: 'Javacript'
    },
     {
      id: 1,
      title: 'PHP'
    },
     {
      id: 2,
      title: 'NodeJs'
    }]
     */

    const subjects = Topics.reduce((accumulator, currentToptic) => accumulator.concat(currentToptic.coures)
      , []);
    console.log('subjects: ', subjects);
  },
  runAt(bai, version, logLevel) {
    if (logLevel === LogLevel.Student) {
      console.log('%cRun code at version: %f', 'color: #0170b9; text-transform: uppercase;', version);
    }

    switch (bai) {
      case 1:
        return this.bai1();

      case 2:
        return this.bai2();

      case 3:
        return this.bai3();

      case 4:
        return this.bai4();

      case 5:
        return this.bai5();

      case 6:
        return this.bai6();

      case 7:
        return this.bai7();

      case 8:
        return this.bai8();

      case 9:
        return this.bai9();

      case 10:
        return this.bai10();

      case 11:
        return this.bai11();

      case 12:
        return this.bai12();

      case 13:
        return this.bai13();
    }
  },
  run: function () {
    this.runAt(1, this.version, LogLevel.Teacher);
  }
};

BTVN.run();





















