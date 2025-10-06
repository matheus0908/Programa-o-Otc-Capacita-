document.addEventListener('DOMContentLoaded', function() {
    // --- Seletores ---
    const navButtons = document.querySelectorAll('.nav-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const dayTabs = document.querySelectorAll('.day-tab');
    const dayContentPanels = document.querySelectorAll('.day-content');

    // --- Abas Principais ---
    navButtons.forEach(button => {
        button.addEventListener('click', () => setActiveTab(button.dataset.tab));
    });

    function setActiveTab(tabId) {
        navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
        tabContents.forEach(content => content.classList.toggle('active', content.id === tabId));
    }

    // --- LÓGICA DO CRONOGRAMA ---
    dayTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            setActiveDayPanel(tab.dataset.targetId);
        });
    });

    function setActiveDayPanel(targetId) {
        dayTabs.forEach(t => t.classList.remove('active'));
        dayContentPanels.forEach(c => c.classList.remove('active'));

        const targetButton = document.querySelector(`.day-tab[data-target-id='${targetId}']`);
        const targetPanel = document.getElementById(targetId);

        if (targetButton && targetPanel) {
            targetButton.classList.add('active');
            targetPanel.classList.add('active');
        }
    }

    // --- FUNÇÃO DE AUTOMAÇÃO (SILENCIOSA) ---
    function initializeSchedule() {
        // 1. Pega a data do computador.
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const dia = String(hoje.getDate()).padStart(2, '0');
        const hojeFormatado = `${ano}-${mes}-${dia}`;

        // 2. Verificação interna (visível no console F12)
        console.log(`Data detectada pelo relógio do computador: ${hojeFormatado}`);

        let matchFound = false;
        if (dayTabs.length > 0) {
            // 3. Procura um botão com a data de hoje
            for (const tab of dayTabs) {
                const tabDate = tab.dataset.date.trim();
                if (tabDate === hojeFormatado) {
                    // 4. Se encontrar, ativa o painel correto
                    setActiveDayPanel(tab.dataset.targetId);
                    tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                    matchFound = true;
                    // Verificação interna (visível no console F12)
                    console.log(`Match encontrado! O botão com data "${tabDate}" foi ativado.`);
                    break;
                }
            }
            // 5. Se não encontrar, ativa o primeiro da lista
            if (!matchFound) {
                setActiveDayPanel(dayTabs[0].dataset.targetId);
                // Verificação interna (visível no console F12)
                console.log(`Não foi encontrado nenhum evento para a data de hoje. O primeiro dia da lista foi ativado como padrão.`);
            }
        }
    }

    // --- INICIALIZAÇÃO ---
    initializeSchedule();

    // --- particles.js (completo, sem alterações) ---
    particlesJS('particles-js', { "particles": { "number": { "value": 60, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#4285F4" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#4285F4", "opacity": 0.2, "width": 1 }, "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": false }, "resize": true }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } } } }, "retina_detect": true });
});
