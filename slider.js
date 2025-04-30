document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let isTransitioning = false;

    // Добавляем копию первого слайда в конец
    const firstSlide = slides[0].cloneNode(true);
    slider.appendChild(firstSlide);

    // Функция для обновления позиции слайдера
    function updateSlider(transition = true) {
        if (transition) {
            slider.style.transition = 'transform 0.5s ease-in-out';
        } else {
            slider.style.transition = 'none';
        }
        slider.style.transform = `translateX(-${currentSlide * 16.666}%)`;
        
        // Обновляем активную точку
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide % slideCount);
        });
    }

    // Функция для перехода к следующему слайду
    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentSlide++;
        updateSlider();

        // Если достигли копии первого слайда
        if (currentSlide === slideCount) {
            setTimeout(() => {
                currentSlide = 0;
                updateSlider(false);
                isTransitioning = false;
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    // Функция для перехода к предыдущему слайду
    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        if (currentSlide === 0) {
            currentSlide = slideCount;
            updateSlider(false);
            setTimeout(() => {
                currentSlide = slideCount - 1;
                updateSlider();
                isTransitioning = false;
            }, 50);
        } else {
            currentSlide--;
            updateSlider();
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    // Обработчики для кнопок
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Обработчики для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isTransitioning) return;
            currentSlide = index;
            updateSlider();
        });
    });

    // Автоматическое переключение слайдов
    let slideInterval = setInterval(nextSlide, 5000);

    // Останавливаем автоматическое переключение при наведении мыши
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    // Возобновляем автоматическое переключение при уходе мыши
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}); 