document.addEventListener('DOMContentLoaded', () => {

    // ==================================================
    // 1. МОДАЛЬНЕ ВІКНО (Працює тільки там, де воно є)
    // ==================================================
    const modal = document.getElementById('modal-order');
    const closeBtn = document.querySelector('.close-btn');
    const orderBtns = document.querySelectorAll('.js-order-btn');
    const planNameSpan = document.getElementById('modal-plan-name');

    // Перевіряємо, чи існує модальне вікно на цій сторінці
    if (modal && closeBtn) {
        
        // Відкриття при кліку на кнопки
        orderBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const planName = btn.getAttribute('data-plan'); // Отримуємо назву тарифу
                if (planNameSpan) {
                    planNameSpan.innerText = planName;
                }
                modal.style.display = 'flex'; // Показуємо вікно
            });
        });

        // Закриття на хрестик
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Закриття при кліку за межами вікна
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // ==================================================
    // 2. FAQ - АКОРДЕОН (Працює тільки там, де є питання)
    // ==================================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                // Перемикаємо клас active
                question.classList.toggle('active');

                // Знаходимо відповідь
                const answer = question.nextElementSibling;

                // Анімація відкриття/закриття
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                } else {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        });
    }

    // ==================================================
    // 3. ЛОГІКА ШАПКИ ТА СТРІЛКИ
    // ==================================================
    const header = document.querySelector('.header');
    const scrollArrow = document.querySelector('.scroll-down-btn'); // Шукаємо стрілку

    if (header) {
        const checkScroll = () => {
            let scrollPos = window.scrollY;

            // 1. Шапка
            if (scrollPos > 50) { 
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // 2. Стрілка (Якщо вона є на сторінці)
            if (scrollArrow) {
                if (scrollPos > 100) { // Якщо прокрутили більше 100px
                    scrollArrow.classList.add('hidden'); // Додаємо клас зникнення
                } else {
                    scrollArrow.classList.remove('hidden'); // Показуємо назад
                }
            }
        };

        window.addEventListener('scroll', checkScroll);
        checkScroll();
    }

    // ==================================================
    // 4. АНІМАЦІЯ ПОЯВИ ЕЛЕМЕНТІВ (Intersection Observer)
    // ==================================================
    const observerOptions = {
        threshold: 0.1 // Спрацьовує, коли видно 10% елемента
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Додаємо клас, який робить елемент видимим
                entry.target.classList.add('fade-in-up');
                // Припиняємо стежити після появи (щоб не блимало)
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Знаходимо всі елементи, які треба анімувати
    // (Картки переваг, тарифи, болі, галерея)
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .pain-card, .gallery-item');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // =============================
    // ВАЛІДАЦІЯ ФОРМИ (КРАСИВА)
    // =============================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Зупиняємо відправку, поки не перевіримо
            
            let hasError = false;
            
            // Знаходимо всі поля, які мають атрибут required
            const inputs = contactForm.querySelectorAll('[required]');

            inputs.forEach(input => {
                // Якщо поле порожнє
                if (!input.value.trim()) {
                    hasError = true;
                    // Додаємо клас помилки самому полю
                    input.classList.add('error');
                    // Знаходимо батьківський блок і кажемо йому показати текст
                    const parent = input.closest('.form-group');
                    if (parent) {
                        parent.classList.add('active-error');
                    }
                } else {
                    // Якщо все ок - прибираємо червоне
                    input.classList.remove('error');
                    const parent = input.closest('.form-group');
                    if (parent) {
                        parent.classList.remove('active-error');
                    }
                }
                
                // Якщо користувач почав щось писати, одразу прибираємо червоне
                input.addEventListener('input', function() {
                    this.classList.remove('error');
                    const parent = this.closest('.form-group');
                    if (parent) {
                        parent.classList.remove('active-error');
                    }
                });
            });

            // Якщо помилок немає - імітуємо успіх (або відправляємо)
            if (!hasError) {
                // Тут пізніше буде код відправки на пошту
                alert('Заявка прийнята! Дякую (Це демо)');
                contactForm.reset(); // Очистити форму
            }
        });
    }

});