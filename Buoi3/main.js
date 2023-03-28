/**
 * Fullstack version: {Frontend: 1}, {Backend: 2}
 * version format: <fullstack>.<k12>.<buoi3>
 *
 */
const LogLevel = {
  Student: 'Student',
  Teacher: 'Teacher'
};

const BTVN = {
  version: '2.12.3',
  bai1: function () {
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
  bai2: function () {
    var sports = [
      {
        name: 'Bơi lội',
        gold: 11
      },
      {
        name: 'Boxing',
        gold: 3
      },
      {
        name: 'Đạp xe',
        gold: 4
      },
      {
        name: 'Đấu kiếm',
        gold: 5
      },
    ];

    // getTotalGold(sports)
    const getTotalGold = (arr) => structuredClone(arr).reduce((total, sport) => total + sport.gold
      , 0);
    const output = getTotalGold(sports);

    // Expected results:
    console.log('Output: ', output);
    // Output: 23
  },
  bai3: function () {
    const sports = [
      {
        name: 'Bóng rổ',
        like: 6
      },
      {
        name: 'Bơi lội',
        like: 5
      },
      {
        name: 'Bóng đá',
        like: 10
      },
    ];

    // Kỳ vọng console.log(getMostFavoriteSport(sports))
    // Output: [{ name: 'Bóng rổ, like: 6 }, { name: 'Bóng đá, like: 10 }]
    const getMostFavoriteSport = (arr) => {
      const swim = 'Bơi lội';

      return structuredClone(arr).filter(sport => sport.name !== swim);
    };

    const arr = getMostFavoriteSport(sports);

    console.log('Output: ', arr);
  },
  bai4: function () {
    var watchList = [
      {
        'Title': 'Inception',
        'Year': '2010',
        'Rated': 'PG-13',
        'Released': '16 Jul 2010',
        'Runtime': '148 min',
        'Genre': 'Action, Adventure, Crime',
        'Director': 'Christopher Nolan',
        'Writer': 'Christopher Nolan',
        'Actors': 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy',
        'Plot': 'A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.',
        'Language': 'English, Japanese, French',
        'Country': 'USA, UK',
        'imdbRating': '8.8',
        'imdbVotes': '1,446,708',
        'imdbID': 'tt1375666',
        'Type': 'movie',
      },
      {
        'Title': 'Interstellar',
        'Year': '2014',
        'Rated': 'PG-13',
        'Released': '07 Nov 2014',
        'Runtime': '169 min',
        'Genre': 'Adventure, Drama, Sci-Fi',
        'Director': 'Christopher Nolan',
        'Writer': 'Jonathan Nolan, Christopher Nolan',
        'Actors': 'Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow',
        'Plot': 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        'Language': 'English',
        'Country': 'USA, UK',
        'imdbRating': '8.6',
        'imdbVotes': '910,366',
        'imdbID': 'tt0816692',
        'Type': 'movie',
      },
      {
        'Title': 'The Dark Knight',
        'Year': '2008',
        'Rated': 'PG-13',
        'Released': '18 Jul 2008',
        'Runtime': '152 min',
        'Genre': 'Action, Adventure, Crime',
        'Director': 'Christopher Nolan',
        'Writer': 'Jonathan Nolan (screenplay), Christopher Nolan (screenplay), Christopher Nolan (story), David S. Goyer (story), Bob Kane (characters)',
        'Actors': 'Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine',
        'Plot': 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.',
        'Language': 'English, Mandarin',
        'Country': 'USA, UK',
        'imdbRating': '9.0',
        'imdbVotes': '1,652,832',
        'imdbID': 'tt0468569',
        'Type': 'movie',
      },
      {
        'Title': 'Batman Begins',
        'Year': '2005',
        'Rated': 'PG-13',
        'Released': '15 Jun 2005',
        'Runtime': '140 min',
        'Genre': 'Action, Adventure',
        'Director': 'Christopher Nolan',
        'Writer': 'Bob Kane (characters), David S. Goyer (story), Christopher Nolan (screenplay), David S. Goyer (screenplay)',
        'Actors': 'Christian Bale, Michael Caine, Liam Neeson, Katie Holmes',
        'Plot': 'After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from the corruption that Scarecrow and the League of Shadows have cast upon it.',
        'Language': 'English, Urdu, Mandarin',
        'Country': 'USA, UK',
        'imdbRating': '8.3',
        'imdbVotes': '972,584',
        'imdbID': 'tt0372784',
        'Type': 'movie',
      },
      {
        'Title': 'Avatar',
        'Year': '2009',
        'Rated': 'PG-13',
        'Released': '18 Dec 2009',
        'Runtime': '162 min',
        'Genre': 'Action, Adventure, Fantasy',
        'Director': 'James Cameron',
        'Writer': 'James Cameron',
        'Actors': 'Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang',
        'Plot': 'A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
        'Language': 'English, Spanish',
        'Country': 'USA, UK',
        'imdbRating': '7.9',
        'imdbVotes': '876,575',
        'imdbID': 'tt0499549',
        'Type': 'movie',
      }
    ];

    // Cho trước danh sách một số bộ phim,
    // hãy viết hàm calculateRating để tính điểm trung bình IMDB
    // của những bộ phim mà Christopher Nolan làm đạo diễn.
    // Expected results
    const calculateRating = (arr) => {
      const totalImdbRating = arr.reduce((total, film) => total + parseFloat(film.imdbRating), 0);

      return totalImdbRating / arr.length;
    }

    console.log(calculateRating(watchList)); // Output: 8.675
  },
  bai5: function () {
    // --------------------IF/ELSE------------------------------
    // Khi a chia hết cho 3 thì
    // return về 1
    // Khi a chia hết cho 5 thì
    // return về 2
    // Khi a chia hết cho 15 thì
    // return về 3
    // Kỳ vọng console.log(run(3))
    // console.log(run(5))
    // console.log(run(15)) // 3
    const run = (a) => {
      if (a % 3 === 0 && a % 5 === 0) return 3;
      else if (a % 3 === 0) return 1;
      else if (a % 5 === 0) return 2;
    };

    const output = run(5);

    console.log(output);
  },
  bai6: function () {
    // Kỳ vọng
    // console.log(getCanVoteMessage(18)) // 'Bạn có thể bỏ phiếu'
    // console.log(getCanVoteMessage(15)) // 'Bạn chưa được bỏ phiếu'
    const getCanVoteMessage = (x) => {
      if (x === 18) {
        return 'Bạn có thể bỏ phiếu';
      } else if (x === 15) {
        return 'Bạn chưa được bỏ phiếu';
      }
    };

    const output = getCanVoteMessage(15);

    console.log(output);
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
    }
  },
  run: function () {
    this.runAt(4, this.version, LogLevel.Teacher);
  }
};

BTVN.run();





















