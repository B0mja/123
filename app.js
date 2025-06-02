let scores = { ua: 0, ru: 0 };
let selectedTeam = null;

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    updateScores();
});

// Выбор команды
function selectTeam(team) {
    selectedTeam = team;
    document.getElementById('main-screen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('main-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'flex';
    }, 500);
    
    // Настройка фона и отображения
    if (team === 'ua') {
        document.body.style.background = 'linear-gradient(135deg, var(--ua-blue), var(--ua-yellow))';
        document.getElementById('ru-rocket').style.display = 'none';
        document.getElementById('ru-label-game').style.opacity = '0.7';
        document.getElementById('ua-label-game').style.fontWeight = '900';
    } else {
        document.body.style.background = 'linear-gradient(135deg, var(--ru-white), var(--ru-blue), var(--ru-red))';
        document.getElementById('ua-rocket').style.display = 'none';
        document.getElementById('ua-label-game').style.opacity = '0.7';
        document.getElementById('ru-label-game').style.fontWeight = '900';
    }
}

// Возврат на главный экран
function backToMain() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('main-screen').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('main-screen').style.opacity = '1';
    }, 10);
    
    // Сброс отображения ракет
    document.getElementById('ua-rocket').style.display = 'block';
    document.getElementById('ru-rocket').style.display = 'block';
    
    // Сброс стилей текста
    document.getElementById('ua-label-game').style.opacity = '1';
    document.getElementById('ru-label-game').style.opacity = '1';
    document.getElementById('ua-label-game').style.fontWeight = '700';
    document.getElementById('ru-label-game').style.fontWeight = '700';
}

// Запуск ракеты
function launchRocket(team) {
    scores[team]++;
    updateScores();
    
    // Анимация ракеты
    const rocket = document.getElementById(`${team}-rocket`);
    rocket.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        rocket.style.transform = 'translateY(0)';
    }, 200);
    
    // Эффект пламени
    const flame = rocket.querySelector('.rocket-flame');
    flame.style.opacity = '0.9';
    setTimeout(() => {
        flame.style.opacity = '0';
    }, 300);
}

// Обновление всех счетчиков
function updateScores() {
    const total = scores.ua + scores.ru;
    const uaPercent = total > 0 ? (scores.ua / total) * 100 : 50;
    const ruPercent = total > 0 ? (scores.ru / total) * 100 : 50;
    
    // Главный экран
    document.getElementById('ua-progress').style.width = `${uaPercent}%`;
    document.getElementById('ru-progress').style.flexGrow = ruPercent / uaPercent;
    document.getElementById('ua-score').textContent = scores.ua;
    document.getElementById('ru-score').textContent = scores.ru;
    document.getElementById('total-score').textContent = `Всего: ${total}`;
    
    // Игровой экран
    document.getElementById('ua-progress-game').style.width = `${uaPercent}%`;
    document.getElementById('ru-progress-game').style.flexGrow = ruPercent / uaPercent;
    document.getElementById('ua-score-game').textContent = scores.ua;
    document.getElementById('ru-score-game').textContent = scores.ru;
    document.getElementById('total-score-game').textContent = `Всего: ${total}`;
}