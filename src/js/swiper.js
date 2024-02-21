new Swiper(".mysw", {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 30,
    }
  },
});


new Swiper(".swiper-band", {
  slidesPerView: 1,
  spaceBetween: 16,
  pagination: {
    el: ".swiper-pagination-band",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".swiper-next-band",
    prevEl: ".swiper-prev-band",
  },
  breakpoints: {
    375: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1920: {
      slidesPerView: 4,
      spaceBetween: 40,
    }
  }
});