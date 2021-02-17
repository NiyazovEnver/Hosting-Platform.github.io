let menu = document.querySelector(".main-nav__list");
let button = document.querySelector(".main-nav__toggle");
let nav=document.querySelector(".main-nav");

button.addEventListener("click", function(evt){
	
	menu.classList.toggle("site-list");
	nav.classList.toggle("main-nav--closed");
	nav.classList.toggle("main-nav--opened");
	
});

const $slider = document.querySelector('[data-slider="chiefslider"]');
    new ChiefSlider($slider, {
      loop: true
    });

