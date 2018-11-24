if(document.getElementById('hamburger')) {
  var trigger = document.getElementById('hamburger');
      trigger.onclick = function() {
        document.body.className = 'nav-open';
      }
}

if(document.getElementById('top-bar')) {
  var close = document.getElementById('top-bar').getElementsByClassName('close')[0];
      close.onclick = function() {
        document.body.className = '';
      }
}