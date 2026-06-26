// Base de datos de proyectos con imágenes fotográficas reales de prueba
const proyectos = [
  {
    id: 1,
    titulo: "Reporte Estatal IMSS",
    imagen: "https://picsum.photos/id/1010/600/400",
    galeria: [
      "https://picsum.photos/id/1010/800/400",
      "https://picsum.photos/id/1011/800/400",
      "https://picsum.photos/id/1012/800/400",
    ],
    tecnologias: ["SQL", "Power BI", "Excel"],
    resumen:
      "Automatización de reportes estatales para el IMSS, con indicadores de salud y operación institucional.",
    descripcion:
      "Desarrollo de un sistema de reporteo automatizado utilizando SQL para la extracción de datos, Power BI para la visualización interactiva y Excel para la manipulación avanzada de datos. Se implementaron dashboards que permiten a los directivos del IMSS tomar decisiones basadas en datos en tiempo real.",
  },
  {
    id: 2,
    titulo: "Análisis Exploratorio de Datos",
    imagen: "https://picsum.photos/id/1015/600/400",
    galeria: [
      "https://picsum.photos/id/1015/800/400",
      "https://picsum.photos/id/1016/800/400",
    ],
    tecnologias: ["Python", "Pandas", "Seaborn", "Matplotlib"],
    resumen:
      "Limpieza y visualización estadística de grandes conjuntos de datos.",
    descripcion:
      "Uso de Python para analizar la distribución de los datos. Implementación de gráficos de dispersión, histogramas y diagramas de caja (boxplots) con Seaborn para entender el comportamiento de las variables clave.",
  },
  {
    id: 3,
    titulo: "MVC con Java Spring Boot",
    imagen: "https://picsum.photos/id/1015/600/400",
    galeria: [
      "https://picsum.photos/id/1015/800/400",
      "https://picsum.photos/id/1016/800/400",
    ],
    tecnologias: ["Java", "Spring Boot", "Maven", "Thymeleaf"],
    resumen:
      "Desarrollo de aplicaciones web siguiendo el patrón de diseño MVC con Java Spring Boot.",
    descripcion:
      "Uso de Java para desarrollar la lógica de negocio y Spring Boot para la configuración y el arranque de la aplicación. Implementación de controladores, servicios y repositorios para manejar las operaciones CRUD de manera eficiente. \nAun en proceso...",
  },
];

// LÓGICA DEL BOTÓN MAESTRO DE TECNOLOGÍAS
const botonMaestro = document.getElementById("toggle-tech");
const contenedorMaestro = document.getElementById("container-tech");

// Verificamos que los elementos existan en el HTML antes de darles la instrucción
if (botonMaestro && contenedorMaestro) {
  // Le quitamos la envoltura "DOMContentLoaded" para que se ejecute de forma directa y sin demoras
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
const indicatorsContainer = document.getElementById("carousel-indicators"); // Seleccionamos el nuevo contenedor

let currentIndex = 0; // Controla la posición del carrusel

// Función auxiliar para mover el carrusel y actualizar los puntos
function actualizarCarrusel() {
  // Mueve las imágenes
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Actualiza el estado visual de los puntos
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
  document.getElementById("modal-desc").textContent = proyecto.descripcion;

  const tagsHTML = proyecto.tecnologias
    .map((tech) => `<span class="tag">${tech}</span>`)
    .join("");
  document.getElementById("modal-tags").innerHTML = tagsHTML;

  // Limpiar carrusel y puntos anteriores
  track.innerHTML = "";
  indicatorsContainer.innerHTML = "";

  // Inyectar la nueva galería de imágenes y crear los puntos
  proyecto.galeria.forEach((ruta, index) => {
    // Crea la imagen
    const img = document.createElement("img");
    img.src = ruta;
    track.appendChild(img);

    // Crea el punto correspondiente
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active"); // El primero empieza activo

    // Hace que el punto sea cliqueable para saltar a esa foto
    dot.addEventListener("click", () => {
      currentIndex = index;
      actualizarCarrusel();
    });

    indicatorsContainer.appendChild(dot);
  });

  // Reiniciar a la primera foto
  currentIndex = 0;
  actualizarCarrusel();

  // Mostrar modal
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

// --- Lógica de Botones Flechas ---
if (track && prevBtn && nextBtn) {
  nextBtn.addEventListener("click", () => {
    const totalImages = track.querySelectorAll("img").length;
    if (totalImages === 0) return;

    currentIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
    actualizarCarrusel(); // Usamos la nueva función
  });

  prevBtn.addEventListener("click", () => {
    const totalImages = track.querySelectorAll("img").length;
    if (totalImages === 0) return;

    currentIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
    actualizarCarrusel(); // Usamos la nueva función
  });
}
