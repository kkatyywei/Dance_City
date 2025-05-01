// Обработчик для меню
document.getElementById('menu-toggle').addEventListener('change', function() {
    document.documentElement.classList.toggle('menu-open', this.checked);
    document.body.classList.toggle('menu-open', this.checked);
});

// Обработка отправки формы
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.signup-form');
    const modal = document.getElementById('thankYouModal');
    const modalClose = document.querySelector('.modal-close');

    if (form && modal) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
            form.reset();
        });

        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
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

    // Кнопка прокрутки наверх
    const btn = document.getElementById('scroll-top');
    if (btn) {
        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// Показать/скрыть кнопку прокрутки при скролле
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

// Скрытие/показ шапки при скролле
let lastScrollTop = 0;
const header = document.querySelector('header');
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(scrollTop - lastScrollTop) <= scrollThreshold) return;

    if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
});

// Слайдер
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-button.prev');
    const nextBtn = document.querySelector('.slider-button.next');
    const dotsContainer = document.querySelector('.slider-dots');

    let currentIndex = 0;

    // Создаем точки навигации
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        slider.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateDots();
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        goToSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(currentIndex);
    }

    // Обработчики кликов по кнопкам
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
        });
    }

    // Навигация с клавиатуры
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Свайпы на мобильных
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
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