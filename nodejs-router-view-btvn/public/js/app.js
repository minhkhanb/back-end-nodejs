const App = {};
const $ = document.querySelector.bind(document);

App.ready = function (callback) {
  if (typeof callback === 'function') {
    callback(this);
  }
};

App.ready(function () {
  const storage = localStorage.getItem('username');

  const isBrowser = () => {
    return this === window && this === document.defaultView;
  };

  if (!isBrowser()) {
    if (storage !== null) {
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    } else {
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
  }


  const btnLogin = $('.btn-login');
  const btnLogout = $('.btn-logout');

  if (btnLogin) {
    btnLogin.addEventListener('click', function () {
      localStorage.setItem('username', 'khale');

      window.location.href = '/';
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener('click', function (evt) {
      evt.preventDefault();

      localStorage.removeItem('username');

      window.location.href = '/login';
    });
  }
});