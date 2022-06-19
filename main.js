'use strict';

/*navbar light*/
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

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
  
}

/* Arrow up */
const arrowUpBtn = document.querySelector('.arrowUp');
const home = document.querySelector('#home');
const homeheight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > homeheight / 2){
        arrowUpBtn.classList.add('visible');
    }else {
        arrowUpBtn.classList.remove('visible');
    }
});

arrowUpBtn.addEventListener('click',() => {
    scrollIntoView('#home');
});


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

/*  Active scroll menu to navbar */
const activeNav = document.querySelector('navbar__menu__item');
const activeNavHeight = activeNav.getClientRects().height;
/* activeNav.addEventListener('scroll', () => {
    if(condition){
        activeNav.classList.add('active');
    }else{
        activeNav.classList.remove('active');
    }
});*/

