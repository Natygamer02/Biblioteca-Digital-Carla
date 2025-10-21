document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos existentes
    const typeButtons = document.querySelectorAll('.type-filter .filter-btn');
    const bookCards = document.querySelectorAll('.book-card');
    const ageDropdownContainer = document.querySelector('.age-dropdown-container');
    const ageDropdownToggle = document.getElementById('age-dropdown-toggle');
    const ageDropdownMenu = document.getElementById('age-dropdown-menu');
    const ageItems = document.querySelectorAll('.age-item');
    const itemCountDisplay = document.getElementById('item-count');

    // NOVO: Referência ao elemento de pesquisa
    const searchInput = document.getElementById('search-input'); // <-- NOVO

    // Estado global dos filtros
    let activeTypeFilter = 'all';
    let activeAgeFilter = 'all-age';

    // Função principal: Aplica filtros e pesquisa
    function applyFiltersAndSearch() {
        let visibleCount = 0;
        
        // Obtém o texto de pesquisa, converte para minúsculas e remove espaços
        const searchTerm = searchInput.value.toLowerCase().trim(); // <-- NOVO

        bookCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            
            // 1. Lógica de Filtro (Tipo e Idade)
            const matchesType = (activeTypeFilter === 'all') || categories.includes(activeTypeFilter);
            const matchesAge = (activeAgeFilter === 'all-age') || categories.includes(activeAgeFilter);

            // 2. Lógica de Pesquisa (Título e Autor)
            // Pegamos o texto completo do card para a busca, caso não haja um data-attribute específico.
            const cardText = card.textContent.toLowerCase();
            
            const matchesSearch = (searchTerm === '' || cardText.includes(searchTerm)); // <-- NOVO

            // 3. Condição Final: Um card é visível se passar por TODOS os filtros E pela pesquisa
            if (matchesType && matchesAge && matchesSearch) { // <-- LÓGICA UNIFICADA
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Atualiza o contador
        if (itemCountDisplay) {
            itemCountDisplay.textContent = visibleCount;
        }
    }

    // --- Dropdown de Faixa Etária ---
    // (O código desta seção não mudou, mas chama applyFiltersAndSearch)
    ageDropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        ageDropdownMenu.classList.toggle('hidden');
    });

    ageItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Lógica de atualização de filtro
            activeAgeFilter = item.getAttribute('data-filter-age');
            const displayText = item.textContent;
            ageDropdownToggle.innerHTML = `<i class="fas fa-child"></i> Faixa Etária: ${displayText}`;
            ageItems.forEach(a => a.classList.remove('active'));
            item.classList.add('active');

            ageDropdownMenu.classList.add('hidden');
            applyFiltersAndSearch(); // Chamada atualizada
        });
    });

    // ... (restante do código do dropdown)

    // --- Filtros de Categoria ---
    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Lógica de atualização de filtro
            activeTypeFilter = button.getAttribute('data-filter');
            typeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Reseta o filtro de faixa etária (Boa prática!)
            activeAgeFilter = 'all-age';
            ageDropdownToggle.innerHTML = `<i class="fas fa-child"></i> Faixa Etária: Todas`;
            ageItems.forEach(a => a.classList.remove('active'));
            document.querySelector('.age-item[data-filter-age="all-age"]').classList.add('active');

            applyFiltersAndSearch(); // Chamada atualizada
        });
    });

    // NOVO: Listener para o campo de pesquisa
    searchInput.addEventListener('keyup', () => {
        applyFiltersAndSearch(); // Aplica os filtros e a busca a cada tecla
    });

    // Aplica o filtro inicial na carga da página
    applyFiltersAndSearch(); // Chamada inicial
});