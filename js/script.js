"use strict";
// Modal window
const cta = document.querySelectorAll(".cta");
const modal = document.querySelector(".modal-close");
const overLay = document.querySelector(".overlay");
const modalCloseBtn = document.querySelector(".modal-close-btn");

// Button scrolling
const learnMore = document.querySelector(".learn-more");
const section1 = document.querySelector("#section-1");

// Page navigation
// const navlinks = document.querySelector(".nav-links");

// Menu fade animation
const navlinks = document.querySelector(".nav-links");
const navlink = document.querySelectorAll(".nav-link");
const logo = document.querySelector(".logo");
const nav = document.querySelector(".nav");

// Tabbed component
const operationBtns = document.querySelector(".operation-btns");
const operationBtn = document.querySelectorAll(".operation-btn");
const operationContent = document.querySelectorAll(".operation-content");

// Sticky navigation: Intersection Observer API

const header = document.querySelector(".header");

///////////////////////////////////////
// Reveal sections
const sections = document.querySelectorAll(".section");

// Lazy loading images
const images = document.querySelectorAll("img[data-src]");

///////////////////////////////////////
// Slider
const slides = document.querySelectorAll(".slide");
const sliderBtnLeft = document.querySelector(".slider-btn-left");
const sliderBtnRight = document.querySelector(".slider-btn-right");
const dots = document.querySelector(".dots");

///////////////////////////////////////
// Modal window

const removehidden = function () {
  modal.classList.remove("hidden");
  overLay.classList.remove("hidden");
};
const addhidden = function () {
  modal.classList.add("hidden");
  overLay.classList.add("hidden");
};
cta.forEach(function (e) {
  e.addEventListener("click", removehidden);
});

modalCloseBtn.addEventListener("click", addhidden);
overLay.addEventListener("click", addhidden);

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    addhidden();
  }
});

///////////////////////////////////////
// Button scrolling

learnMore.addEventListener("click", function () {
  section1.scrollIntoView({
    behavior: "smooth",
  });
});

///////////////////////////////////////
// Page navigation

navlinks.addEventListener("click", function (e) {
  e.preventDefault;

  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");

    // document.querySelector(#section-$)

    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});

///////////////////////////////////////
// Tabbed component

operationBtns.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operation-btn");
  if (!clicked) return;

  // remove everthing
  operationBtn.forEach(function (e) {
    e.classList.remove("operation-btn-active");
  });

  operationContent.forEach(function (e) {
    e.classList.remove("operation-content-active");
  });

  // Active everthing
  clicked.classList.add("operation-btn-active");

  document
    .querySelector(`.operation-content-${clicked.dataset.tab}`)
    .classList.add("operation-content-active");
});

///////////////////////////////////////
// Menu fade animation

// const navlinks = document.querySelector('.nav-links');
// const navlink = document.querySelectorAll('.nav-link')

// nav fade Animation
const navmousehover = function (e) {
  if (!e.target.closest(".nav-link")) return;
  const active = e.target;
  const other = active.closest(".nav-links").querySelectorAll(".nav-link");

  other.forEach((e) => {
    if (e === active) return;
    e.style.opacity = this;
  });
};

navlinks.addEventListener("mouseover", navmousehover.bind(0.5));
navlinks.addEventListener("mouseout", navmousehover.bind(1));

// logo fade Animation

// const logo = document.querySelector('.logo');
// const nav = document.querySelector('.nav');

const logomousehover = function (e) {
  if (!e.target.closest(".nav-logo")) return;
  const active = e.target;
  const other = active.closest(".nav").querySelectorAll(".nav-logo");

  other.forEach((e) => {
    if (e === active) return;
    e.style.opacity = this;
  });
};

nav.addEventListener("mouseover", logomousehover.bind(0.5));
nav.addEventListener("mouseout", logomousehover.bind(1));

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

// const header = document.querySelector('.header');
const margin = nav.getBoundingClientRect().height;

const sticknav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(sticknav, {
  root: null,
  threshold: 0,
  // rootMargin: `${margin}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections
// const sections = document.querySelectorAll('.section');

const movesectionup = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("moveup");

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(movesectionup, {
  root: null,
  threshold: 0.15,
});

sections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("moveup");
});

///////////////////////////////////////
// Lazy loading images

// const images = document.querySelectorAll('img[data-src]');

const revealOriginal = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-image");
  });
};

const lazyImageReveal = new IntersectionObserver(revealOriginal, {
  root: null,
  threshold: 0.15,
});

images.forEach(function (section) {
  lazyImageReveal.observe(section);
});

///////////////////////////////////////
// Slider

// const slides = document.querySelectorAll('.slide');
// const sliderBtnLeft = document.querySelector('.slider-btn-left');
// const sliderBtnRight = document.querySelector('.slider-btn-right');
// const dots = document.querySelector('.dots');

const slider = function () {
  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dots.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // slide moving
  const slidenext = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const slideprevious = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  sliderBtnRight.addEventListener("click", slidenext);
  sliderBtnLeft.addEventListener("click", slideprevious);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") slideprevious();
    e.key === "ArrowRight" && slidenext();
  });


  dots.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
