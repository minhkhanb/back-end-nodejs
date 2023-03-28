//#region bai tap o lop
{// productsListElement: thẻ div có class là products-list.
  // const productsListElement = document.querySelector('.products-list');
// firstProductElement: thẻ div đầu tiên có class là product.
//   const firstProductElement = productsListElement.querySelector('.product:first-child');
// buttonElements: tất cả các thẻ button.
//   const buttonElements = document.querySelectorAll('button');

  // console.log(productsListElement);
  // console.log(firstProductElement);
  // console.log(buttonElements);
}
{
// lấy hết các li trong box_1
//   const box1 = document.querySelector('.box_1');
//   const liCollection = box1.querySelectorAll('li');

  // console.log(liCollection);
}

{
  // lấy element h1 thứ 2 trong class box
  // const box = document.querySelector('.box');
  // const h1Thu2 = box.querySelector('h1:nth-child(2)');
  //
  // console.log(h1Thu2);
}
{
  // // Thêm thuộc tính title có giá trị " Học lập trình để đi làm" cho thẻ h1.
  // const h1 = document.querySelector('h1');
  // h1.title = `Học lập trình để đi làm`;
  //
  // // Thêm thuộc tính data-title có giá trị "F8 - Học lập trình để đi làm" cho thẻ h1.
  // h1.setAttribute('data-title', 'F8 - Học lập trình để đi làm');
  //
  // // Thêm thuộc tính href có giá trị "https://nestech.edu.vn/" cho thẻ a.
  // const link = document.querySelector('a');
  // link.href = `https://nestech.edu.vn/`;
  //
  // // Thêm thuộc tính target có giá trị "_blank" cho thẻ a.
  // link.target = `_blank`;
  // console.log(h1, link);
}

{
  // Các bạn hãy thay đổi nội dung của thẻ h1 thành Nestech - Học lập trình để đi làm
  // const h1 = document.querySelector('h1');
  // h1.innerText = `Nestech - Học lập trình để đi làm`;
  //
  // console.log(h1);
}

{
  // Các bạn hãy viết hàm render nhận vào 1 tham số là html, hàm render sẽ có nhiệm vụ chèn giá trị của html vào trong thẻ ul đã cho trước.

// render(`
//     <li>Khóa học HTML</li>
//     <li>Khóa học JS</li>
//     <li>Khóa học PHP</li>
// `)
//   const render = (html) => {
//     const ul = document.querySelector('ul');
//
//     ul.innerHTML = html;
//   }
//
//   const html = `
//     <li>Khóa học HTML</li>
//     <li>Khóa học JS</li>
//     <li>Khóa học PHP</li>
//   `;
//
//   render(html);
}

{
  // Các bạn hãy viết hàm render có 1 tham số courses, hàm render sẽ thêm các item của mảng courses để tạo thành 1 danh sách các khóa học trên giao diện.
  // var courses = ['HTML & CSS', 'Javascript', 'PHP', 'Java']
  // Element.prototype.renderCourses = function (courses) {
  //   const coursesElement = courses.map(course => `<li>${course}</li>`);
  //
  //   this.innerHTML = coursesElement.join('');
  // };
  //
  // // const render = (courses) => {
  // //   const coursesList = document.querySelector('.courses-list');
  // //   const coursesElement = courses.map(course => `<li>${course}</li>`);
  // //
  // //   coursesList.innerHTML = coursesElement.join('');
  // // };
  //
  // const courses = ['HTML & CSS', 'Javascript', 'PHP', 'Java'];
  //
  // // render(courses);
  //
  // const coursesList = document.querySelector('.courses-list');
  // coursesList.renderCourses(courses);
}
//#endregion

//#region bai tap ve nha
{
  const priceList = [
    {
      "buy": "66.450",
      "sell": "67.050",
      "type": "Vàng SJC 1L - 10L"
    },
    {
      "buy": "54.950",
      "sell": "55.900",
      "type": "Vàng nhẫn SJC 99,99 1 chỉ, 2 chỉ, 5 chỉ"
    },
    {
      "buy": "54.950",
      "sell": "56.000",
      "type": "Vàng nhẫn SJC 99,99 0,5 chỉ"
    },
    {
      "buy": "54.800",
      "sell": "55.500",
      "type": "Vàng nữ trang 99,99%"
    },
    {
      "buy": "53.650",
      "sell": "54.950",
      "type": "Vàng nữ trang 99%"
    },
    {
      "buy": "39.779",
      "sell": "41.779",
      "type": "Vàng nữ trang 75%"
    },
    {
      "buy": "30.510",
      "sell": "32.510",
      "type": "Vàng nữ trang 58,3%"
    },
    {
      "buy": "21.296",
      "sell": "23.296",
      "type": "Vàng nữ trang 41,7%"
    }
  ];

  const coins = [
    {
      "id": 1,
      "name": "Bitcoin",
      "price": 28232.747237221054,
      "percent_change_24h": -0.23401747,
      "percent_change_1h": 0.16457418
    },
    {
      "id": 1027,
      "name": "Ethereum",
      "price": 1807.2933560774384,
      "percent_change_24h": -0.45224732,
      "percent_change_1h": 0.08319152
    },
    {
      "id": 825,
      "name": "Tether",
      "price": 1.0001725747067136,
      "percent_change_24h": 0.01459751,
      "percent_change_1h": 0.00740955
    },
    {
      "id": 1839,
      "name": "BNB",
      "price": 311.8991750079261,
      "percent_change_24h": -0.75074537,
      "percent_change_1h": -0.14582563
    },
    {
      "id": 3408,
      "name": "USD Coin",
      "price": 0.9997752273100083,
      "percent_change_24h": 0.02914833,
      "percent_change_1h": 0.01161586
    },
    {
      "id": 52,
      "name": "XRP",
      "price": 0.5127042029877314,
      "percent_change_24h": -2.07699299,
      "percent_change_1h": -0.01127495
    },
    {
      "id": 2010,
      "name": "Cardano",
      "price": 0.3926611419354596,
      "percent_change_24h": 2.2551565,
      "percent_change_1h": -0.56296763
    },
    {
      "id": 74,
      "name": "Dogecoin",
      "price": 0.07807436054253512,
      "percent_change_24h": -2.60036217,
      "percent_change_1h": 0.30419196
    },
    {
      "id": 3890,
      "name": "Polygon",
      "price": 1.1071020822238242,
      "percent_change_24h": -0.16019269,
      "percent_change_1h": 0.15062673
    },
    {
      "id": 5426,
      "name": "Solana",
      "price": 20.449812501463754,
      "percent_change_24h": -1.72110259,
      "percent_change_1h": 0.37922424
    }
  ];

  // Make table
  const body = document.body;

  Array.prototype.sortObjectProperties = function (currentValue) {
    const entriesSortObjectProperties = Object.entries(currentValue).sort(([keyOfA, valueOfA], [keyOfB, valueOfB]) => {
      return Number(valueOfA) && Number(valueOfB) ? keyOfA.localeCompare(keyOfB) : keyOfB.localeCompare(keyOfA);
    });

    const entries = new Map(entriesSortObjectProperties);

    return Object.fromEntries(entries);
  }

  Array.prototype.sortArrByObjectSorted = function () {
    return this.reduce((acc, currentValue) => {
      const currentValueSorted = this.sortObjectProperties(currentValue);

      acc.push(currentValueSorted)

      return acc;
    }, []);
  }

  HTMLTableElement.prototype.renderHeadCell = function (item) {
    const tr = document.createElement('tr');

    Object.keys(item).forEach((key => {
      const th = document.createElement('th');
      th.innerText = key.replaceAll(/_/g, ' ');

      tr.append(th);
    }));

    return tr;
  }

  HTMLTableElement.prototype.renderBodyCell = function (item) {
    const tr = document.createElement('tr');

    Object.keys(item).forEach((key => {
      const td = document.createElement('td');

      td.innerText = item[key];

      tr.append(td);
    }));

    return tr;
  }

  HTMLTableElement.prototype.renderHead = function (item) {
    const row = this.renderHeadCell(item);

    this.append(row);
  }

  HTMLTableElement.prototype.renderBody = function (arr) {
    arr.forEach((item) => {
      const row = this.renderBodyCell(item);

      this.append(row);
    });
  }

  function RenderTable(arr, isSort) {
    this.table = null;
    this.arr = arr;
    this.isSort = isSort;
  }

  RenderTable.prototype.sortArrByObjectSorted = function () {
    if (!this.isSort) return;

    this.arr = this.arr.sortArrByObjectSorted();
  }

  RenderTable.prototype.getFirstRecord = function () {
    return this.arr[0];
  }

  RenderTable.prototype.render = function () {
    const table = document.createElement('table')
    table.className = 'price-list';

    this.sortArrByObjectSorted();

    this.table = table;

    this.renderHead();
    this.renderBody();

    body.append(this.table);
  }

  RenderTable.prototype.renderHead = function () {
    const item = this.getFirstRecord();

    this.table.renderHead(item);
  }

  RenderTable.prototype.renderBody = function () {
    this.table.renderBody(this.arr);
  }

  const tableRenderer = new RenderTable(priceList, true);
  const coinRenderer = new RenderTable(coins);

  tableRenderer.render();
  coinRenderer.render();


}
//#endregion

