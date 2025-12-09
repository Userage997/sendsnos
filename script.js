document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const introAnimation = document.getElementById('intro-animation');
    const mainContent = document.getElementById('main-content');
    const circleText = document.getElementById('circle-text');
    const loadingProgress = document.querySelector('.loading-progress');
    const statProjects = document.getElementById('projects-count');
    const statCommunity = document.getElementById('community-count');
    const statKnowledge = document.getElementById('knowledge-count');
    
    // Текст для анимации в круге
    const fullText = "Дистофея";
    let charIndex = 0;
    
    // Запуск вступительной анимации
    function startIntroAnimation() {
        // Запуск анимации появления текста в круге
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
        
        // Завершение анимации загрузки и переход к основному контенту
        setTimeout(() => {
            introAnimation.style.opacity = '0';
            introAnimation.style.visibility = 'hidden';
            
            mainContent.style.opacity = '1';
            mainContent.style.visibility = 'visible';
            
            // Запуск анимаций на основном контенте
            animateElements();
            startCounterAnimation();
        }, 3500);
    }
    
    // Анимация появления элементов на основном экране
    function animateElements() {
        const elements = document.querySelectorAll('.logo, .tagline, .description, .action-btn, .info-box, .stat-item');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    }
    
    // Анимация счетчиков
    function startCounterAnimation() {
        // Финальные значения счетчиков
        const finalValues = {
            projects: 2,
            community: 5000+,
            knowledge: 300+
        };
        
        // Скорость анимации
        const duration = 2000; // 2 секунды
        const frameRate = 30; // кадров в секунду
        const totalFrames = Math.floor(duration / (1000 / frameRate));
        
        let currentFrame = 0;
        
        const counterInterval = setInterval(() => {
            currentFrame++;
            
            // Вычисляем текущие значения на основе прогресса
            const progress = currentFrame / totalFrames;
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Кубическое замедление
            
            statProjects.textContent = Math.floor(finalValues.projects * easeProgress);
            statCommunity.textContent = Math.floor(finalValues.community * easeProgress);
            statKnowledge.textContent = Math.floor(finalValues.knowledge * easeProgress);
            
            if (currentFrame >= totalFrames) {
                clearInterval(counterInterval);
                
                // Устанавливаем точные финальные значения
                statProjects.textContent = finalValues.projects;
                statCommunity.textContent = finalValues.community.toLocaleString();
                statKnowledge.textContent = finalValues.knowledge;
            }
        }, 1000 / frameRate);
    }
    
    // Добавление эффекта при наведении на кнопки
    function addButtonHoverEffects() {
        const buttons = document.querySelectorAll('.action-btn');
        
        buttons.forEach(button => {
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
        });
    }
    
    // Добавление CSS для анимации вспышки
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
    `;
    document.head.appendChild(style);
    
    // Инициализация
    startIntroAnimation();
    addButtonHoverEffects();
    
    // Добавляем случайные частицы на фон
    createParticles();
    
    // Функция для создания частиц на фоне
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.pointerEvents = 'none';
        particlesContainer.style.zIndex = '-1';
        
        document.body.appendChild(particlesContainer);
        
        // Создаем частицы
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 5 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = Math.random() > 0.5 ? 'rgba(255, 56, 96, 0.5)' : 'rgba(184, 107, 255, 0.5)';
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.left = Math.random() * 100 + '%';
            
            // Анимация частиц
            particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Добавляем эффект печатания для подзаголовка
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
    }, 50);
});
