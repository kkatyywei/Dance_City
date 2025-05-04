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
});

// Вызываем функцию при загрузке и при изменении размера окна
document.addEventListener('DOMContentLoaded', handleDirectionCards);
window.addEventListener('resize', handleDirectionCards); 