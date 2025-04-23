// Обработчик для меню
document.getElementById('menu-toggle').addEventListener('change', function() {
    document.documentElement.classList.toggle('menu-open', this.checked);
    document.body.classList.toggle('menu-open', this.checked);
});

// Показать стрелку при прокрутке вниз и скрыть при возврате вверх
window.addEventListener('scroll', function() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    if (window.pageYOffset > 100) {
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
    } else {
        btn.style.opacity = '0';
        btn.style.visibility = 'hidden';
    }
});

// Плавная прокрутка вверх по клику на стрелку
document.addEventListener('DOMContentLoaded', function() {
    // Кнопка прокрутки вверх
    const scrollTopButton = document.getElementById('scroll-top');

    window.addEventListener('scroll', function() {
        if (scrollTopButton) {
            if (window.pageYOffset > 100) {
                scrollTopButton.style.opacity = '1';
                scrollTopButton.style.visibility = 'visible';
            } else {
                scrollTopButton.style.opacity = '0';
                scrollTopButton.style.visibility = 'hidden';
            }
        }
    });

    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Обработчик кликов для блоков направлений
    const directionContents = document.querySelectorAll('.direction-content');
    directionContents.forEach(content => {
        content.addEventListener('click', function() {
            if (window.innerWidth <= 1024) {
                this.classList.toggle('text-visible');
            }
        });
    });

    // Обработка кликов по карточкам направлений
    const directionCards = document.querySelectorAll('.direction-content');

    directionCards.forEach(card => {
        card.addEventListener('click', function() {
            if (window.innerWidth <= 1024) {
                this.classList.toggle('text-visible');
            }
        });
    });

    // Всплывающее сообщение при отправке формы
    const form = document.querySelector('form');
    const toast = document.getElementById('toast-message');
    if (form && toast) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            toast.textContent = 'Спасибо! Ваша заявка успешно отправлена!';
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
            form.reset();
        });
    }
});

// Обработка кликов по карточкам направлений
function handleDirectionCards() {
    const directionContents = document.querySelectorAll('.direction-content');
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

    directionContents.forEach(content => {
        // Удаляем все старые обработчики
        content.removeEventListener('click', toggleTextVisibility);
        
        // Добавляем обработчик только для мобильных и планшетов
        if (isMobile || isTablet) {
            content.addEventListener('click', toggleTextVisibility);
        }
    });
}

function toggleTextVisibility(event) {
    const content = event.currentTarget;
    content.classList.toggle('text-visible');
}

// Вызываем функцию при загрузке и при изменении размера окна
document.addEventListener('DOMContentLoaded', handleDirectionCards);
window.addEventListener('resize', handleDirectionCards); 