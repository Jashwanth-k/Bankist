'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const section4 = document.querySelector('.section--sign-up');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

// console.log(tabContent);

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////
// Learn More button
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     const sectionEl = document.querySelector(id);
//     sectionEl.scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element is originated in event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    const sectionEl = document.querySelector(id);
    sectionEl.scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed Component

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Gaurd class
  if (!clicked) return;

  // Active tab
  tabs.forEach(cur => cur.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate Content area
  tabContent.forEach(el => el.classList.remove('operations__content--active'));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu Fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "arguments" to callback function
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY >= initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Sticky navigation : intersection observer API
// const callBack = function (entries, observer) {
//   entries.forEach(cur => {
//     console.log(cur);
//   });
// };

// const options = {
//   root: null,
//   threshold: 0.05,
// };

// const observer = new IntersectionObserver(callBack, options);
// observer.observe(section1);
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const header = document.querySelector('.header');

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// // Revealing sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const allImgs = document.querySelectorAll('img[data-src]');
// console.log(allImgs);

const imageCall = function (entries, oberver) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observerImage.unobserve(entry.target);
};

const observerImage = new IntersectionObserver(imageCall, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

allImgs.forEach(imgs => observerImage.observe(imgs));

// Working of slider
const slide = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let currslide = 0;
  const maxSlides = slides.length;
  const dotContainer = document.querySelector('.dots');

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(el => (el.className = 'dots__dot'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide = 0) {
    currslide = slide;
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  //  0 , 100 ,200, 300

  // Next slide
  const nxtSlide = function () {
    if (currslide === maxSlides - 1) {
      currslide = 0;
    } else {
      currslide++;
    }
    goToSlide(currslide);
    activateDot(currslide);
  };

  // Previous slide
  const prevSlide = function () {
    if (currslide === 0) {
      currslide = maxSlides - 1;
    } else {
      currslide--;
    }
    goToSlide(currslide);
    activateDot(currslide);
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  init();

  // Event Handlers
  btnRight.addEventListener('click', nxtSlide);
  btnLeft.addEventListener('click', prevSlide);

  const coords = section3.getBoundingClientRect();

  document.addEventListener('keydown', function (e) {
    console.log(currslide);
    if (
      e.key === 'ArrowRight' ||
      (window.pageYOffset >= coords.top &&
        window.pageYOffset <= coords.top + coords.height)
    ) {
      nxtSlide();
    } else if (
      e.key === 'ArrowLeft' ||
      (window.pageYOffset >= coords.top &&
        window.pageYOffset <= coords.top + coords.height)
    ) {
      prevSlide();
    }
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = Number(e.target.dataset.slide);
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slide();

////////////////////
// Experimenting on loading sections
// allSections.forEach(sec => {
//   sec.classList.add('section--hidden');
// });
// // console.log(allSections[0]);

// const section1Top = section1.getBoundingClientRect();
// const section2Top = section2.getBoundingClientRect();
// const section3Top = section3.getBoundingClientRect();
// const section4Top = section4.getBoundingClientRect();

// const sectionsTop = [section1Top, section2Top, section3Top, section4Top];

// window.addEventListener('scroll', function () {
//   const windowScroll = window.scrollY;

//   sectionsTop.forEach((cur, i) => {
//     // console.log(cur.top * 0.15);
//     if (windowScroll >= cur.top && windowScroll <= cur.top + cur.height) {
//       allSections.forEach(sec => sec.classList.add('section--hidden'));

//       console.log(i);
//       allSections[i].classList.remove('section--hidden');
//     }
//   });
// });

////////////////////////////////////////////
////////////////////////////////////////////

/*
// Selection elements
console.log(document.body);
console.log(document.head);

const header = document.querySelector('.header');
console.log(header);

const allSections = document.querySelectorAll('.section');
console.log(allSections);

console.log(document.getElementsByClassName('btn'));
console.log(document.getElementsByTagName('img'));

console.log(document.getElementById('section--1'));

// Creating Elements
const message = document.createElement('div');
console.log(message);

message.classList.add('cookie-mesg');
message.innerHTML =
  'We use cookies for better user experience and quality.<button class="btn btn--close-cookies">Got it</button>';

// header.prepend(message);
header.append(message);
// header.insertAdjacentHTML(
//   'beforeend',
//   '<div class="cookie-mesg">We use cookies for better user experience and quality.<button class="btn btn--close-cookies">Got it</button><div>'
// );

// header.before(message);
// header.after(message);
// Clone
// header.prepend(message.cloneNode(true));

document
  .querySelector('.btn--close-cookies')
  .addEventListener('click', function () {
    message.remove();
    // document.querySelector('.cookie-mesg').remove();
    // message.parentElement.removeChild(message);
  });

// Styles
message.style.backgroundColor = '#37383d';

message.style.width = '105%';
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).backgroundColor);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

console.log(getComputedStyle(message).height);

console.log(document.documentElement);

document.documentElement.style.setProperty('--color-primary', 'red');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'bankist');

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// DATA attributes
console.log(logo.dataset.versionNumber);

// CLASSES
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); //not includes

// Don't USE
// logo.className = 'jashwanth';
*/

/*
// SCROLLING
const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  // console.log(e.target.getBoundingClientRect());
  console.log(s1coords);

  // console.log('offsets', window.pageYOffset, window.pageYOffset);

  // console.log(
  //   'viewport (h/w)',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});
*/

/*
const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('EventListener: is listened');

  // h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
*/

/*
// rgb(255,255,255)
const randomInt = (max, min) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
  // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});
*/

/*
// DOM traversing
const h1 = document.querySelector('h1');

// Going downwords : child elements
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'red';

// Going upwards : parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways : selecting siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el === h1) return;
  el.style.transform = 'scale(0.7)';
});
*/

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HTML is parsed!', e);
// });

// window.addEventListener('load', function (e) {
//   console.log('page fully loaded', e);
// });

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
// e.returnValue = '';
// });
