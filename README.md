# SOHEE's portfolio
### Status: still developing 👩🏻‍💻
<hr/>

## 🖥 Stacks 🖥
   <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<hr/>

## 🛠 Tools 🛠
 <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white"/>
<hr/>

## 📄 Description 📄
This is portfolio that I am still working on it. It going to be kept updating.<br/>
Also this is my project as well. 
<hr/>

## What I learned
### CSS의 animation 활용
#### typing effect

##### CSS code
``` CSS
.intro .home__title + span {
  border-left: 0.15rem solid var(--color--blue-green);
  animation: blink 0.7s ease-in-out infinite;
}

@keyframes blink {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

##### JavaScript code
```JavaScript
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
```
<hr/>

#### Making Image Slides
##### CSS code
```css
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.slide__container {
  position: relative;
  margin: 0 auto;
  padding: 15px;
  width: 70%;
  height: 70%;
  background-color: var(--color--grey);
  border-radius: var(--size-border-radius);
}

.slide__container .slide {
  width: 95%;
  height: 100%;
}

.slide__container .slide.fade {
  animation: fade 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

.slide__container .prev,
.slide__container .next {
  cursor: pointer;
  position: absolute;
  width: auto;
  height: 100%;
  top: 0;
  padding: 12px;
  transition: all 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
  color: var(--color--blue-green);
}

.slide__container .prev:hover,
.slide__container .next:hover {
  background-color: var(--color--blue-green);
  color: var(--color--white);
}

.slide__container .prev {
  left: 2px;
}

.slide__container .next {
  right: 2px;
}

.dots__container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.dots__container .dot {
  cursor: pointer;
  margin: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--color--yellow-green);
}

.dots__container .dot.active {
  border: 2px solid var(--color--green);
}
```

##### JavaScript
```JavaScript
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
```




## References
typing animation
https://gist.github.com/djpandab/adf0f5fbb4b36cc8a6c0b9bb74faf2f9
https://medium.com/front-end-weekly/how-to-create-typing-effect-in-css-and-js-3252dd807f0a

