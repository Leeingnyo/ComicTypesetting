var ComicTypesetting = function (targetSelector, imgSrc) {

/*
if (imgSrc !== null && typeof imgSrc === 'object') {
  translateInformation = imgSrc;
  imgSrc = null;
}
*/

var wrapper = document.querySelector(targetSelector);
if (!wrapper) throw new Error('Can\'t find a wrapper, check your selector');

wrapper.classList.add('translated-manga-wrapper');
var imageWrapper = wrapper.querySelector('.gekijou-image');
if (!imageWrapper) {
  imageWrapper = document.createElement('img');
  imageWrapper.src = imgSrc;
  wrapper.appendChild(imageWrapper);
}
var translateItemsWrapper = wrapper.querySelector('.translate-items-wrapper');
if (!translateItemsWrapper) {
  translateItemsWrapper = document.createElement('ul');
  translateItemsWrapper.classList.add('translate-items-wrapper');
  wrapper.appendChild(translateItemsWrapper);
}
translateItemsWrapper.setAttribute('cloak', '');

this._wrapper = wrapper;
this._imageWrapper = imageWrapper;
this._translateItemsWrapper = translateItemsWrapper;

function adjustFontSizeWithImage() {
  translateItemsWrapper.style.fontSize = translateItemsWrapper.offsetWidth + 'px';
}

function init() {
  var obj = document.createElement('object');
  obj.classList.add('detect-resizer');
  obj.type = 'text/html';
  obj.onload = function () { this.contentDocument.defaultView.addEventListener('resize', adjustFontSizeWithImage); };
  obj.data = 'about:blank';
  translateItemsWrapper.parentNode.appendChild(obj);

  adjustFontSizeWithImage();

  translateItemsWrapper.removeAttribute('cloak');
};

if (imageWrapper.complete) {
  init();
} else {
  imageWrapper.addEventListener('load', function (event) {
    init();
  });
}

var itemCount = 0;
function generateItem(item) {
  itemCount++;
  var index = itemCount;
  return '<li class="'+['translate-item'].concat(item.type === 'serifu' ? [item.speaker] : []).join(' ')+'" style="'
      + Object.keys(item.style).filter(function (k) { return k !== 'z-index';})
          .map(function (k) { return ''+k+': '+item.style[k].replace(/"/g, '\'')+';'; })
          .concat(['z-index: '+(2147483647 - index + 1)+';']).join(' ')+'"><span>'+item.text+'</span></li>';
}

this.setItems = function (items) {
  translateItemsWrapper.innerHTML = items.map(generateItem).join('');
  this._bubbleItems = Array.from(translateItemsWrapper.querySelectorAll('.translate-item'));
}

};
