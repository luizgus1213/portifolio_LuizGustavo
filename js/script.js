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

const carousel = document.getElementById("lgCarousel");
const dotsContainer = document.getElementById("lgDots");
const totalSlides = 10;

let slideAtual = 0;
let intervaloCarousel;

if (carousel && dotsContainer) {
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");

    dot.classList.add("carousel-dot");
    dot.setAttribute("type", "button");
    dot.setAttribute("aria-label", `Ir para imagem ${i + 1}`);

    if (i === 0) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      slideAtual = i;
      atualizarCarousel();
      reiniciarIntervalo();

      enviarEventoAnalytics(
        "clique_dot_carrossel",
        "Projeto LG Trambicagens",
        `Imagem ${i + 1}`,
      );
    });

    dotsContainer.appendChild(dot);
  }

  iniciarIntervalo();
}

function atualizarCarousel() {
  if (!carousel) return;

  carousel.style.transform = `translateX(-${slideAtual * 100}%)`;

  document.querySelectorAll(".carousel-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === slideAtual);
  });
}

function mudarSlide(direcao) {
  slideAtual += direcao;

  if (slideAtual < 0) {
    slideAtual = totalSlides - 1;
  }

  if (slideAtual >= totalSlides) {
    slideAtual = 0;
  }

  atualizarCarousel();
  reiniciarIntervalo();

  enviarEventoAnalytics(
    "clique_carrossel",
    "Projeto LG Trambicagens",
    direcao > 0 ? "Próxima imagem" : "Imagem anterior",
  );
}

function iniciarIntervalo() {
  intervaloCarousel = setInterval(() => {
    mudarSlide(1);
  }, 3500);
}

function reiniciarIntervalo() {
  clearInterval(intervaloCarousel);
  iniciarIntervalo();
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

window.mudarSlide = mudarSlide;
