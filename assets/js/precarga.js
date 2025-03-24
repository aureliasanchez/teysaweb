document.addEventListener("DOMContentLoaded", () => {
    // Grupos del carrusel inferior
    const imageGroups = {
        trenes: [
        "/assets/img/pages/productos/trenes/trenes_01.webp",
        "/assets/img/pages/productos/trenes/trenes_02.webp",
        "/assets/img/pages/productos/trenes/trenes_03.webp"
      ],
      automotris: [
        "/assets/img/pages/productos/automotris/automotris_01.webp",
        "/assets/img/pages/productos/automotris/automotris_02.webp",
        "/assets/img/pages/productos/automotris/automotris_03.webp",
        "/assets/img/pages/productos/automotris/automotris_04.webp",
        "/assets/img/pages/productos/automotris/automotris_05.webp",
        "/assets/img/pages/productos/automotris/automotris_06.webp"
      ],
      industrial: [
        "/assets/img/pages/productos/industrial/industrial_01.webp",
        "/assets/img/pages/productos/industrial/industrial_02.webp",
        "/assets/img/pages/productos/industrial/industrial_03.webp",
        "/assets/img/pages/productos/industrial/industrial_04.webp"
      ],
      aeronaves: [
        "/assets/img/pages/productos/aeronaves/aeronaves_01.webp",
        "/assets/img/pages/productos/aeronaves/aeronaves_02.webp",
        "/assets/img/pages/productos/aeronaves/aeronaves_03.webp",
        "/assets/img/pages/productos/aeronaves/aeronaves_04.webp"
      ],
      autopartes: [
        "/assets/img/pages/productos/autopartes/autoparte_01.webp",
        "/assets/img/pages/productos/autopartes/autoparte_02.webp"
      ]
    };
  
    // Imágenes sueltas (fuera de carruseles)
    const standaloneImages = [
      "/assets/img/pages/servicio/cortadoraOxi.webp",
      "/assets/img/pages/servicio/corteHidraulico.webp",
      "/assets/img/pages/servicio/maquinado.webp",
      "/assets/img/pages/servicio/doblarMetal.webp",
      "/assets/img/pages/servicio/doblarTubos.webp"
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
  