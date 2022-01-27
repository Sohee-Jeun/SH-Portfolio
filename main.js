'use strict';
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;


document.addEventListener('scroll', () => {
  
 if(window.scrollY > navbarHeight){
     navbar.classList.add('navbar__dark');
 }else{
    navbar.classList.remove('navbar__dark')
 }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) =>{
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    const scrollTo = document.querySelector(link);
    scrollTo.scrollIntoView({behavior:"smooth"});
});

/* Arrow up */
const arrowUpBtn = document.querySelector('.arrowUp');
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
arrowUpBtn.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight){
        arrowUpBtn.style.opacity = 1;
    }
})


/* Project Imgage Slides*/

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

const init = (n) =>{
    slides.forEach((slide)=>{
        slide.style.display = 'none';
        dots.forEach ((dot)=>{
            dot.classList.remove('active');
        })
    })
    slides[n].style.display="block";
    dots[n].classList.add('active');
};
document.addEventListener("DOMContentLoaded", init(currentSlide));

const next =()=>{
    currentSlide>=slides.length-1 ? currentSlide = 0: currentSlide++;
    init(currentSlide);
};

const prev = () => {
    currentSlide<= 0 ? currentSlide = slides.length - 1: currentSlide--;
    init(currentSlide);
};

document.querySelector(".next").addEventListener('click', next);
document.querySelector(".prev").addEventListener('click', prev);

dots.forEach((dot, index)=>{
    dot.addEventListener("click",() => {
        init(index);
        currentSlide = index;
    })
});