!(function () {
  const e = document.createElement("link").relList;
  if (!(e && e.supports && e.supports("modulepreload"))) {
    for (const e of document.querySelectorAll('link[rel="modulepreload"]'))
      r(e);
    new MutationObserver((e) => {
      for (const o of e)
        if ("childList" === o.type)
          for (const e of o.addedNodes)
            if ("LINK" === e.tagName && "modulepreload" === e.rel) r(e);
            else if (e.querySelectorAll)
              for (const o of e.querySelectorAll("link[rel=modulepreload]"))
                r(o);
    }).observe(document, { childList: !0, subtree: !0 });
  }
  function r(e) {
    if (e.ep) return;
    e.ep = !0;
    const r = (function (e) {
      const r = {};
      return (
        e.integrity && (r.integrity = e.integrity),
        e.referrerpolicy && (r.referrerPolicy = e.referrerpolicy),
        "use-credentials" === e.crossorigin
          ? (r.credentials = "include")
          : "anonymous" === e.crossorigin
          ? (r.credentials = "omit")
          : (r.credentials = "same-origin"),
        r
      );
    })(e);
    fetch(e.href, r);
  }
})();
{
  ("@context");
  "http://schema.org", "@graph";
  [
    {
      "@type": "WebPage",
      author: { "@id": "#identity" },
      copyrightHolder: { "@id": "#identity" },
      copyrightYear: "2023",
      creator: { "@id": "#creator" },
      dateCreated: "2023-09-15T11:27:24+02:00",
      dateModified: "2025-02-05T17:16:26+01:00",
      datePublished: "2023-09-15T11:27:00+02:00",
      description:
        "Evalúa las soft skills de tus candidatos y colaboradores con nuestros tests psicométricos y servicios. Dedica tiempo a conocer a tus talentos.",
      headline: "Evalúa las soft skills de tus talentos - PerformanSe",
      image: {
        "@type": "ImageObject",
        url: "https://www.performanse.com/assets/general/_1200x630_crop_center-center_82_none/Share.png",
      },
      inLanguage: "es",
      mainEntityOfPage: "https://www.performanse.com/es/",
      name: "English",
      publisher: { "@id": "#creator" },
      url: "https://www.performanse.com/es/",
    },
    { "@id": "#identity", "@type": "Organization" },
    { "@id": "#creator", "@type": "Organization" },
    {
      "@type": "BreadcrumbList",
      description: "Breadcrumbs list",
      itemListElement: [
        {
          "@type": "ListItem",
          item: "https://www.performanse.com/es/",
          name: "Inicio",
          position: 1,
        },
      ],
      name: "Breadcrumbs",
    },
  ];
}

function scrollToTop() {
  const scrollDuration = 2000; // Duración en milisegundos
  const start = window.scrollY;
  const startTime =
    "now" in window.performance ? performance.now() : new Date().getTime();

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const scroll = () => {
    const currentTime =
      "now" in window.performance ? performance.now() : new Date().getTime();
    const timeElapsed = currentTime - startTime;
    const nextScroll = easeInOutQuad(
      timeElapsed,
      start,
      -start,
      scrollDuration
    );

    window.scrollTo(0, nextScroll);

    if (timeElapsed < scrollDuration) {
      requestAnimationFrame(scroll);
    }
  };

  scroll();
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.body.style.opacity = 1;
  }, 2000); // 2000 milisegundos = 2 segundos
});