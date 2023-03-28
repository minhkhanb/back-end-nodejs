const content = document.querySelector('#content');

(function (content) {
  const BT = {
    identAlign() {
      const dropdown = document.querySelector('#slb-text-align');

      const alignState = {
        left: 'left',
        right: 'right',
        center: 'center',
        justify: 'justify'
      };


      dropdown.onchange = function (evt) {
        const align = evt.target.value;

        return content.style.textAlign = alignState[align];
      };
    },

    lightHeight() {
      const dropdown = document.querySelector('#slb-line-height');

      dropdown.onchange = function (evt) {
        content.style.lineHeight = evt.target.value;
      };
    },

    setBackground() {
      const backgroundColorItems = document.querySelectorAll('#background-color button');

      backgroundColorItems.forEach((item) => {
        item.onclick = (evt) => {
          content.style.backgroundColor = evt.target.innerText.toLowerCase();
        };
      });
    },

    run() {
      this.setBackground();
    }
  };

  BT.run();
})(content);

{
  NodeList.prototype.onClick = function (callback, args) {
    let i = 0, len = this.length;

    for (; i !== len; ++i) {
      this[i].onclick = function (evt) {
        const color = this.getAttribute('data-value');
        callback.call(args, color, i);
      };
    }
  };

  NodeList.prototype.setSize = function (callback, args) {
    let i = 0, len = this.length;

    for (; i !== len; ++i) {
      this[i].onclick = function (evt) {
        const color = this.getAttribute('data-value');
        callback.call(args, color, i);
      };
    }
  };

  const backgroundColorItems = document.querySelectorAll('#background-color button');

  backgroundColorItems.onClick((currentColor, index) => content.style.backgroundColor = currentColor);
}

{
  const btnDesc = document.querySelector('#btn-desc');
  const btnAsc = document.querySelector('#btn-asc');


  const getDefaultFontSize = () => {
    const element = document.createElement('div');
    element.style.width = '1rem';
    element.style.display = 'none';

    document.body.append(element);

    const widthMatch = window
      .getComputedStyle(element)
      .getPropertyValue('font-size')
      .match(/\d+/);

    console.log(widthMatch);

    element.remove();

    if (!widthMatch || widthMatch.length < 1) {
      return null;
    }

    const result = Number(widthMatch[0]);
    return !isNaN(result) ? result : null;
  };

  let currentFontSize = getDefaultFontSize();

  btnDesc.onclick = () => {
    --currentFontSize;
    console.log(currentFontSize);
    content.style.fontSize = `${currentFontSize}px`;
  };

  btnAsc.onclick = () => {
    ++currentFontSize;
    console.log(currentFontSize);
    content.style.fontSize = `${currentFontSize}px`;
  };
}


