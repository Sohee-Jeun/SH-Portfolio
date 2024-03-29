"use strict";

/*navbar light*/
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar__dark");
  } else {
    navbar.classList.remove("navbar__dark");
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
  selectNavItem(target);
});

const sectionIds = ["#home", "#skills", "#projects", "#aboutme", "#contactme"];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entries.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);

      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    window.scrollY + window.innerHeight ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

/* Arrow up */
const arrowUpBtn = document.querySelector(".arrowUp");
const home = document.querySelector("#home");
const homeheight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > homeheight / 2) {
    arrowUpBtn.classList.add("visible");
  } else {
    arrowUpBtn.classList.remove("visible");
  }
});

arrowUpBtn.addEventListener("click", () => {
  scrollIntoView("#home");
});
//Home typing text class

class Typewriter {
  constructor(txtEl, words, duration = 2500) {
    this.txtEl = txtEl;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.duration = parseInt(duration, 10);
    this.type();
    this.isDeleted = false;
  }

  type() {
    const currentWord = this.wordIndex % this.words.length;
    const fulltxt = this.words[currentWord];
    if (this.isDeleted) {
      this.txt = fulltxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fulltxt.substring(0, this.txt.length + 1);
    }
    this.txtEl.innerHTML = `<span class="text">${this.txt}</span>`;

    let typeSpeed = 100;

    if (this.isDeleted) {
      typeSpeed /= 2;
    }

    if (!this.isDeleted && this.txt === fulltxt) {
      typeSpeed = this.duration;

      this.isDeleted = true;
    } else if (this.isDeleted && this.txt === "") {
      this.isDeleted = false;
      this.wordIndex++;
      typeSpeed = 500;
    }
    setTimeout(() => this.type(), typeSpeed);
  }
}

document.addEventListener("DOMContentLoaded", typing);
function typing() {
  const txtEl = document.querySelector(".home__title");
  const words = JSON.parse(txtEl.getAttribute("data-words"));
  const duration = txtEl.getAttribute("data-wait");
  new Typewriter(txtEl, words, duration);
}
/**
 * greetings are difference depending on time.
 */

const greeting = document.querySelector(".greeting");
const hour = new Date().getHours();
const welcomeTypes = [
  "Good morning ☀️",
  "Good afternoon 🌱",
  "Good evening 🌝",
];
let welcomeText = "";

if (hour < 12) welcomeText = welcomeTypes[0];
else if (hour < 18) welcomeText = welcomeTypes[1];
else welcomeText = welcomeTypes[2];

greeting.innerHTML = welcomeText;

/* Project Imgage Slides*/

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const init = (n) => {
  slides.forEach((slide) => {
    slide.style.display = "none";
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });
  });
  slides[n].style.display = "block";
  dots[n].classList.add("active");
};
document.addEventListener("DOMContentLoaded", init(currentSlide));

const next = () => {
  currentSlide >= slides.length - 1 ? (currentSlide = 0) : currentSlide++;
  init(currentSlide);
};

const prev = () => {
  currentSlide <= 0 ? (currentSlide = slides.length - 1) : currentSlide--;
  init(currentSlide);
};

document.querySelector(".next").addEventListener("click", next);
document.querySelector(".prev").addEventListener("click", prev);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    init(index);
    currentSlide = index;
  });
});

/* Media Query */

const toggleBtn = document.querySelector(".nav_togleBtn");
const navMenu = document.querySelector(".navbar__menu");
toggleBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
