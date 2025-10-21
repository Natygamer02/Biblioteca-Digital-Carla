// noticias.js

// Banner
let slideIndex = 0;
const slides = document.querySelectorAll('.banner-slide');
const prevBtn = document.querySelector('.banner-prev');
const nextBtn = document.querySelector('.banner-next');

function showSlide(index) {
  slides.forEach((s, i) => s.classList.remove('active'));
  slides[index].classList.add('active');
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Troca automática a cada 5s
setInterval(nextSlide, 5000);

// Notícias
const newsCards = document.querySelectorAll('.news-card');
const newsImg = document.getElementById('news-img');
const newsTitle = document.getElementById('news-title');
const newsText = document.getElementById('news-text');
// 1. Adicionar referência ao container da notícia principal
const newsContent = document.querySelector('.news-content'); 


const newsData = [
  { img: 'img/pagina_noticias/conteudo_noticias/hora_da_historia/image1.jpg', title: 'HORA DA HISTÓRIA', text: 'Hoje tivemos a contação do livro os fantasticos livros de Modesto Máximo' },
  { img: 'img/pagina_noticias/conteudo_noticias/sugestao_literaria/image2.jpg', title: 'SUGESTÃO LITERÁRIA', text: 'Conteúdo completo da notícia 2.' },
  { img: 'img/pagina_noticias/conteudo_noticias/dica_pedagogica/image3.jpg', title: 'DICA PEDAGÓGICA', text: 'Conteúdo completo da notícia 3.' },
  { img: 'img/pagina_noticias/conteudo_noticias/momento_socioemocional/image4.jpg', title: 'MOMENTO SOCIOEMOCIONAL', text: 'Conteúdo completo da notícia 4.' },
  { img: 'img/pagina_noticias/conteudo_noticias/vozes_dos_educadores/image5.jpg', title: 'VOZES DOS EDUCADORES', text: 'Conteúdo completo da notícia 5.' },
  { img: 'img/pagina_noticias/conteudo_noticias/historia_de_vida/image6.jpg', title: 'HISTÓRIA DE VIDA', text: 'Conteúdo completo da notícia 6.' },
  { img: 'img/pagina_noticias/conteudo_noticias/conversa_com_especialista/image7.jpg', title: 'CONVERSA COM ESPECIALISTA', text: 'Conteúdo completo da notícia 7.' },
  { img: 'img/pagina_noticias/conteudo_noticias/cultura_em_foco/image8.jpg', title: 'CULTURA EM FOCO', text: 'Conteúdo completo da notícia 8.' },
  { img: 'img/pagina_noticias/conteudo_noticias/tecnodica/image9.jpg', title: 'TECNODICA', text: 'Conteúdo completo da notícia 9.' },
  { img: 'img/pagina_noticias/conteudo_noticias/arte_e_inclusao/image10.jpg', title: 'ARTE E INCLUSÃO', text: 'Conteúdo completo da notícia 10.' }
];

newsCards.forEach(card => {
  card.addEventListener('click', () => {
    const index = card.getAttribute('data-index');
    newsImg.src = newsData[index].img;
    newsTitle.textContent = newsData[index].title;
    newsText.textContent = newsData[index].text;

    // 2. Rola a página para o container da notícia principal
    // O 'behavior: "smooth"' faz a rolagem ser suave
    newsContent.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});