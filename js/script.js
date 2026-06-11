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

  if (!track || !dotsContainer) return;

  const imagens = track.querySelectorAll("img");
  const totalSlides = imagens.length;

  carrosseis[nome] = {
    track,
    dotsContainer,
    totalSlides,
    slideAtual: 0,
    intervalo: null,
    tituloProjeto,
  };

  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");

    dot.classList.add("carousel-dot");
    dot.setAttribute("type", "button");
    dot.setAttribute("aria-label", `Ir para imagem ${i + 1}`);

    if (i === 0) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      carrosseis[nome].slideAtual = i;
      atualizarCarousel(nome);
      reiniciarIntervalo(nome);

      enviarEventoAnalytics(
        "clique_dot_carrossel",
        tituloProjeto,
        `Imagem ${i + 1}`,
      );
    });

    dotsContainer.appendChild(dot);
  }

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

  if (!carousel) return;

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

  carousel.intervalo = setInterval(() => {
    mudarSlide(nome, 1, "auto");
  }, 3500);
}

function reiniciarIntervalo(nome) {
  const carousel = carrosseis[nome];

  if (!carousel) return;

  clearInterval(carousel.intervalo);
  iniciarIntervalo(nome);
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

configurarCarousel("lg", "lgCarousel", "lgDots", "Projeto LG Trambicagens");

configurarCarousel("vf", "vfCarousel", "vfDots", "Projeto VendaFácil Pro");

window.mudarSlide = mudarSlide;
