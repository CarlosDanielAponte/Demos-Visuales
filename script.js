alert("Página aún en desarrollo");

// Base de datos de proyectos
// Base de datos de proyectos con nuevos enlaces de prueba estables
const proyectos = [
  {
    id: 1,
    titulo: "Modelo Maestro y Vinculación de Registros",
    // Imagen placeholder en azul oscuro que simula backend/estructura
    imagen:
      "https://placehold.co/600x400/2c3e50/ffffff?text=Estructura+de+Datos",
    tecnologias: ["SQL", "Data Modeling", "ETL"],
    resumen:
      "Integración de registros poblacionales y aseguramiento de integridad referencial.",
    descripcion:
      "Consolidación de registros distribuidos en múltiples entidades. Diseño de reglas de negocio para la vinculación de identidades, creando un modelo maestro robusto que limpia duplicidades y estandariza la información poblacional para su uso analítico posterior.",
  },
  {
    id: 2,
    titulo: "Análisis Exploratorio de Datos (EDA)",
    // Imagen placeholder en azul brillante que simula un dashboard
    imagen: "https://placehold.co/600x400/3498db/ffffff?text=Dashboard+Visual",
    tecnologias: ["Python", "Pandas", "Seaborn"],
    resumen:
      "Limpieza y visualización estadística de grandes conjuntos de datos.",
    descripcion:
      "Uso de Python para analizar la distribución de los datos. Implementación de gráficos de dispersión, histogramas y diagramas de caja (boxplots) con Seaborn para entender el comportamiento de las variables clave.",
  },
  {
    id: 3,
    titulo: "Detección de Anomalías (Outliers)",
    // Imagen placeholder en verde azulado que simula analítica avanzada
    imagen:
      "https://placehold.co/600x400/1abc9c/ffffff?text=Analisis+Estadistico",
    tecnologias: ["Python", "NumPy", "Estadística"],
    resumen:
      "Identificación de valores atípicos mediante cálculo del Rango Intercuartílico.",
    descripcion:
      "Desarrollo de algoritmos en Python para el filtrado sistemático de valores atípicos (outliers) utilizando métodos estadísticos como el IQR. Esto mejoró significativamente la calidad de los datos antes de introducirlos a los modelos de reporteo institucionales.",
  },
];

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

// --- Lógica del Modal ---
const modal = document.getElementById("project-modal");
const closeBtn = document.querySelector(".close-btn");

function abrirModal(proyecto) {
  document.getElementById("modal-title").textContent = proyecto.titulo;
  document.getElementById("modal-img").src = proyecto.imagen;
  document.getElementById("modal-desc").textContent = proyecto.descripcion;

  const tagsHTML = proyecto.tecnologias
    .map((tech) => `<span class="tag">${tech}</span>`)
    .join("");
  document.getElementById("modal-tags").innerHTML = tagsHTML;

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
