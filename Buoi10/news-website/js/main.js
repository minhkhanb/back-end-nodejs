(function ($) {
  'use strict';

  // Dropdown on mouse hover
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $('.navbar .dropdown').on('mouseover', function () {
          $('.dropdown-toggle', this).trigger('click');
        }).on('mouseout', function () {
          $('.dropdown-toggle', this).trigger('click').blur();
        });
      } else {
        $('.navbar .dropdown').off('mouseover').off('mouseout');
      }
    }

    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });


  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
    return false;
  });


  // Main News carousel
  $('.main-carousel').owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: true,
    loop: true,
    center: true,
  });


  // Tranding carousel
  $('.tranding-carousel').owlCarousel({
    autoplay: true,
    smartSpeed: 2000,
    items: 1,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>'
    ]
  });


  // Carousel item 1
  $('.carousel-item-1').owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ]
  });

  // Carousel item 2
  $('.carousel-item-2').owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 30,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 2
      }
    }
  });


  // Carousel item 3
  $('.carousel-item-3').owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 30,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      }
    }
  });


  // Carousel item 4
  $('.carousel-item-4').owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 30,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        items: 4
      }
    }
  });

})(jQuery);

(function () {
  const $ = document.querySelector.bind(document);

  // Định nghĩa hàm gọi api để fetch dữ liệu
  async function fetchNews() {
    const response = await fetch('http://apiforlearning.zendvn.com/api/categories_news');
    return await response.json();
  }

  // Định nghĩa hàm render danh sách menu
  async function loadCategories() {

    // Select element navbar
    const navbarElement = $('#navbarCollapse .navbar-nav');

    // Gọi hàm lấy dữ liệu categories
    const categories = await fetchNews();

    // Xóa tất cả element của navbar để chỗ load dữ liệu categories
    navbarElement.innerHTML = null;

    // Duyệt danh sách data vừa fetch được
    categories.map((category, index) => {
      // Lấy tên và đường dẫn liên kết
      const {name, slug} = category;

      // Tạo ra element anchor a
      const navItem = document.createElement('a');

      // Thêm classes cho element a
      navItem.classList.add('nav-item', 'nav-link');

      // Thêm class active cho menu item đầu tiên
      if (index < 1) {
        navItem.classList.add('nav-item', 'active');
      }

      // Thêm link cho element a
      navItem.href = `/${slug}.html`;

      // Load tên cho element a
      navItem.innerText = name;

      // Thêm element a vào navbar
      navbarElement.append(navItem);
    });
  }

  // Gọi hàm để render menu categories
  loadCategories();
})();

// http://apiforlearning.zendvn.com/api/get-gold
// http://apiforlearning.zendvn.com/api/get-coin
// http://apiforlearning.zendvn.com/api/categories_news/1/articles?offset=0&limit=10&sort_by=id&sort_dir=desc
(function () {

  const app = {
    apiUrl: `http://apiforlearning.zendvn.com/api`,
    // addArrayMethods() {
    //   Array.prototype.sortObjectProperties = function (currentValue) {
    //     const entriesSortObjectProperties = Object.entries(currentValue).sort(([keyOfA, valueOfA], [keyOfB, valueOfB]) => {
    //       return Number(valueOfA) && Number(valueOfB) ? keyOfA.localeCompare(keyOfB) : keyOfB.localeCompare(keyOfA);
    //     });
    //
    //     const entries = new Map(entriesSortObjectProperties);
    //
    //     return Object.fromEntries(entries);
    //   };
    //
    //   Array.prototype.sortArrByObjectSorted = function () {
    //     return this.reduce((acc, currentValue) => {
    //       const currentValueSorted = this.sortObjectProperties(currentValue);
    //
    //       acc.push(currentValueSorted);
    //
    //       return acc;
    //     }, []);
    //   };
    // },
//     getGold() {
//       return new Promise((resolve, reject) => {
//         fetch(`${this.apiUrl}/get-gold
// `)
//           .then(response => response.json())
//           .then(response => resolve(response))
//           .catch(err => reject(err));
//       });
//     },
    getCategories() {
      return new Promise((resolve, reject) => {
        fetch(`${this.apiUrl}/categories_news/1/articles?offset=0&limit=10&sort_by=id&sort_dir=desc
`)
          .then(response => response.json())
          .then(response => resolve(response))
          .catch(err => reject(err));
      });
    },
    // renderListGold(arr) {
    //   const goldPrice = document.querySelector('.gold-price');
    //   const table = document.createElement('table');
    //
    //   table.classList.add('table');
    //
    //   const thead = document.createElement('thead');
    //   thead.innerHTML = `<tr>
    //                     <th scope="col">LOẠI</th>
    //                     <th scope="col">MUA</th>
    //                     <th scope="col">BÁN</th>
    //                   </tr>`;
    //
    //   const tbody = document.createElement('tbody');
    //
    //   goldPrice.innerHTML = null;
    //
    //   table.append(thead);
    //   table.append(tbody);
    //
    //   arr.forEach((item) => {
    //     const tr = document.createElement('tr');
    //
    //     const {type, buy, sell} = item;
    //
    //     tr.innerHTML = `<td>${type}</td>
    //                   <td>${buy}</td>
    //                   <td>${sell}</td>`;
    //
    //     tbody.append(tr);
    //   });
    //
    //   goldPrice.append(table);
    // },
    formatPublishDate(dateString) {
      const date = new Date(dateString);
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };

      return date.toLocaleDateString('en', options);
    },
    renderCategories(categories) {
      console.log('render categories: ', categories);
      const latestNews = document.querySelector('.latest-news');
      const row = latestNews.querySelector('.row');

      let content = `<div class="col-12">
        <div class="section-title">
          <h4 class="m-0 text-uppercase font-weight-bold">Latest News</h4>
          <a class="text-secondary font-weight-medium text-decoration-none" href="">View All</a>
        </div>
      </div>`;

      // const innerHTML = row.innerHTML;
      content += (categories.map(category => {
        const {author, title, description, publish_date, link, thumb} = category;

        const publishDate = this.formatPublishDate(publish_date);

        return `
        <div class="col-lg-6">
            <div class="position-relative mb-3">
              <img class="img-fluid w-100" src="${thumb}" style="object-fit: cover;">
              <div class="bg-white border border-top-0 p-4">
                <div class="mb-2">
                  <a class="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2"
                     href="${link}">Business</a>
                  <a class="text-body" href="${link}"><small>${publishDate}</small></a>
                </div>
                <a class="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold" href="${link}">${title}</a>
                <p class="m-0">${description.toString().slice(0, 70).concat('...')}</p>
              </div>
              <div class="d-flex justify-content-between bg-white border border-top-0 p-4">
                <div class="d-flex align-items-center">
                  <img class="rounded-circle mr-2" src="img/user.jpg" width="25" height="25" alt="">
                  <small class="text-capitalize">${author}</small>
                </div>
                <div class="d-flex align-items-center">
                  <small class="ml-3"><i class="far fa-eye mr-2"></i>12345</small>
                  <small class="ml-3"><i class="far fa-comment mr-2"></i>123</small>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join(''));

      row.innerHTML = content;
    },
    init() {
      // this.addArrayMethods();

      // this.getGold().then(goldData => {
      //   const goldSorted = goldData.sortArrByObjectSorted();
      //
      //   this.renderListGold(goldSorted);
      // });

      this.getCategories().then(categories => {
        this.renderCategories(categories);
      }).catch(err => console.log('Render categories failed with err: ', err.message));
    }
  };

  app.init();
})();

