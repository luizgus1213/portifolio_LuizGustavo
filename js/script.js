const palavras = [
  "Full Stack Júnior",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "SEO",
  "Docker",
];

const typing = document.getElementById("typing");

let palavraIndex = 0;
let letraIndex = 0;
let apagando = false;

function escrever() {
  if (!typing) return;

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

const reveals = document.querySelectorAll(".reveal");

function revelarNaTela() {
  reveals.forEach((elemento) => {
    const topo = elemento.getBoundingClientRect().top;
    const alturaTela = window.innerHeight;

    if (topo < alturaTela - 100) {
      elemento.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revelarNaTela);
revelarNaTela();

const carrosseis = {};

function configurarCarousel(nome, trackId, dotsId, tituloProjeto) {
  const track = document.getElementById(trackId);
  const dotsContainer = document.getElementById(dotsId);

  if (!track || !dotsContainer) {
    console.warn(`Carrossel ${nome} não encontrado.`);
    return;
  }

  const imagens = Array.from(track.querySelectorAll("img"));

  if (imagens.length === 0) {
    console.warn(`Carrossel ${nome} não possui imagens.`);
    return;
  }

  carrosseis[nome] = {
    track,
    dotsContainer,
    imagens,
    totalSlides: imagens.length,
    slideAtual: 0,
    intervalo: null,
    tituloProjeto,
  };

  dotsContainer.innerHTML = "";

  imagens.forEach((img, index) => {
    img.setAttribute("loading", "lazy");

    img.addEventListener("click", () => {
      abrirImagem(img.src, img.alt);
    });

    img.addEventListener("error", () => {
      console.warn(`Imagem não encontrada: ${img.getAttribute("src")}`);
      img.style.display = "none";
    });

    const dot = document.createElement("button");

    dot.classList.add("carousel-dot");
    dot.setAttribute("type", "button");
    dot.setAttribute("aria-label", `Ir para imagem ${index + 1}`);

    if (index === 0) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      carrosseis[nome].slideAtual = index;
      atualizarCarousel(nome);
      reiniciarIntervalo(nome);

      enviarEventoAnalytics(
        "clique_dot_carrossel",
        tituloProjeto,
        `Imagem ${index + 1}`,
      );
    });

    dotsContainer.appendChild(dot);
  });

  atualizarCarousel(nome);
  iniciarIntervalo(nome);
}

function atualizarCarousel(nome) {
  const carousel = carrosseis[nome];

  if (!carousel) return;

  carousel.track.style.transform = `translateX(-${carousel.slideAtual * 100}%)`;

  carousel.dotsContainer
    .querySelectorAll(".carousel-dot")
    .forEach((dot, index) => {
      dot.classList.toggle("active", index === carousel.slideAtual);
    });
}

function mudarSlide(nome, direcao, origem = "botao") {
  const carousel = carrosseis[nome];

  if (!carousel) {
    console.warn(`Carrossel ${nome} não existe.`);
    return;
  }

  carousel.slideAtual += direcao;

  if (carousel.slideAtual < 0) {
    carousel.slideAtual = carousel.totalSlides - 1;
  }

  if (carousel.slideAtual >= carousel.totalSlides) {
    carousel.slideAtual = 0;
  }

  atualizarCarousel(nome);

  if (origem !== "auto") {
    reiniciarIntervalo(nome);

    enviarEventoAnalytics(
      "clique_carrossel",
      carousel.tituloProjeto,
      direcao > 0 ? "Próxima imagem" : "Imagem anterior",
    );
  }
}

function iniciarIntervalo(nome) {
  const carousel = carrosseis[nome];

  if (!carousel) return;

  clearInterval(carousel.intervalo);

  carousel.intervalo = setInterval(() => {
    mudarSlide(nome, 1, "auto");
  }, 4500);
}

function reiniciarIntervalo(nome) {
  iniciarIntervalo(nome);
}

function abrirImagemAtual(nome) {
  const carousel = carrosseis[nome];

  if (!carousel) {
    console.warn(`Carrossel ${nome} não encontrado para abrir imagem.`);
    return;
  }

  const imgAtual = carousel.imagens[carousel.slideAtual];

  if (!imgAtual) return;

  abrirImagem(imgAtual.src, imgAtual.alt);
}

function abrirImagem(src, alt) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  if (!lightbox || !lightboxImg) {
    console.warn("Lightbox não encontrado no HTML.");
    return;
  }

  lightboxImg.src = src;
  lightboxImg.alt = alt || "Imagem ampliada do projeto";

  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");

  enviarEventoAnalytics("abrir_imagem", "Imagem do projeto", alt || src);
}

function fecharLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  if (!lightbox || !lightboxImg) return;

  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    fecharLightbox();
  }
});

const lightbox = document.getElementById("lightbox");

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      fecharLightbox();
    }
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

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    const texto = link.textContent.trim();
    const href = link.getAttribute("href");

    enviarEventoAnalytics("clique_link", "Links do portfólio", texto || href);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  configurarCarousel("lg", "lgCarousel", "lgDots", "Projeto LG Trambicagens");
  configurarCarousel("vf", "vfCarousel", "vfDots", "Projeto VendaFácil");
});

window.mudarSlide = mudarSlide;
window.abrirImagemAtual = abrirImagemAtual;
window.fecharLightbox = fecharLightbox;
