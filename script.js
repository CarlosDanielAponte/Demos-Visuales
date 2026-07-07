// Base de datos de proyectos con imágenes fotográficas reales de prueba
const proyectos = [
  {
    id: 1,
    titulo: "Reporte Estatal IMSS",
    imagen: "resources/01_1.png",
    galeria: ["resources/01_1.png", "resources/01_2.png", "resources/01_3.png"],
    tecnologias: ["SQL Server", "Power BI", "Excel", "Limpieza de datos"],
    resumen:
      "Automatización de reportes estatales para el IMSS, con indicadores de salud y operación institucional.",
    descripcion:
      "Desarrollo de un sistema de reporteo automatizado utilizando SQL para la extracción de datos, Power BI para la visualización interactiva y Excel para la manipulación avanzada de datos. Se implementaron dashboards que permiten a los directivos del IMSS tomar decisiones basadas en datos en tiempo real.",
  },
  {
    id: 2,
    titulo: "Análisis Exploratorio de Datos",
    imagen: "resources/02_1.png",
    galeria: ["resources/02_1.png", "resources/02_2.png"],
    tecnologias: ["Python", "Pandas", "Seaborn", "Matplotlib"],
    resumen:
      "Limpieza y visualización estadística de grandes conjuntos de datos.",
    descripcion:
      "Uso de Python para analizar la distribución de los datos. Implementación de gráficos de dispersión, histogramas y diagramas de caja (boxplots) con Seaborn para entender el comportamiento de las variables clave.",
  },
  {
    id: 3,
    titulo: "MVC con Java Spring Boot",
    imagen: "resources/03_1.png",
    galeria: ["resources/03_1.png", "resources/03_2.png"],
    tecnologias: ["Java", "Spring Boot", "Maven", "Thymeleaf"],
    resumen:
      "Desarrollo de aplicaciones web siguiendo el patrón de diseño MVC con Java Spring Boot.",
    descripcion:
      "Uso de Java para desarrollar la lógica de negocio y Spring Boot para la configuración y el arranque de la aplicación. Implementación de controladores, servicios y repositorios para manejar las operaciones CRUD de manera eficiente. \nAun en proceso...",
  },
  {
    id: 4,
    titulo: "Diseño  y creación de bases de datos",
    imagen: "resources/04_1.png",
    galeria: ["resources/04_1.png", "resources/04_2.png", "resources/04_3.png"],
    tecnologias: ["SQL", "MySQL", "MariaDB", "SQL Server"],
    resumen: "Diseño y implementación de estructuras de base de datos.",
    descripcion:
      "Creación de esquemas desde la diagramación hasta la implementación en sistemas de gestión de bases de datos como MySQL y SQL Server. Optimización de consultas y normalización de datos para mejorar el rendimiento y la integridad de la información.",
  },
];

// LÓGICA DEL BOTÓN MAESTRO DE TECNOLOGÍAS
const botonMaestro = document.getElementById("toggle-tech");
const contenedorMaestro = document.getElementById("container-tech");

if (botonMaestro && contenedorMaestro) {
  botonMaestro.addEventListener("click", () => {
    contenedorMaestro.classList.toggle("collapsed");
    botonMaestro.classList.toggle("collapsed");
  });
}

// --- Generación de la Cuadrícula ---
const grid = document.getElementById("portfolio-grid");

proyectos.forEach((proyecto) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const tagsHTML = proyecto.tecnologias
    .map((tech) => `<span class="tag">${tech}</span>`)
    .join("");

  card.innerHTML = `
        <img src="${proyecto.imagen}" alt="${proyecto.titulo}" class="card-img">
        <div class="card-content">
            <h3 class="card-title">${proyecto.titulo}</h3>
            <div class="tags">${tagsHTML}</div>
            <p>${proyecto.resumen}</p>
        </div>
    `;

  card.addEventListener("click", () => abrirModal(proyecto));
  grid.appendChild(card);
});

// --- Lógica del Modal y Carrusel ---
const modal = document.getElementById("project-modal");
const closeBtn = document.querySelector(".close-btn");
const track = document.getElementById("carousel-track");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const indicatorsContainer = document.getElementById("carousel-indicators");

let currentIndex = 0; // Controla el carrusel pequeño
let currentGallery = []; // Guarda las fotos para el Lightbox gigante
let lightboxIndex = 0; // Controla en qué foto va el Lightbox gigante

function actualizarCarrusel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  const dots = indicatorsContainer.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function abrirModal(proyecto) {
  document.getElementById("modal-title").textContent = proyecto.titulo;
  document.getElementById("modal-desc").innerHTML = proyecto.descripcion;

  const tagsHTML = proyecto.tecnologias
    .map((tech) => `<span class="tag">${tech}</span>`)
    .join("");
  document.getElementById("modal-tags").innerHTML = tagsHTML;

  track.innerHTML = "";
  indicatorsContainer.innerHTML = "";

  proyecto.galeria.forEach((ruta, index) => {
    // 1. Crea la imagen del carrusel
    const img = document.createElement("img");
    img.src = ruta;

    // Al picar la imagen, se abre el Lightbox
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      currentGallery = proyecto.galeria;
      lightboxIndex = index;

      const lightbox = document.getElementById("lightbox");
      const lightboxImg = document.getElementById("lightbox-img");
      if (lightbox && lightboxImg) {
        lightboxImg.src = ruta;
        lightbox.classList.add("show-lightbox");
      }
    });

    track.appendChild(img);

    // 2. Crea el punto correspondiente
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = index;
      actualizarCarrusel();
    });

    indicatorsContainer.appendChild(dot);
  });

  currentIndex = 0;
  actualizarCarrusel();

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function cerrarModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", cerrarModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) cerrarModal();
});

// Botones Flechas del Carrusel Pequeño
if (track && prevBtn && nextBtn) {
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const totalImages = track.querySelectorAll("img").length;
    if (totalImages === 0) return;

    currentIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
    actualizarCarrusel();
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const totalImages = track.querySelectorAll("img").length;
    if (totalImages === 0) return;

    currentIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
    actualizarCarrusel();
  });
}

// ==========================================
// LÓGICA DEL LIGHTBOX (VISOR GIGANTE CON FLECHAS)
// ==========================================
const lightbox = document.getElementById("lightbox");
const closeLightboxBtn = document.getElementById("close-lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

function apagarLightbox() {
  if (lightbox) {
    lightbox.classList.remove("show-lightbox");
  }
}

function actualizarImagenLightbox() {
  if (currentGallery.length === 0) return;
  lightboxImg.src = currentGallery[lightboxIndex];

  // Sincroniza el carrusel pequeño de atrás
  currentIndex = lightboxIndex;
  actualizarCarrusel();
}

if (lightbox && closeLightboxBtn && lightboxImg) {
  // Cerrar con el Tache
  closeLightboxBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    apagarLightbox();
  });

  // Cerrar al picar el fondo oscuro
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) apagarLightbox();
  });

  // Flecha Siguiente del Lightbox
  if (lightboxNext) {
    lightboxNext.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentGallery.length === 0) return;
      lightboxIndex =
        lightboxIndex === currentGallery.length - 1 ? 0 : lightboxIndex + 1;
      actualizarImagenLightbox();
    });
  }

  // Flecha Anterior del Lightbox
  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentGallery.length === 0) return;
      lightboxIndex =
        lightboxIndex === 0 ? currentGallery.length - 1 : lightboxIndex - 1;
      actualizarImagenLightbox();
    });
  }
}

// ==========================================
// LÓGICA PARA LA TECLA ESCAPE (ESC)
// ==========================================
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // 1. Si el visor gigante está abierto, apágalo
    if (lightbox && lightbox.classList.contains("show-lightbox")) {
      apagarLightbox();
    }
    // 2. Si el visor está apagado, pero el proyecto está abierto, ciérralo
    else if (modal && modal.style.display === "flex") {
      cerrarModal();
    }
  }
});
