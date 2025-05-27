document.addEventListener('DOMContentLoaded', () => {
  let searchBtn = document.querySelector('#search-btn');
  let searchBar = document.querySelector('.search-bar-container');

  let formBtn = document.querySelector('#login-btn');
  let formBar = document.querySelector('.formulaire-connexion');
  let formClose = document.querySelector('#form-close');

  let menu=document.querySelector('#menu-bar');
  let navbar=document.querySelector('.navbar');

  const track = document.querySelector('.slider-track');
  const prevBtn = document.querySelector('button.prev');
  const nextBtn = document.querySelector('button.next');


  // --- SLIDER CLIENTS (cards horizontales) ---
 
  if (track && prevBtn && nextBtn) {
    let position = 0;
    const card = track.querySelector('.card');
    const cardWidth = card ? card.offsetWidth + 16 : 316; // largeur card + gap

    nextBtn.addEventListener('click', () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      position = Math.min(position + cardWidth, maxScroll);
      track.scrollTo({ left: position, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      position = Math.max(position - cardWidth, 0);
      track.scrollTo({ left: position, behavior: 'smooth' });
    });
  }

  // Désactiver les boutons galerie
  document.querySelectorAll('.Galerie .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
    });
  });

  // video slider navigation
  const btns = document.querySelectorAll(".nav-btn");
  const slides = document.querySelectorAll(".video-slide");
  const contents = document.querySelectorAll(".content");

  let sliderNav = function(manual){
    btns.forEach(btn => btn.classList.remove("active"));
    slides.forEach(slide => slide.classList.remove("active"));
    contents.forEach(content => content.classList.remove("active"));

    btns[manual].classList.add("active");
    slides[manual].classList.add("active");
    contents[manual].classList.add("active");
  }

  btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      sliderNav(i);
    });
  });

  // menu-bar
  menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
  });
  // Toggle de la barre de recherche
  searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
  });

  // Afficher le formulaire de connexion
  formBtn.addEventListener('click', () => {
    formBar.classList.add('active');
  });

  // Cacher le formulaire de connexion
  formClose.addEventListener('click', () => {
    formBar.classList.remove('active');
  });
});
