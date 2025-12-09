// Проверяем поддержку необходимых функций
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

// Оптимизированная функция для мобильных устройств
function startIntroAnimation() {
    const introAnimation = document.getElementById('intro-animation');
    const mainContent = document.getElementById('main-content');
    const circleText = document.getElementById('circle-text');
    const loadingProgress = document.querySelector('.loading-progress');
    const tagline = document.querySelector('.tagline');
    
    // Текст для анимации в круге
    const fullText = "Дистофея";
    let charIndex = 0;
    
    // Отключаем прокрутку во время анимации
    document.body.style.overflow = 'hidden';
    
    // Анимация загрузки
    loadingProgress.style.width = '100%';
    
    // Анимация текста в круге с задержкой для лучшей видимости
    const textInterval = setInterval(() => {
        if (charIndex < fullText.length) {
            circleText.textContent = fullText.substring(0, charIndex + 1);
            charIndex++;
            
            // Добавляем эффект "печатания" для последней буквы
            if (charIndex === fullText.length) {
                circleText.classList.add('typing-complete');
            }
        } else {
            clearInterval(textInterval);
        }
    }, 200);
    
    // Для мобильных устройств используем requestAnimationFrame для плавности
    let startTime = null;
    const animationDuration = 3500;
    
    function animateIntro(time) {
        if (!startTime) startTime = time;
        const progress = time - startTime;
        
        if (progress >= animationDuration) {
            // Завершение анимации
            introAnimation.style.opacity = '0';
            introAnimation.style.visibility = 'hidden';
            
            mainContent.style.opacity = '1';
            mainContent.style.visibility = 'visible';
            
            // Включаем прокрутку обратно
            document.body.style.overflow = 'auto';
            
            // Запускаем анимации на основном контенте
            animateElements();
            animateTagline();
        } else {
            requestAnimationFrame(animateIntro);
        }
    }
    
    // Запускаем анимацию
    requestAnimationFrame(animateIntro);
}

// Анимация появления элементов на основном экране
function animateElements() {
    const elements = document.querySelectorAll('.logo, .tagline, .description, .action-btn, .info-box');
    
    elements.forEach((element, index) => {
        // Для мобильных устройств используем более простую анимацию
        if (window.innerWidth <= 768) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 50 + (index * 80));
        } else {
            // Для десктопов - более сложная анимация
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        }
    });
}

// Анимация текста в подзаголовке
function animateTagline() {
    const tagline = document.querySelector('.tagline');
    const originalText = tagline.textContent;
    tagline.textContent = '';
    
    let taglineCharIndex = 0;
    const taglineInterval = setInterval(() => {
        if (taglineCharIndex < originalText.length) {
            tagline.textContent += originalText.charAt(taglineCharIndex);
            taglineCharIndex++;
        } else {
            clearInterval(taglineInterval);
        }
    }, window.innerWidth <= 768 ? 40 : 50); // Быстрее на мобильных
}

// Добавление эффекта при наведении на кнопки
function addButtonHoverEffects() {
    const buttons = document.querySelectorAll('.action-btn');
    const isTouch = isTouchDevice();
    
    buttons.forEach(button => {
        if (isTouch) {
            // Для сенсорных устройств используем события touch
            button.addEventListener('touchstart', function(e) {
                e.preventDefault();
                this.classList.add('active');
                
                // Добавляем эффект "вспышки"
                const flash = document.createElement('div');
                flash.style.position = 'absolute';
                flash.style.top = '0';
                flash.style.left = '0';
                flash.style.width = '100%';
                flash.style.height = '100%';
                flash.style.background = 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)';
                flash.style.borderRadius = '15px';
                flash.style.opacity = '0';
                flash.style.animation = 'flash 0.5s ease-out';
                flash.style.zIndex = '1';
                this.appendChild(flash);
                
                // Удаляем элемент после анимации
                setTimeout(() => {
                    if (this.contains(flash)) {
                        this.removeChild(flash);
                    }
                }, 500);
            });
            
            button.addEventListener('touchend', function() {
                this.classList.remove('active');
            });
        } else {
            // Для десктопов используем события мыши
            button.addEventListener('mouseenter', function() {
                // Добавляем небольшой наклон при наведении
                this.style.transform = 'translateY(-10px) scale(1.03) rotate(1deg)';
                
                // Добавляем эффект "вспышки"
                const flash = document.createElement('div');
                flash.style.position = 'absolute';
                flash.style.top = '0';
                flash.style.left = '0';
                flash.style.width = '100%';
                flash.style.height = '100%';
                flash.style.background = 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)';
                flash.style.borderRadius = '15px';
                flash.style.opacity = '0';
                flash.style.animation = 'flash 0.5s ease-out';
                this.appendChild(flash);
                
                // Удаляем элемент после анимации
                setTimeout(() => {
                    if (this.contains(flash)) {
                        this.removeChild(flash);
                    }
                }, 500);
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-10px) scale(1.03)';
            });
        }
        
        // Общий обработчик клика для всех устройств
        button.addEventListener('click', function(e) {
            // Небольшая задержка для завершения анимации перед переходом
            setTimeout(() => {
                // Переход по ссылке произойдет автоматически
            }, 300);
        });
    });
}

// Создаем оптимизированные частицы для фона
function createParticles() {
    // На мобильных устройствах создаем меньше частиц для производительности
    const particleCount = window.innerWidth <= 768 ? 15 : 25;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '-1';
    particlesContainer.style.overflow = 'hidden';
    
    document.body.appendChild(particlesContainer);
    
    // Создаем частицы
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = window.innerWidth <= 768 ? 
            (Math.random() * 3 + 1) + 'px' : 
            (Math.random() * 5 + 2) + 'px';
            
        particle.style.position = 'absolute';
        particle.style.width = size;
        particle.style.height = size;
        particle.style.background = Math.random() > 0.5 ? 
            'rgba(255, 56, 96, 0.5)' : 
            'rgba(184, 107, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        
        // Оптимизированная анимация для мобильных
        const duration = window.innerWidth <= 768 ? 
            (Math.random() * 8 + 8) : 
            (Math.random() * 10 + 10);
            
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.willChange = 'transform';
        
        particlesContainer.appendChild(particle);
    }
}

// Инициализация при полной загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем CSS для анимации вспышки
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flash {
            0% {
                opacity: 0;
                transform: scale(0.5);
            }
            50% {
                opacity: 0.8;
            }
            100% {
                opacity: 0;
                transform: scale(1.2);
            }
        }
        
        @-webkit-keyframes flash {
            0% {
                opacity: 0;
                -webkit-transform: scale(0.5);
            }
            50% {
                opacity: 0.8;
            }
            100% {
                opacity: 0;
                -webkit-transform: scale(1.2);
            }
        }
        
        .action-btn.active {
            transform: translateY(-5px) scale(1.02) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Запускаем анимации
    startIntroAnimation();
    addButtonHoverEffects();
    createParticles();
    
    // Обработка изменения ориентации экрана
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Пересоздаем частицы при изменении размера окна
            const oldParticles = document.querySelector('.particles-container');
            if (oldParticles) {
                oldParticles.remove();
            }
            createParticles();
        }, 250);
    });
});

// Обработка событий загрузки для улучшения производительности
window.addEventListener('load', function() {
    // Принудительный запуск анимации, если она не запустилась
    setTimeout(function() {
        const introAnimation = document.getElementById('intro-animation');
        if (introAnimation && introAnimation.style.opacity !== '0') {
            introAnimation.style.opacity = '0';
            introAnimation.style.visibility = 'hidden';
            
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.style.opacity = '1';
                mainContent.style.visibility = 'visible';
                document.body.style.overflow = 'auto';
                animateElements();
                animateTagline();
            }
        }
    }, 5000); // Запасной таймаут 5 секунд
});
