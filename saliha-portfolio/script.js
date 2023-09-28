let menu=document.querySelector('#menu-bars');
let header=document.querySelector('header');

menu.onclick=() =>{
    menu.classList.toggle('fa-times'); //toggle sınıfın varlıgını tersine cevirir
    header.classList.toggle('active');

}

window.onscroll=() =>{  //sayfa kaydırıldıgında menu ve header kapanacak
    menu.classList.remove('fa-times'); //toggle sınıfın varlıgını tersine cevirir
    header.classList.remove('active');

}

let cursor1= document.querySelector('.cursor-1');


window.onmousemove=(e) => {
    cursor1.style.top=e.pageY + 'px';
    cursor1.style.left=e.pageX + 'px';
  
}

document.querySelectorAll('a').forEach(links=>{
    links.onmouseenter =() =>{
        cursor1.classList.add('active');
   
    }
    links.onmouseleave =() =>{
        cursor1.classList.remove('active');
      
    }
})

var Text = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  Text.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 200 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-words');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new Text(elements[i], JSON.parse(toRotate), period);
      }
    }
  }; 
