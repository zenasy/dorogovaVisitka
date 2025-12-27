// DOM элементы
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const consultationForm = document.getElementById('consultation-form');
const scrollTopBtn = document.getElementById('scroll-top');
const successModal = document.getElementById('success-modal');
const closeModalBtn = document.querySelector('.close-modal');
const sliderPrevBtn = document.querySelector('.prev-btn');
const sliderNextBtn = document.querySelector('.next-btn');
const sliderDots = document.querySelectorAll('.dot');
const testimonialCards = document.querySelectorAll('.testimonial-card');

// Текущий слайд отзывов
let currentSlide = 0;

// Мобильное меню
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Закрытие меню при клике на ссылку
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Анимация при скролле
function animateOnScroll() {
    const sectionTitle = document.querySelector('.section-title');
    if (isElementInViewport(sectionTitle) && !sectionTitle.classList.contains('visible')) {
        sectionTitle.classList.add('visible');
    }
    
    // Анимация элементов с классом animate-on-scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        if (isElementInViewport(element)) {
            const animationType = element.getAttribute('data-animation') || 'fade-up';
            const delay = element.getAttribute('data-delay') || 0;
            
            setTimeout(() => {
                element.classList.add(animationType, 'visible');
            }, parseInt(delay));
        }
    });
    
    // Анимация features
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        if (isElementInViewport(feature)) {
            setTimeout(() => {
                feature.classList.add('visible');
            }, index * 100);
        }
    });
    
    // Кнопка "Наверх"
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
    
    // Подсветка активного раздела в навигации
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Проверка, виден ли элемент в области просмотра
function isElementInViewport(el) {
    if (!el) return false;
    
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Форма обратной связи
consultationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Сбор данных формы
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    
    // В реальном проекте здесь должен быть код для отправки данных на сервер
    // Для демонстрации показываем модальное окно
    
    // Показ модального окна
    successModal.classList.add('active');
    
    // Очистка формы
    this.reset();
    
    // Анимация отправки
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.querySelector('span').textContent;
    const originalIcon = submitBtn.querySelector('i').className;
    
    submitBtn.querySelector('span').textContent = 'Отправка...';
    submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';
    
    setTimeout(() => {
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.querySelector('i').className = originalIcon;
    }, 1500);
});

// Закрытие модального окна
closeModalBtn.addEventListener('click', () => {
    successModal.classList.remove('active');
});

// Клик по overlay для закрытия модального окна
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.remove('active');
    }
});

// Кнопка "Наверх"
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Слайдер отзывов
function showSlide(index) {
    // Скрыть все слайды
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Убрать активный класс со всех точек
    sliderDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Показать нужный слайд
    testimonialCards[index].classList.add('active');
    sliderDots[index].classList.add('active');
    
    currentSlide = index;
}

// Следующий слайд
function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= testimonialCards.length) {
        nextIndex = 0;
    }
    showSlide(nextIndex);
}

// Предыдущий слайд
function prevSlide() {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
        prevIndex = testimonialCards.length - 1;
    }
    showSlide(prevIndex);
}

// Обработчики для слайдера
sliderPrevBtn.addEventListener('click', prevSlide);
sliderNextBtn.addEventListener('click', nextSlide);

// Обработчики для точек
sliderDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Автопрокрутка слайдера
let slideInterval = setInterval(nextSlide, 5000);

// Остановка автопрокрутки при наведении на слайдер
const testimonialsSlider = document.querySelector('.testimonials-slider');
testimonialsSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

testimonialsSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Показать первый слайд
    showSlide(0);
    
    // Инициализация анимаций
    animateOnScroll();
    
    // Добавление анимации к элементам услуг при наведении
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Анимация для кнопок при наведении
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
});

// Обработчик скролла
window.addEventListener('scroll', animateOnScroll);

// Запуск анимаций при загрузке
window.addEventListener('load', () => {
    // Анимация заголовка страницы
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroBtns = document.querySelector('.hero-btns');
    
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 300);
    
    setTimeout(() => {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
    }, 600);
    
    setTimeout(() => {
        heroBtns.style.opacity = '1';
        heroBtns.style.transform = 'translateY(0)';
    }, 900);
    
    // Запуск анимаций при скролле
    animateOnScroll();
});

// Анимация для формы
const formInputs = document.querySelectorAll('.form-input');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        const focusLine = input.parentElement.querySelector('.focus-line');
        focusLine.style.width = '100%';
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            const focusLine = input.parentElement.querySelector('.focus-line');
            focusLine.style.width = '0';
        }
    });
});

// Добавление эффекта параллакса для герой-секции
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        hero.style.backgroundPosition = `center ${rate}px`;
        
        // Легкое движение контента
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});