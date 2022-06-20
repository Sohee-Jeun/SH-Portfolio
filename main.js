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


//Home typing text function
const typeWriter = function(txtEl, words, wait=2500) {
    this.txtEl =txtEl;
    this.words=words;
    //initirized  parameter.
    this.txt = '';
    this.wordIndex = 0;
    //which word are going on. array counter
    this.wait = parseInt(wait, 10);
    //same as parameter wait but it need to integer.
    this.type();
    //main arithmetic core.
    this.isDelet = false;  //After typing anim we need to delet anim. it for that.

};

//type method

typeWriter.prototype.type = function(){
    // Current index of word = showing word from array
    const currentWord = this.wordIndex % this.words.length;   // wordindex is 0 so if using % ans length

    // Get full of text length  current word.
    const fulltxt = this.words[currentWord]; // this line read word from array.

    // Check if you want to delet
    if(this.isDelet){
        //delet function
        this.txt =fulltxt.substring(0, this.txt.length -1);
    } else {
        //add text
        this.txt =fulltxt.substring(0, this.txt.length +1); //만약 txt가 ''; 상태가 아니면 생성
    }
    // Insert txt into Elements
    this.txtEl.innerHTML=`<span class="text">${this.txt}</span>`;

    // initial type speed(change speed)
    let typeSpeed = 100;

    if(this.isDelet){
        typeSpeed /= 2;
    };


    //if word is finished work.
    if(!this.isDelet && this.txt === fulltxt){
        // making pause at end part
        typeSpeed = this.wait;
        // Set delete to true
        this.isDelet = true;

    } else if(this.isDelet && this.txt === '') {
        this.isDelet = false;
        // move to next word
        this.wordIndex++;
        //pause before start typing
        typeSpeed = 500;

    };

    setTimeout(() => this.type(), typeSpeed)    //second parameter is millesecond = typing speed, main goal is each time we show up text
};


//init on Dom load
document.addEventListener('DOMContentLoaded', typing);
//init App?
function typing(){
    const txtEl = document.querySelector('.home__title');
    const words = JSON.parse(txtEl.getAttribute('data-words'));
    //data-wards is just string, so using JSON.parse, make them array
    const wait = txtEl.getAttribute('data-wait');
    // Init Typewiter(function init)
    new typeWriter(txtEl, words, wait);
};

const greeting = document.querySelector(".greeting");
const hour = new Date().getHours();
const welcomeTypes = ["Good morning☀️", "Good afternoon🌱", "Good evening🌝"];
let welcomeText = "";

if (hour < 12) welcomeText = welcomeTypes[0];
else if (hour < 18) welcomeText = welcomeTypes[1];
else welcomeText = welcomeTypes[2];

greeting.innerHTML = welcomeText;