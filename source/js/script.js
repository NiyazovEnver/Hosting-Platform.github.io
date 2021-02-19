let menu = document.querySelector(".main-nav__list");
let button = document.querySelector(".main-nav__toggle");
let nav=document.querySelector(".main-nav");
let close = menu.querySelectorAll(".main-nav__item-link");



button.addEventListener("click", function(evt){

	menu.classList.toggle("site-list");
	nav.classList.toggle("main-nav--closed");
	nav.classList.toggle("main-nav--opened");
	
});
[].forEach.call(close,function(el){  
  el.addEventListener("click", function(evt){
    menu.classList.remove("site-list");
  
  nav.classList.remove("main-nav--opened");
  nav.classList.add("main-nav--closed");
});
});



var controls = document.querySelectorAll('.controls');

for(var i=0; i<controls.length; i++){
  controls[i].style.display = 'inline-block';
}

var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,4000);

function nextSlide(){
  goToSlide(currentSlide+1);
}

function previousSlide(){
  goToSlide(currentSlide-1);
}

function goToSlide(n){
  slides[currentSlide].className = 'slide';
  currentSlide = (n+slides.length)%slides.length;
  slides[currentSlide].className = 'slide showing';
}


var next = document.getElementById('next');
var previous = document.getElementById('previous');

next.onclick = function(){

  nextSlide();
};
previous.onclick = function(){

  previousSlide();
};

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}


var priceMonth=document.querySelector(".price__list-month");
var priceYearly=document.querySelector(".price__list-yearly");
var priceButtonMonth=document.querySelector(".price__toggle1");
var priceButtonYearly=document.querySelector(".price__toggle2");

priceButtonYearly.addEventListener("click", function(evt){
	priceMonth.classList.add("price--hidden");
	priceYearly.classList.remove("price--hidden");
	priceButtonYearly.style.color="#333";
	priceButtonMonth.style.color="rgba(51, 51, 51, 0.5)";
});

priceButtonMonth.addEventListener("click", function(evt){
	priceYearly.classList.add("price--hidden");
	priceMonth.classList.remove("price--hidden");
	priceButtonMonth.style.color="#333";
	priceButtonYearly.style.color="rgba(51, 51, 51, 0.5)";
});

