(function () {
  const URL = 'http://localhost:3000';
  const productCarousel = document.querySelector('.product-carousel');
  const pricingGrid = document.querySelector('.pricing-grid');

  fetch(`${URL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json()).then(products => {
    productCarousel.innerHTML = products.map(({ title, thumbnail, price }) => `
    <div class="pb-5">
      <div class="product-item position-relative bg-light d-flex flex-column text-center">
        <img class="img-fluid mb-4" src="${thumbnail}" alt="">
        <h6 class="text-uppercase">${title}</h6>
        <h5 class="text-primary mb-0">$${price}</h5>
        <div class="btn-action d-flex justify-content-center">
          <a class="btn btn-primary py-2 px-3" href=""><i class="bi bi-cart"></i></a>
          <a class="btn btn-primary py-2 px-3" href=""><i class="bi bi-eye"></i></a>
        </div>
      </div>
    </div>
    `).join('');
  }).finally(() => {
    $('.product-carousel').owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      margin: 45,
      dots: false,
      loop: true,
      nav: true,
      navText: [
        '<i class="bi bi-arrow-left"></i>',
        '<i class="bi bi-arrow-right"></i>'
      ],
      responsive: {
        0: {
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
  });

  fetch(`${URL}/pricing`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json()).then((pricing) => {
    pricingGrid.innerHTML = pricing.map(({ type, price, features }) => `
        <div class="col-lg-4">
          <div class="bg-light text-center pt-5 ${type !== 'standard' ? 'mt-lg-5' : ''}">
            <h2 class="text-uppercase">${type}</h2>
            <h6 class="text-body mb-5">The Best Choice</h6>
            <div class="text-center ${type !== 'standard' ? 'bg-primary' : 'bg-dark'} p-4 mb-2">
              <h1 class="display-4 text-white mb-0">
                <small class="align-top"
                  style="font-size: 22px; line-height: 45px;">$</small>${price}<small
                  class="align-bottom" style="font-size: 16px; line-height: 40px;">/
                  Mo</small>
              </h1>
            </div>
            <div class="text-center p-4">
              ${Object.entries(features).map(([key, value]) => `
                <div class="d-flex align-items-center justify-content-between mb-1">
                  <span>${key} ${value}</span>
                  <i class="bi ${value ? 'bi-check2 text-primary' : 'bi-x text-danger'} fs-4"></i>
                </div>
              `).join('')}
              <a href="" class="btn btn-primary text-uppercase py-2 px-4 my-3">Order Now</a>
            </div>
          </div>
      </div>
    `).join('');
  });
})();