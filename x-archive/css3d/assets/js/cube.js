function Cube(data) {
  console.log('Cube data',data)
  var self = this;

  this.element = data.element;
  this.sides = this.element.getElementsByClassName('side');

  this.viewport = data.viewport;
  this.viewport.on('rotate', function() {
    self.rotateSides();
  });
  this.viewport.on('upsideDown', function(obj) {
    self.upsideDown(obj);
  });
  this.viewport.on('sideChange', function() {
    self.sideChange();
  });
  
  console.log('Cube self:',self)
}
Cube.prototype.rotateSides = function() {
  var viewport = this.viewport;
  if(viewport.positionY > 90 && viewport.positionY < 270) {
    this.sides[0].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + (viewport.positionX + viewport.torqueX) + 'deg)';
    this.sides[5].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + -(viewport.positionX + 180 + viewport.torqueX) + 'deg)';
  } else {
    this.sides[0].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + (viewport.positionX - viewport.torqueX) + 'deg)';
    this.sides[5].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + -(viewport.positionX + 180 - viewport.torqueX) + 'deg)';
  }
}
Cube.prototype.upsideDown = function(obj) {

  var deg = (obj.upsideDown == true) ? '180deg' : '0deg';
  var i = 5;

  while(i > 0 && --i) {
    this.sides[i].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + deg + ')';
  }

}
Cube.prototype.sideChange = function() {

  for(var i = 0; i < this.sides.length; ++i) {
    this.sides[i].getElementsByClassName('cube-image')[0].className = 'cube-image';
  }

  this.sides[this.viewport.currentSide - 1].getElementsByClassName('cube-image')[0].className = 'cube-image active';

}

new Cube({
  viewport: viewport,
  element: document.getElementsByClassName('cube')[0]
});

  // console.log('Cube viewport element',viewport,element)