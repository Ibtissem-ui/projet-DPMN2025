document.addEventListener('DOMContentLoaded', () => {

// عناصر من الـ DOM
const openFormBtn = document.getElementById("OpenFormBtn");
const sujetForm = document.getElementById("sujetForm");
const postContainer = document.getElementById("postContainer");
const successMessage = document.getElementById("succesMessage");
 
const titreInput = document.getElementById("titre");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
 
// فتح النموذج
openFormBtn.addEventListener("click", () => {
  sujetForm.classList.toggle("hidden");
  successMessage.classList.add("hidden");
});
 
// عند إرسال النموذج
sujetForm.addEventListener("submit", (e) => {
  e.preventDefault();
 
  const titre = titreInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

if (titre && email && message) {
  ajouterSujet(titre, email, message);
  sujetForm.reset();
  sujetForm.classList.add("hidden");
  successMessage.classList.remove("hidden");

  //  Masquer après 4 secondes
  setTimeout(() => {
    successMessage.classList.add("hidden");
  }, 4000);
}

});
 
// وظيفة إنشاء موضوع جديد
function ajouterSujet(titre, email, message) {
  const post = document.createElement("div");
   const pseudo = "Utilisateur_" + Math.floor(Math.random() * 10000);

  
 
  post.innerHTML = `
    <h3 class="post-title">${titre}</h3>
    <p class="post-message">${message}</p>


   
  <p class="post-email">Posté par : ${pseudo}</p>
    
 
    <div class="rating">
      ${[1, 2, 3, 4, 5].map(n => `<span class="star" data-value="${n}">☆</span>`).join("")}
    </div>
 
    <button class="btn-reply">Répondre</button>
    <button class="btn-share">Partager</button>
 
    <div class="reply-section hidden">
      <textarea class="reply-text" rows="3" placeholder="Écrire une réponse..."></textarea>
      <button class="btn-send-reply">Envoyer</button>
      <div class="replies"></div>
    </div>
  `;
 
  // إضافة الأحداث التفاعلية
  ajouterFonctionnalites(post);
 
  postContainer.prepend(post);
}
 
// إضافة الأحداث: تقييم، مشاركة، ردود
function ajouterFonctionnalites(post) {
  // التقييم بالنجوم
  const stars = post.querySelectorAll(".star");
  stars.forEach(star => {
    star.addEventListener("click", () => {
      const value = parseInt(star.dataset.value);
      stars.forEach(s => {
        s.classList.remove("selected");
        if (parseInt(s.dataset.value) <= value) {
          s.classList.add("selected");
        }
      });
    });
  });
 
  // زر "Partager"
  const shareBtn = post.querySelector(".btn-share");
  shareBtn.addEventListener("click", () => {
    const title = post.querySelector(".post-title").textContent;
    const message = post.querySelector(".post-message").textContent;
    const url = window.location.href;
 
    const shareText = `Sujet: ${title}\nMessage: ${message}\nLien: ${url}`;
    navigator.clipboard.writeText(shareText)
      .then(() => {
        alert("Contenu copié pour le partage !");
      })
      .catch(() => {
        alert("Impossible de copier le contenu.");
      });

// Ouvrir la fenêtre de partage Facebook
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(facebookUrl, '_blank', 'width=600,height=400');


  });
 
  // الردود
  const replyBtn = post.querySelector(".btn-reply");
  const replySection = post.querySelector(".reply-section");
  const sendReplyBtn = post.querySelector(".btn-send-reply");
  const replyText = post.querySelector(".reply-text");
  const repliesDiv = post.querySelector(".replies");
 
  replyBtn.addEventListener("click", () => {
    replySection.classList.toggle("hidden");
  });
 
  sendReplyBtn.addEventListener("click", () => {
    const reply = replyText.value.trim();
    if (reply) {
      const p = document.createElement("p");
      p.textContent = reply;
      repliesDiv.appendChild(p);
      replyText.value = "";
    }
  });
}
}); 


// Activer/désactiver le mode gris depuis la page d'accueil
  if (localStorage.getItem("graymodeEnabled") === "true") {
    document.documentElement.classList.add("graymode");
  }

  const toggleButton = document.getElementById("toggleGraymode");
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      const htmlEl = document.documentElement;
      const isGray = htmlEl.classList.toggle("graymode");
      localStorage.setItem("graymodeEnabled", isGray);
    });
  }

/*le submenu*/

const toggleSubmenu = document.getElementById('toggle-submenu');
const submenu = document.querySelector('.submenu');
if (toggleSubmenu && submenu) {
  // Ouvre/ferme le sous-menu au clic
  toggleSubmenu.addEventListener('click', function(e) {
    e.preventDefault();
    submenu.classList.toggle('active');
  });
}

/*les places event*/
    const forms = document.querySelectorAll('.event-form');

forms.forEach(form => {
    const select = form.querySelector('.event-select');
    const display = form.querySelector('.nb-places');

    // Mise à jour des places restantes lors du changement d'activité
    select.addEventListener('change', () => {
      const selected = select.options[select.selectedIndex];
      const places = selected.dataset.places;
      display.textContent = places ?? '0';
    });

    // Décompte des places à l'envoi du formulaire
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const selected = select.options[select.selectedIndex];
      let places = parseInt(selected.dataset.places);

      if (!isNaN(places) && places > 0) {
        places--;
        selected.dataset.places = places;
        display.textContent = places;
        alert("Inscription réussie !");
      } else {
        alert("Plus de places disponibles !");
      }
    });
  });


// Code pour le carrousel d'image
 let  slides = document.querySelectorAll('.image-slide');
  let currentIndex = 0;

  document.querySelector('.next').addEventListener('click', () => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  });

  document.querySelector('.prev').addEventListener('click', () => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
  });

// Ouvrir et fermer le menu des paramètres
const openSettingsBtn = document.getElementById('openSettings');
const closeSettingsBtn = document.getElementById('closeSettings');
const settingMenu = document.getElementById('settingMenu');

openSettingsBtn.addEventListener('click', () => {
  settingMenu.classList.add('active');
});

closeSettingsBtn.addEventListener('click', () => {
  settingMenu.classList.remove('active');
});


  // استرجاع حجم الخط المحفوظ أو استخدم 100% كقيمة افتراضية
  let fontSize = localStorage.getItem("fontSize");
  fontSize = fontSize ? parseInt(fontSize) : 100;

  // نطبّق الحجم كنسبة مئوية
  document.documentElement.style.fontSize = fontSize + "%";

  // نبحث عن الأزرار (موجودة فقط في الصفحة الرئيسية)
  const increaseBtn = document.getElementById("increaseFont");
  const decreaseBtn = document.getElementById("decreaseFont");

  if (increaseBtn) {
    increaseBtn.addEventListener("click", () => {
      fontSize += 10; // تكبير بنسبة 10%
      document.documentElement.style.fontSize = fontSize + "%";
      localStorage.setItem("fontSize", fontSize);
    });
  }

  if (decreaseBtn) {
    decreaseBtn.addEventListener("click", () => {
      fontSize = Math.max(50, fontSize - 10); // لا يقل عن 50%
      document.documentElement.style.fontSize = fontSize + "%";
      localStorage.setItem("fontSize", fontSize);
    });
  }

  // menu-bar
   let menu=document.querySelector('#menu-bar');
   let navbar=document.querySelector('.navbar');

    menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
  });
  // Toggle de la barre de recherche
  let searchBtn = document.querySelector('#search-btn');
  let searchBar = document.querySelector('.search-bar-container');

    searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
  });

// Formulaire de connexion
let formBtns = document.querySelectorAll('.openLoginForm');
let formBar = document.querySelector('.formulaire-connexion');
let formClose = document.querySelector('#form-close');

formBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    formBar.classList.add('active');
  });
});

formClose.addEventListener('click', () => {
  formBar.classList.remove('active');
});

  // Afficher le formulaire quand on clique sur "En savoir plus"
  const showFormBtns = document.querySelectorAll('.show-form-btn');
  showFormBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const form = btn.parentElement.querySelector('.event-form');
      if (form) {
        form.classList.remove('hidden');
      }
    });
  });

  // Fermer le formulaire quand on clique sur ✖
  const closeFormBtns = document.querySelectorAll('.close-form-btn');
  closeFormBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const form = btn.closest('.event-form');
      if (form) {
        form.classList.add('hidden');
      }
    });
  });


 








