const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

const fallbackContent = {
  perfil: {
    nombre: "Nombre Apellido",
    iniciales: "NR",
    cargoCorto: "Coordinador de Redes",
    heroEtiqueta: "Portfolio IT · Redes · Operaciones",
    heroTitulo: "Coordinación de infraestructuras de red con foco en estabilidad, seguridad y mejora continua.",
    heroTexto: "Perfil técnico especializado en gestión de equipos, operación de redes corporativas, resolución de incidencias críticas y despliegue de soluciones escalables para entornos empresariales.",
    heroImagen: "assets/network-mark.svg",
    indicadorEtiqueta: "Estado operativo",
    indicadorValor: "99.95%",
    indicadorTexto: "Disponibilidad anual de servicios críticos"
  },
  sobreMi: {
    titulo: "Perfil orientado a operación, liderazgo técnico y servicio.",
    textos: [
      "Soy coordinador del departamento de redes, con experiencia en la supervisión de infraestructuras, planificación de cambios, soporte a equipos técnicos y comunicación con áreas de negocio.",
      "Mi trabajo combina criterio técnico, gestión de prioridades y documentación clara para que los entornos de red sean predecibles, seguros y sostenibles."
    ]
  },
  metricas: [],
  skills: [],
  experiencia: { titulo: "Responsabilidades principales", items: [] },
  proyectos: { titulo: "Casos destacados", intro: "", items: [] },
  certificaciones: { titulo: "Conocimiento certificado", items: [] },
  formacion: { titulo: "Base académica y técnica", items: [] },
  cv: { titulo: "Currículum orientado a roles de coordinación IT, redes e infraestructura.", archivo: "#", textoBoton: "Descargar CV" },
  contacto: { titulo: "Hablemos de redes, continuidad operativa y mejora de infraestructura.", email: "", telefono: "", linkedin: "", github: "" }
};

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element && value) {
    element.textContent = value;
  }
};

const clearAndAppend = (selector, nodes) => {
  const container = document.querySelector(selector);
  if (!container) return;
  container.replaceChildren(...nodes);
};

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const formatPhoneHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;

const renderProfile = (content) => {
  const { perfil, sobreMi, experiencia, proyectos, certificaciones, formacion, cv, contacto } = content;

  setText('[data-content="iniciales"]', perfil.iniciales);
  setText('[data-content="nombre"]', perfil.nombre);
  setText('[data-content="cargoCorto"]', perfil.cargoCorto);
  setText('[data-content="heroEtiqueta"]', perfil.heroEtiqueta);
  setText('[data-content="heroTitulo"]', perfil.heroTitulo);
  setText('[data-content="heroTexto"]', perfil.heroTexto);
  setText('[data-content="indicadorEtiqueta"]', perfil.indicadorEtiqueta);
  setText('[data-content="indicadorValor"]', perfil.indicadorValor);
  setText('[data-content="indicadorTexto"]', perfil.indicadorTexto);
  setText('[data-content="sobreMiTitulo"]', sobreMi.titulo);
  setText('[data-content="experienciaTitulo"]', experiencia.titulo);
  setText('[data-content="proyectosTitulo"]', proyectos.titulo);
  setText('[data-content="proyectosIntro"]', proyectos.intro);
  setText('[data-content="certificacionesTitulo"]', certificaciones.titulo);
  setText('[data-content="formacionTitulo"]', formacion.titulo);
  setText('[data-content="cvTitulo"]', cv.titulo);
  setText('[data-content="contactoTitulo"]', contacto.titulo);
  setText('[data-content="footer"]', `© ${new Date().getFullYear()} ${perfil.nombre}`);

  const heroImage = document.querySelector('[data-content="heroImagen"]');
  if (heroImage && perfil.heroImagen) {
    heroImage.setAttribute("src", perfil.heroImagen);
    heroImage.setAttribute("alt", perfil.heroImagenAlt || "");
  }

  const cvLink = document.querySelector('[data-content="cvEnlace"]');
  if (cvLink) {
    cvLink.textContent = cv.textoBoton || "Descargar CV";
    cvLink.setAttribute("href", cv.archivo || "#");
  }
};

const renderAbout = (texts) => {
  const nodes = texts.map((text) => createElement("p", "", text));
  clearAndAppend('[data-list="sobreMiTextos"]', nodes);
};

const renderMetrics = (metrics) => {
  const nodes = metrics.map((metric) => {
    const article = createElement("article");
    article.append(createElement("strong", "", metric.valor), createElement("span", "", metric.texto));
    return article;
  });
  clearAndAppend('[data-list="metricas"]', nodes);
};

const renderSocial = (contact) => {
  const socials = [
    ["in", contact.linkedin],
    ["gh", contact.github],
    ["@", contact.email ? `mailto:${contact.email}` : ""]
  ]
    .filter(([, url]) => url)
    .map(([label, url]) => {
      const link = createElement("a", "", label);
      link.setAttribute("href", url);
      if (!url.startsWith("mailto:")) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noreferrer");
      }
      return link;
    });

  clearAndAppend('[data-list="social"]', socials);
};

const renderSkills = (skills) => {
  const nodes = skills.map((category) => {
    const article = createElement("article", "skill-card");
    const list = createElement("ul", "");

    (category.items || []).forEach((item) => {
      list.append(createElement("li", "", item));
    });

    article.append(createElement("h3", "", category.categoria), list);
    return article;
  });

  clearAndAppend('[data-list="skills"]', nodes);
};

const renderExperience = (items) => {
  const nodes = items.map((item) => {
    const article = createElement("article");
    const body = createElement("div");
    body.append(
      createElement("h3", "", item.puesto),
      createElement("p", "item-meta", [item.empresa, item.periodo].filter(Boolean).join(" · ")),
      createElement("p", "", item.descripcion)
    );
    article.append(createElement("span", "date", item.periodo), body);
    return article;
  });
  clearAndAppend('[data-list="experiencia"]', nodes);
};

const renderProjects = (items) => {
  const nodes = items.map((item, index) => {
    const article = createElement("article", "project-card");

    const imageWrap = createElement("div", "project-media");
    const image = createElement("img", "project-image");
    image.setAttribute("src", item.imagen || "assets/network-mark.svg");
    image.setAttribute("alt", item.imagenAlt || item.titulo);
    imageWrap.append(image);

    const number = String(index + 1).padStart(2, "0");
    const meta = [item.periodo, item.estado].filter(Boolean).join(" · ");
    const techList = createElement("ul", "mini-tags");
    const body = createElement("div", "project-body");

    (item.tecnologias || []).forEach((technology) => {
      techList.append(createElement("li", "", technology));
    });

    body.append(
      createElement("span", "project-number", number),
      createElement("h3", "", item.titulo),
      createElement("p", "item-meta", meta),
      createElement("p", "", item.descripcion)
    );

    if (techList.children.length) {
      body.append(techList);
    }

    article.append(imageWrap, body);
    return article;
  });
  clearAndAppend('[data-list="proyectos"]', nodes);
};

const renderCertifications = (items) => {
  const nodes = items.map((item) => {
    const element = item.url ? createElement("a", "certification-card") : createElement("article", "certification-card");
    if (item.url) {
      element.setAttribute("href", item.url);
      element.setAttribute("target", "_blank");
      element.setAttribute("rel", "noreferrer");
    }

    element.append(
      createElement("h3", "", item.nombre),
      createElement("p", "", [item.entidad, item.anio].filter(Boolean).join(" · ")),
      createElement("span", "", item.estado)
    );
    return element;
  });
  clearAndAppend('[data-list="certificaciones"]', nodes);
};

const renderEducation = (items) => {
  const nodes = items.map((item) => {
    const article = createElement("article");
    article.append(
      createElement("h3", "", item.titulo),
      createElement("p", "item-meta", [item.centro, item.periodo].filter(Boolean).join(" · ")),
      createElement("p", "", item.descripcion)
    );
    return article;
  });
  clearAndAppend('[data-list="formacion"]', nodes);
};

const renderContact = (contact) => {
  const links = [];

  if (contact.email) {
    const email = createElement("a", "", contact.email);
    email.setAttribute("href", `mailto:${contact.email}`);
    links.push(email);
  }

  if (contact.telefono) {
    const phone = createElement("a", "", contact.telefono);
    phone.setAttribute("href", formatPhoneHref(contact.telefono));
    links.push(phone);
  }

  [
    ["LinkedIn", contact.linkedin],
    ["GitHub", contact.github]
  ].forEach(([label, url]) => {
    if (!url) return;
    const link = createElement("a", "", label);
    link.setAttribute("href", url);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noreferrer");
    links.push(link);
  });

  clearAndAppend('[data-list="contacto"]', links);
};

const renderContent = (content) => {
  renderProfile(content);
  renderAbout(content.sobreMi.textos || []);
  renderSocial(content.contacto || {});
  renderSkills(content.skills || []);
  renderMetrics(content.metricas || []);
  renderExperience(content.experiencia.items || []);
  renderProjects(content.proyectos.items || []);
  renderCertifications(content.certificaciones.items || []);
  renderEducation(content.formacion.items || []);
  renderContact(content.contacto || {});
};

fetch("content.json")
  .then((response) => {
    if (!response.ok) throw new Error("No se pudo cargar content.json");
    return response.json();
  })
  .then(renderContent)
  .catch(() => renderContent(fallbackContent));
