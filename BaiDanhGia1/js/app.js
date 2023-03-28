function createId() {
  // trả về một chuỗi ngẫu nhiên gồm 12 ký tự: 0-9a-zA-Z;
  const characters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
  let length = 12;
  let charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    let idx = Math.floor(Math.random() * charactersLength);
    result += characters[idx];
  }
  return result;
}

const PRODUCTS = [
  {
    id: 'hBuZdx1elR5a',
    name: 'Fushigidane',
    thumb: 'Fushigidane.png',
    shortDesc:
      'Người ta thường thấy Fushigidane nằm ngủ dưới ánh nắng. Càng đắm mình trong nắng, hạt giống trên lưng chúng càng phát triển.',
    price: 12,
  },
  {
    id: 'fDQWzrgq6gXX',
    name: 'Hitokage',
    thumb: 'Hitokage.png',
    shortDesc: 'Tính cách ưa thích đồ nóng. Nghe nói khi trời mưa khói sẽ phụt ra từ đuôi của nó.',
    price: 15,
  },
  {
    id: 'aLjNSdeJi9Q2',
    name: 'Zenigame',
    thumb: 'Zenigame.png',
    shortDesc:
      'Chiếc mai của Zenigame không chỉ để tự vệ, mà còn làm giảm tối đa lực cản nước nhờ hình dáng tròn trịa cùng bề mặt nhiều rãnh, giúp chúng bơi nhanh hơn.',
    price: 25,
  },
  {
    id: 'rOYIHlZQlwdV',
    name: 'Pikachu',
    thumb: 'Pikachu.png',
    shortDesc: 'Những Pikachu có thể tạo ra dòng điện càng mạnh thì túi má càng mềm mại và lớn nhanh.',
    price: 32,
  },
  {
    id: 'zzC3HkWp9g4s',
    name: 'Purin',
    thumb: 'Purin.png',
    shortDesc:
      'Những bản thu âm tuyển tập bài hát ru kì lạ của Purin được bán tại các cửa hàng tạp hóa. Rất nhiều người coi chúng là vật gối đầu giường.',
    price: 9,
  },
];

let carts = [
  {
    id: 'qhZ2wNwZZW63',
    productId: 'hBuZdx1elR5a',
    quantity: 2,
  },
  {
    id: 'gijYjCti3BvR',
    productId: 'fDQWzrgq6gXX',
    quantity: 1,
  },
  {
    id: 'RQpImf7zc8ao',
    productId: 'aLjNSdeJi9Q2',
    quantity: 3,
  },
  {
    id: 'LPobAEvux29H',
    productId: 'rOYIHlZQlwdV',
    quantity: 6,
  },
  {
    id: 'PpLjmYoKdRG1',
    productId: 'zzC3HkWp9g4s',
    quantity: 1,
  },
];

const $ = document.querySelector.bind(document);

HTMLElement.prototype.find = function (selector) {
  return this.querySelectorAll(selector);
};

HTMLElement.prototype.prev = function () {
  return this.previousElementSibling;
};

HTMLElement.prototype.next = function () {
  return this.nextElementSibling;
};

HTMLElement.prototype.siblings = function (selector) {
  return this.closest('div').find(selector).item(0);
};

const App = {
  cart: []
};

App.ready = function (callback) {
  if (typeof callback === 'function') {
    callback();
  }
};

App.addToCart = function (productId, data) {
  const indexOfProductInCart = this.cart.findIndex(item => item.productId === productId);

  const { quantity } = data;

  if (indexOfProductInCart !== -1) {
    const { quantity: quantityOfCartItem, ...props } = this.cart[indexOfProductInCart];

    return this.cart[indexOfProductInCart] = {
      ...props,
      quantity: quantity + quantityOfCartItem
    };
  }

  return this.cart.push({
    id: createId(),
    productId,
    quantity,
  });
};

App.renderProductList = function ({ container, products }) {
  products.forEach((product) => {
    const { id, name, price, thumb } = product;

    const productElement = `
      <div class="row align-items-center" data-id="${id}">
        <div class="col-6 col-md-4">
          <img src="img/${thumb}" alt="" class="img-fluid">
        </div>
        <div class="col-6 col-md-8">
          <h6>${name}</h6>
          <div class="form-group">
            <div class="d-flex">
              <button class="btn btn-primary"> - </button>
              <input type="text" class="form-control mx-1" value="1" min="1">
              <button class="btn btn-primary"> + </button>
            </div>
            <button class="btn btn-danger btn-block mt-1 btn-add-to-cart">$${price}</button>
          </div>
        </div>
      </div>
      `;

    container.insertAdjacentHTML('beforeend', productElement);
  });
};

App.onUpdate = function (cartId, data, cardProducts, products) {
  const indexOfCartItem = this.cart.findIndex(item => item.id === cartId);

  if (indexOfCartItem !== -1) {
    const { ...props } = this.cart[indexOfCartItem];
    const { quantity } = data;

    this.cart[indexOfCartItem] = {
      ...props,
      quantity
    };

    App.renderCart({ products, cardProducts });
  }
};

App.onDelete = function (cartId, cardProducts) {
  this.cart = this.cart.filter(item => item.id !== cartId);

  App.renderCart({ products: PRODUCTS, cardProducts });
};

App.renderCart = function ({ products, cardProducts }) {
  const total = $('#total');

  cardProducts.innerHTML = null;
  let totalPrice = 0;

  this.cart.forEach((item, cartItemIndex) => {
    const { id, quantity, productId } = item;

    const product = products.find(item => item.id === productId);

    if (!product) {
      console.log('Product not found. Cannot adding product to cart');
      return;
    }

    const { name, price } = product;
    const subTotal = price * quantity;

    totalPrice += subTotal;

    const cartItemElement = `
      <tr data-id="${id}">
        <td>${++cartItemIndex}</td>
        <td>${name}</td>
        <td>${price}</td>
        <td>
          <input type="number" class="form-control" value="${quantity}">
        </td>
        <td><span class="fw-bold">$${subTotal}</span></td>
        <td>
          <button type="button" class="btn btn-link btn-sm btn-rounded btn-update">Update</button>
          <button type="button" class="btn btn-link btn-sm btn-rounded btn-delete">Delete</button>
        </td>
      </tr>
      `;

    cardProducts.insertAdjacentHTML('beforeend', cartItemElement);

  });

  total.innerText = total.innerText.replace(/\d+/g, totalPrice);
};

App.delegateEvent = function ({ container, cardProducts, products }) {
  const input = container.find('input[type="text"]');

  input.forEach(element => {
    const btnSubtract = element.prev();
    const btnAdd = element.next();
    const btnAddToCart = element.closest('.form-group').find('.btn-add-to-cart').item(0);

    btnSubtract.addEventListener('click', function () {
      const input = this.siblings('input[type="text"]');
      let quantity = parseInt(input.value);

      if (quantity < 1) {
        return;
      }

      input.value = --quantity;
    });

    btnAdd.addEventListener('click', function () {
      const input = this.siblings('input[type="text"]');
      let quantity = parseInt(input.value);

      input.value = ++quantity;
    });

    btnAddToCart.addEventListener('click', function () {
      const productId = this.closest('.row').getAttribute('data-id');
      const input = this.closest('.form-group').find('input[type="text"]').item(0);

      const quantity = parseInt(input.value);

      if (quantity < 1) return;

      const data = {
        quantity,
      };

      if (productId) {
        App.addToCart(productId, data);
        App.renderCart({ products: PRODUCTS, cardProducts });
      }
    });
  });

  cardProducts.addEventListener('click', function (evt) {
    const element = evt.target;

    if (element.classList.contains('btn-delete')) {
      const tr = evt.target.closest('tr');
      const cartId = tr.getAttribute('data-id');

      if (cartId) {
        App.onDelete(cartId, this);
      }
    } else if (element.classList.contains('btn-update')) {
      const tr = evt.target.closest('tr');
      const cartId = tr.getAttribute('data-id');
      const input = tr.find('input[type="number"]').item(0);

      const quantity = parseInt(input.value);

      const data = {
        quantity
      };

      App.onUpdate(cartId, data, cardProducts, products);
    }
  });
};

App.ready(function () {
  const listProducts = $('#listProducts');
  const cardProducts = $('#cardProducts');

  App.renderProductList({ container: listProducts, products: PRODUCTS });
  App.renderCart({ products: PRODUCTS, cardProducts });
  App.delegateEvent({ container: listProducts, cardProducts, products: PRODUCTS });
});







