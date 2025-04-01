document.addEventListener("DOMContentLoaded", () => {
    // Grupos del carrusel inferior
    const imageGroups = {
        trenes: [
        "/assets/img/pages/productos/trenes/trenes_01.webp",
        "/assets/img/pages/productos/trenes/trenes_02.webp",
        "/assets/img/pages/productos/trenes/trenes_03.webp"
      ],
      automotris: [
        "/assets/img/pages/productos/automotris/automotris_06.webp"
      ],
      industrial: [
        "/assets/img/pages/productos/industrial/industrial_01.webp",
      ],
      aeronaves: [
        "/assets/img/pages/productos/aeronaves/aeronaves_01.webp",
      ],
      autopartes: [
        "/assets/img/pages/productos/autopartes/autoparte_01.webp"
      ],
      detallado: [
        "/assets/img/pages/servicio/detallado/detallado_01.webp",
        "/assets/img/pages/servicio/detallado/detallado_02.webp",
        "/assets/img/pages/servicio/detallado/detallado_04.webp",
        "/assets/img/pages/servicio/detallado/detallado_06.webp"
      ],
      agua: [
        "/assets/img/pages/servicio/agua/agua_09.webp",
      ],
      plasma: [
        "/assets/img/pages/servicio/plasma/plasma_01.webp"
      ],
      laser: [
        "/assets/img/pages/servicio/laser/laser_05.webp"
      ],
      guillotina: [
        "/assets/img/pages/servicio/guillotina/guillotina_06.webp"
      ],
      cnc: [
        "/assets/img/pages/servicio/cnc/cnc_01.webp",
      ],
      convencional: [
        "/assets/img/pages/servicio/convencional/convencional_06.webp"
      ],
      tubos: [
        "/assets/img/pages/servicio/tubos/tubos_02.webp",
      ]
    };
  
    // Imágenes sueltas (fuera de carruseles)
    const standaloneImages = [
      "/assets/img/pages/index/servicios/corte.webp",
      "/assets/img/pages/index/servicios/doblado.webp",
      "/assets/img/pages/index/servicios/guillotina.webp",
      "/assets/img/pages/index/servicios/tubos.webp",
      "/assets/img/pages/productos/fondo.webp",
      "/assets/img/pages/acercaDe/fondo.webp",
      "/assets/img/pages/servicio/fondo.webp",
      "/assets/img/pages/index/servicios/convencional.webp"
    ];
  
    // Pre-cargar todas las imágenes
    const allImages = [
      ...Object.values(imageGroups).flat(),
      ...standaloneImages
    ];
  
    allImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  });
  