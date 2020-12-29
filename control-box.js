function ControlBox() {
  this.controlBox = this.el = html('div#control-box',
    fieldset(
      legend('말풍선 모양'),
      this.backgroundColor = colorPicker({ name: 'background-color', placeholder: 'bg color' }),
      label('알파', this.backgroundAlpha = rangeInput({ name: 'background-alpha', min: '0', max: '255', value: '255' })),
      this.resetButton = html('button', '리셋'),
      label(this.noBorder = checkbox({ name: 'no-border' }), ' border 해제'),
      html('br'),
      this.borderRadiusLT = numberInput({ name: 'border-radius-l-t', placeholder: 'l t', step: '0.1', min: '0', max: '100' }),
      this.borderRadiusRT = numberInput({ name: 'border-radius-r-t', placeholder: 'r t', step: '0.1', min: '0', max: '100' }),
      this.borderRadiusRB = numberInput({ name: 'border-radius-r-b', placeholder: 'r b', step: '0.1', min: '0', max: '100' }),
      this.borderRadiusLB = numberInput({ name: 'border-radius-l-b', placeholder: 'l b', step: '0.1', min: '0', max: '100' }),
      this.smartButton = html('button', { name: 'smart' }, '스마트'),
      this.effectButton = html('button', { name: 'effect' }, '이펙트'),
    ),
    fieldset(
      legend('말풍선 글자'),
      label('글자 크기 ', this.fontSize = numberInput({ name: 'font-size', step: '0.001', min: '0', max: '50' })),
      this.color = colorPicker({ name: 'color' }),
      label(this.textShadow = checkbox({ name: 'text-shadow', }), ' 글자 테두리'),
      this.shadowSize = numberInput({ name: 'shadow-size', max: '3', min: '0', value: '1' }),
      this.shadowColor = colorPicker({ name: 'font-border-color' }),
      html('br'),
      label('볼드 체크 ', this.fontWeight = checkbox({ name: 'font-weight' })),
      label('정렬 (1 0 -1) ', this.textAlign = numberInput({ name: 'text-align', min: '-1', max: '1' })),
      label('효과 글씨체 ', this.fontFamily =checkbox({ name: 'font-family' }))
    ),
    fieldset(
      legend('기타'),
      this.rotate = numberInput({ name: 'rotate', placeholder: 'rotate', step: '0.5', min: '-180', max: '180' }), ' ',
      label('패딩 체크 ', this.padding = checkbox({ name: 'padding' })), ' ',
      label('word break 체크 ', this.wordBreak = checkbox({ name: 'word-break' }))
    )
  );

  this.borderRadiusEdit = [
    this.borderRadiusLT,
    this.borderRadiusRT,
    this.borderRadiusRB,
    this.borderRadiusLB
  ];
}
ControlBox.prototype.getShadow = function () {
  if (!this.textShadow.checked)  return '';
  var color = this.shadowColor.value;
  var shadows = [];
  var size = this.shadowSize.value;
  for (let i = -size; i <= size; i++) {
    for (let j = -size; j <= size; j++) {
      shadows.push(`${color} ${i}px ${j}px 0px`);
    }
  }
  return shadows.join(', ');
};
ControlBox.prototype.bindCssControl = function (dom) {
  this.backgroundColor.value = dom.style.backgroundColor || this.backgroundColor.value;
  this.backgroundColor.oninput = () => { dom.style.backgroundColor = this.backgroundColor.value; };

  this.backgroundAlpha.value = 255 || dom.style.backgroundColor; // TODO

  this.smartButton.onclick = () => {
    dom.style.background = getSmartBackground(dom, pixelPicker);
    dom.style.border = 'none';
    dom.style.textAlign = 'center';
    // dom.style.borderRadius
    // dom.style.top =
    // dom.style.left =
    // dom.style.width =
    // dom.style.height =

    this.noBorder.checked = true;
    this.textAlign.value = 0;
    // borderRadiusEdit[i] = borderRadiusValues[i]
  };

  this.effectButton.onclick = () => {
    dom.style.border = 'none';
    dom.style.fontFamily = 'Nanum Pen Script';
    dom.style.fontSize = '0.06em';

    this.noBorder.checked = true;
    this.fontSize.value = 0.06;
    this.textShadow.checked = true;
    this.shadowSize.value = 2;
    this.shadowColor.value = '#FFFFFF';
    this.fontFamily.checked = true;

    dom.style.textShadow = this.getShadow();
  };

  var borderRadius = dom.style.borderRadius || '';
  var borderRadiusValues = [0, 0, 0, 0];
  if (borderRadius) {
    borderRadiusValues = borderRadius.split(' ').map(value => parseFloat(value));
    if (borderRadiusValues.length === 1) {
      var ooo = borderRadiusValues[0];
      borderRadiusValues = [ooo, ooo, ooo, ooo];
    } else if (borderRadiusValues.length === 2) {
      var ooo = borderRadiusValues[0];
      var oo2 = borderRadiusValues[1];
      borderRadiusValues = [ooo, oo2, ooo, oo2];
    } else if (borderRadiusValues.length === 3) {
      var ooo = borderRadiusValues[0];
      borderRadiusValues[3] = ooo;
    }
  }
  for (let i of Array.from(new Array(4).keys())) {
    this.borderRadiusEdit[i].value = borderRadiusValues[i] || 0;
    this.borderRadiusEdit[i].onchange = () => {
      borderRadiusValues[i] = this.borderRadiusEdit[i].value;
      computeBorderRadius();
    };
  }
  function computeBorderRadius() {
    dom.style.borderRadius = borderRadiusValues.map(value => `${value}%`).join(' ');
  }

  this.noBorder.checked = dom.style.border === 'none' || false;
  this.noBorder.onchange = () => {
    if (this.noBorder.checked) {
      dom.style.border = 'none';
    } else {
      dom.style.border = '';
    }
  };

  this.fontSize.value = parseFloat(dom.style.fontSize) || 0.04;
  this.fontSize.onchange = () => { dom.style.fontSize = this.fontSize.value + 'em'; };

  this.color.value = dom.style.color || this.color.value;
  this.color.onchange = () => { dom.style.color = this.color.value; };

  this.textShadow.checked = !!dom.style.textShadow;
  this.textShadow.onchange = () => { dom.style.textShadow = this.getShadow(); };

  this.shadowSize.value = (function () {
    if (!dom.style.textShadow) return;
    var ttt = dom.style.textShadow.split(',')[0].split(' ');
    var aaa = ttt[2];
    return parseInt(aaa);
  })() || 1;
  this.shadowSize.onchange = () => { dom.style.textShadow = this.getShadow(); };

  this.shadowColor.value = (function () {
    if (!dom.style.textShadow) return;
    var ttt = dom.style.textShadow.split(',')[0].split(' ');
    var aaa = ttt[0];
    return aaa.trim();
  })() || this.shadowColor.value;
  this.shadowColor.onchange = () => { dom.style.textShadow = this.getShadow(); };

  this.fontWeight.checked = !!dom.style.fontWeight;
  this.fontWeight.onchange = () => { dom.style.fontWeight = this.fontWeight.checked ? 'bold' : '' };

  this.textAlign.value = dom.style.textAlign === 'center' ? 0 : dom.style.textAlign === 'right' ? -1 : 1;
  this.textAlign.onchange = () => {
    dom.style.textAlign = this.textAlign.value === '0' ? 'center' : this.textAlign.value === '-1' ? 'right' : '';
  };

  this.fontFamily.checked = !!dom.style.fontFamily;
  this.fontFamily.onchange = () => { dom.style.fontFamily = this.fontFamily.checked ? 'Nanum Pen Script' : ''; };

  try {
    this.rotate.value = parseInt(dom.style.transform.match(/.*?rotateZ\((-?\d+)deg\).*/)[1]);
  } catch (err) {
    this.rotate.value = 0;
  }
  this.rotate.onchange = () => { dom.style.transform = `rotateZ(${this.rotate.value}deg)`; }

  this.padding.checked = !!dom.style.padding;
  this.padding.onchange = () => { dom.style.padding = this.padding.checked ? '0px' : ''; }

  this.wordBreak.checked = !!dom.style.wordBreak;
  this.wordBreak.onchange = () => { dom.style.wordBreak = this.wordBreak.checked ? 'break-all' : ''; }
}
