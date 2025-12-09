// УПРОЩЕННЫЙ И РАБОЧАЯ ВЕРСИЯ СКРИПТА
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, запускаем анимацию...');
    
    const introAnimation = document.getElementById('intro-animation');
    const mainContent = document.getElementById('main-content');
    const circleText = document.getElementById('circle-text');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // 1. Сразу запускаем анимацию загрузки
    loadingProgress.style.animation = 'loading 3s ease-in-out forwards';
    
    // 2. Анимация текста в круге
    const fullText = "Дистофея";
    let charIndex = 0;
    
    function animateText() {
        if (charIndex < fullText.length) {
            circleText.textContent = fullText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(animateText, 200);
        }
    }
    
    // Запускаем анимацию текста с небольшой задержкой
    setTimeout(animateText, 300);
    
    // 3. Завершаем анимацию через 3.5 секунды
    setTimeout(function() {
        console.log('Завершаем анимацию загрузки...');
        
        // Скрываем анимацию загрузки
        introAnimation.style.opacity = '0';
        introAnimation.style.visibility = 'hidden';
        
        // Показываем основной контент
        mainContent.classList.remove('hidden');
        mainContent.style.display = 'block';
        
        // Запускаем анимации элементов
        animateMainContent();
        
        // Убираем возможность прокрутки во время анимации
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 1000);
        
        console.log('Анимация завершена, показываем основной контент');
    }, 3500); // 3.5 секунды - достаточно для всех анимаций
});

// Анимация элементов основного контента
function animateMainContent() {
    console.log('Запускаем анимацию основного контента...');
    
    // Анимируем кнопки с задержкой
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach((button, index) => {
        setTimeout(() => {
            button.classList.add('visible');
            button.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }, 300 + (index * 150));
    });
    
    // Анимируем info-box
    const infoBox = document.querySelector('.info-box');
    setTimeout(() => {
        infoBox.classList.add('visible');
        infoBox.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }, 1000);
    
    // Анимация подзаголовка
    const tagline = document.querySelector('.tagline');
    const originalText = tagline.textContent;
    tagline.textContent = '';
    
    let taglineCharIndex = 0;
    function animateTaglineText() {
        if (taglineCharIndex < originalText.length) {
            tagline.textContent += originalText.charAt(taglineCharIndex);
            taglineCharIndex++;
            setTimeout(animateTaglineText, 50);
        }
    }
    
    setTimeout(animateTaglineText, 800);
}

// Добавляем обработчики для кнопок
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.action-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.03)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        // Для мобильных устройств
        button.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
    });
});

// Создаем простые частицы для фона
function createParticles() {
    const particleCount = window.innerWidth <= 768 ? 10 : 20;
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '-1';
    particlesContainer.style.overflow = 'hidden';
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        
        particle.style.position = 'absolute';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = Math.random() > 0.5 ? 
            'rgba(255, 56, 96, 0.5)' : 
            'rgba(184, 107, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Запускаем создание частиц после загрузки
window.addEventListener('load', function() {
    createParticles();
});

// Запасной таймер на случай, если что-то пойдет не так
setTimeout(function() {
    const introAnimation = document.getElementById('intro-animation');
    const mainContent = document.getElementById('main-content');
    
    if (introAnimation && introAnimation.style.visibility !== 'hidden') {
        console.log('Запасной таймер: принудительно скрываем анимацию');
        introAnimation.style.opacity = '0';
        introAnimation.style.visibility = 'hidden';
        
        if (mainContent) {
            mainContent.classList.remove('hidden');
            mainContent.style.display = 'block';
            animateMainContent();
        }
    }
}, 5000); // 5 секунд - максимальное время ожидания
