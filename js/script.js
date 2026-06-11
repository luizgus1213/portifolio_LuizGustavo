const palavras = [
  "Full Stack Júnior",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "SEO",
  "Docker",
];

const projetos = {
  lg: {
    titulo: "LG Trambicagens",
    galeriaId: "galleryLg",
    imagens: [
      {
        src: "img/lg-trambicagens-1.png",
        alt: "LG Trambicagens - Página inicial",
        nome: "Página inicial",
      },
      {
        src: "img/lg-trambicagens-2.png",
        alt: "LG Trambicagens - Painel de pedidos",
        nome: "Painel de pedidos",
      },
      {
        src: "img/lg-trambicagens-3.png",
        alt: "LG Trambicagens - Página de produto",
        nome: "Página de produto",
      },
      {
        src: "img/lg-trambicagens-4.png",
        alt: "LG Trambicagens - Filtros",
        nome: "Filtros",
      },
      {
        src: "img/lg-trambicagens-5.png",
        alt: "LG Trambicagens - Resultados de pesquisa",
        nome: "Resultados",
      },
      {
        src: "img/lg-trambicagens-6.png",
        alt: "LG Trambicagens - Carrinho",
        nome: "Carrinho",
      },
      {
        src: "img/lg-trambicagens-7.png",
        alt: "LG Trambicagens - Checkout",
        nome: "Checkout",
      },
      {
        src: "img/lg-trambicagens-8.png",
        alt: "LG Trambicagens - Rastreamento de pedido",
        nome: "Pedido",
      },
      {
        src: "img/lg-trambicagens-9.png",
        alt: "LG Trambicagens - Perfil do usuário",
        nome: "Perfil",
      },
      {
        src: "img/lg-trambicagens-10.png",
        alt: "LG Trambicagens - Menu lateral",
        nome: "Menu lateral",
      },
    ],
  },

  vf: {
    titulo: "VendaFácil",
    galeriaId: "galleryVf",
    imagens: [
      {
        src: "img/vendafacil-1.png",
        alt: "VendaFácil - Criar conta",
        nome: "Criar conta",
      },
      {
        src: "img/vendafacil-2.png",
        alt: "VendaFácil - Login",
        nome: "Login",
      },
      {
        src: "img/vendafacil-3.png",
        alt: "VendaFácil - Vendas",
        nome: "Vendas",
      },
      {
        src: "img/vendafacil-4.png",
        alt: "VendaFácil - Financeiro",
        nome: "Financeiro",
      },
      {
        src: "img/vendafacil-5.png",
        alt: "VendaFácil - Registrar venda",
        nome: "Registrar venda",
      },
      {
        src: "img/vendafacil-6.png",
        alt: "VendaFácil - Cadastrar produto",
        nome: "Cadastrar produto",
      },
      {
        src: "img/vendafacil-7.png",
        alt: "VendaFácil - Produção",
        nome: "Produção",
      },
      {
        src: "img/vendafacil-8.png",
        alt: "VendaFácil - Estoque",
        nome: "Estoque",
      },
      {
        src: "img/vendafacil-9.png",
        alt: "VendaFácil - Resumo financeiro",
        nome: "Resumo financeiro",
      },
    ],
  },
};

const carrosseis = {};
let lightboxLista = [];
let lightboxIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  iniciarDigitacao();
  iniciarReveal();
  iniciarCarrosseis();
  montarGalerias();
  iniciarGaleria();
  iniciarLightbox();
  iniciarAnalyticsLinks();
});

function iniciarDigitacao() {
  const typing = document.getElementById("typing");

  if (!typing) return;

  let palavraIndex = 0;
  let letraIndex = 0;
  let apagando = false;

  function escrever() {
    const palavraAtual = palavras[palavraIndex];

    if (!apagando) {
      typing.textContent = palavraAtual.substring(0, letraIndex + 1);
      letraIndex++;

      if (letraIndex === palavraAtual.length) {
        apagando = true;
        setTimeout(escrever, 1300);
        return;
      }
    } else {
      typing.textContent = palavraAtual.substring(0, letraIndex - 1);
      letraIndex--;

      if (letraIndex === 0) {
        apagando = false;
        palavraIndex = (palavraIndex + 1) % palavras.length;
      }
    }

    setTimeout(escrever, apagando ? 45 : 85);
  }

  escrever();
}

function iniciarReveal() {
  const elementos = document.querySelectorAll(".reveal");

  if (!elementos.length) return;

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  elementos.forEach((elemento) => observer.observe(elemento));
}

function iniciarCarrosseis() {
  Object.keys(projetos).forEach((chave) => {
    const projeto = projetos[chave];
    const carousel = document.querySelector(`[data-carousel="${chave}"]`);

    if (!carousel) return;

    const track = carousel.querySelector(".carousel-track");
    const imagens = Array.from(track.querySelectorAll("img"));
    const dotsContainer = document.querySelector(
      `[data-carousel-dots="${chave}"]`,
    );
    const prevButton = document.querySelector(
      `[data-carousel-prev="${chave}"]`,
    );
    const nextButton = document.querySelector(
      `[data-carousel-next="${chave}"]`,
    );
    const openButton = document.querySelector(`[data-open-current="${chave}"]`);

    if (!track || !imagens.length || !dotsContainer) return;

    carrosseis[chave] = {
      projeto,
      track,
      imagens,
      dotsContainer,
      atual: 0,
      timer: null,
    };

    dotsContainer.innerHTML = "";

    imagens.forEach((img, index) => {
      img.loading = "lazy";

      img.addEventListener("click", () => {
        abrirLightbox(projeto.imagens, index);
      });

      img.addEventListener("error", () => {
        console.warn(`Imagem não encontrada: ${img.getAttribute("src")}`);
      });

      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `Ir para imagem ${index + 1}`);

      dot.addEventListener("click", () => {
        irParaSlide(chave, index);
        reiniciarTimer(chave);
      });

      dotsContainer.appendChild(dot);
    });

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        mudarSlide(chave, -1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        mudarSlide(chave, 1);
      });
    }

    if (openButton) {
      openButton.addEventListener("click", () => {
        abrirLightbox(projeto.imagens, carrosseis[chave].atual);
      });
    }

    irParaSlide(chave, 0);
    iniciarTimer(chave);
  });
}

function irParaSlide(chave, index) {
  const carousel = carrosseis[chave];

  if (!carousel) return;

  const total = carousel.imagens.length;

  carousel.atual = ((index % total) + total) % total;
  carousel.track.style.transform = `translateX(-${carousel.atual * 100}%)`;

  const dots = carousel.dotsContainer.querySelectorAll(".carousel-dot");

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === carousel.atual);
  });
}

function mudarSlide(chave, direcao) {
  const carousel = carrosseis[chave];

  if (!carousel) return;

  irParaSlide(chave, carousel.atual + direcao);
  reiniciarTimer(chave);

  enviarEventoAnalytics(
    "clique_carrossel",
    carousel.projeto.titulo,
    direcao > 0 ? "Próxima imagem" : "Imagem anterior",
  );
}

function iniciarTimer(chave) {
  const carousel = carrosseis[chave];

  if (!carousel) return;

  clearInterval(carousel.timer);

  carousel.timer = setInterval(() => {
    irParaSlide(chave, carousel.atual + 1);
  }, 5000);
}

function reiniciarTimer(chave) {
  iniciarTimer(chave);
}

function montarGalerias() {
  Object.keys(projetos).forEach((chave) => {
    const projeto = projetos[chave];
    const container = document.getElementById(projeto.galeriaId);

    if (!container) return;

    container.innerHTML = "";

    projeto.imagens.forEach((imagem, index) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "gallery-card";

      button.innerHTML = `
        <img src="${imagem.src}" alt="${imagem.alt}" loading="lazy" />
        <span>${imagem.nome}</span>
      `;

      button.addEventListener("click", () => {
        abrirLightbox(projeto.imagens, index);
      });

      container.appendChild(button);
    });
  });
}

function iniciarGaleria() {
  const gallery = document.getElementById("gallery");
  const toggleButton = document.getElementById("toggleGallery");

  if (!gallery || !toggleButton) return;

  toggleButton.addEventListener("click", () => {
    gallery.classList.toggle("maximized");

    const maximizada = gallery.classList.contains("maximized");

    toggleButton.textContent = maximizada
      ? "Minimizar imagens"
      : "Maximizar imagens";

    enviarEventoAnalytics(
      "alternar_galeria",
      "Galeria",
      maximizada ? "Maximizar imagens" : "Minimizar imagens",
    );
  });
}

function iniciarLightbox() {
  const lightbox = document.getElementById("lightbox");
  const closeButton = document.getElementById("lightboxClose");
  const prevButton = document.getElementById("lightboxPrev");
  const nextButton = document.getElementById("lightboxNext");

  if (!lightbox) return;

  if (closeButton) {
    closeButton.addEventListener("click", fecharLightbox);
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => mudarImagemLightbox(-1));
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => mudarImagemLightbox(1));
  }

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      fecharLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      fecharLightbox();
    }

    if (event.key === "ArrowLeft") {
      mudarImagemLightbox(-1);
    }

    if (event.key === "ArrowRight") {
      mudarImagemLightbox(1);
    }
  });
}

function abrirLightbox(lista, index) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");

  if (!lightbox || !lightboxImg) return;

  lightboxLista = lista;
  lightboxIndex = index;

  const imagem = lightboxLista[lightboxIndex];

  lightboxImg.src = imagem.src;
  lightboxImg.alt = imagem.alt;

  if (lightboxCaption) {
    lightboxCaption.textContent = imagem.alt;
  }

  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");

  enviarEventoAnalytics("abrir_imagem", "Imagem ampliada", imagem.alt);
}

function mudarImagemLightbox(direcao) {
  if (!lightboxLista.length) return;

  lightboxIndex =
    (lightboxIndex + direcao + lightboxLista.length) % lightboxLista.length;

  const imagem = lightboxLista[lightboxIndex];
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");

  if (!lightboxImg) return;

  lightboxImg.src = imagem.src;
  lightboxImg.alt = imagem.alt;

  if (lightboxCaption) {
    lightboxCaption.textContent = imagem.alt;
  }
}

function fecharLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");

  if (!lightbox || !lightboxImg) return;

  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";

  if (lightboxCaption) {
    lightboxCaption.textContent = "";
  }
}

function iniciarAnalyticsLinks() {
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      const texto = link.textContent.trim();
      const href = link.getAttribute("href");

      enviarEventoAnalytics("clique_link", "Links do portfólio", texto || href);
    });
  });
}

function enviarEventoAnalytics(nomeEvento, categoria, rotulo) {
  if (typeof gtag === "function") {
    gtag("event", nomeEvento, {
      event_category: categoria,
      event_label: rotulo,
    });
  }
}

window.mudarSlide = mudarSlide;
window.abrirLightbox = abrirLightbox;
window.fecharLightbox = fecharLightbox;
