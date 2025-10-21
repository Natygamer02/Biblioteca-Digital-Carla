const assistantContainer = document.getElementById('welcome-assistant');
const speechBubble = document.getElementById('speech-bubble');
const avatarImg = document.getElementById('avatar-img');

// Função para mostrar o balão com animação
function showAssistantBubble() {
    speechBubble.classList.remove('hidden-completely'); // Remove display:none
    // Força o reflow para a transição funcionar do zero
    void speechBubble.offsetWidth; 
    speechBubble.classList.add('visible'); // Adiciona a classe para a animação
}

// Função para esconder o balão com animação
function hideAssistantBubble() {
    speechBubble.classList.remove('visible'); // Remove a classe para a animação
    // Quando a transição terminar, esconde completamente
    speechBubble.addEventListener('transitionend', function handler() {
        speechBubble.classList.add('hidden-completely');
        speechBubble.removeEventListener('transitionend', handler);
    }, { once: true }); // Executa o listener apenas uma vez
}

// Função para alternar a exibição do balão
function toggleAssistantBubble() {
    if (speechBubble.classList.contains('visible')) {
        hideAssistantBubble();
    } else {
        showAssistantBubble();
    }
}

// 1. Mostrar ao carregar e esconder após X segundos (Boas-vindas)
document.addEventListener('DOMContentLoaded', () => {
    // Mostra o balão automaticamente
    showAssistantBubble();

    // Esconde o balão após 8 segundos se o usuário não interagir
    setTimeout(() => {
        if (speechBubble.classList.contains('visible')) {
            hideAssistantBubble();
        }
    }, 8000); 
});

// 2. Mostrar/Esconder ao clicar no avatar
avatarImg.addEventListener('click', () => {
    toggleAssistantBubble();
});