document.addEventListener('DOMContentLoaded', () => {

    // ==================================================
    // 1. МОБІЛЬНЕ МЕНЮ (БУРГЕР)
    // ==================================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Блокуємо прокрутку фону, коли меню відкрите
            if (navMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Закриваємо меню при кліку на посилання
        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }

    // ==================================================
    // 2. МОДАЛЬНЕ ВІКНО (ЗАМОВЛЕННЯ)
    // ==================================================
    const modal = document.getElementById('modal-order');
    const closeBtn = document.querySelector('.close-btn');
    const orderBtns = document.querySelectorAll('.js-order-btn');
    const planNameSpan = document.getElementById('modal-plan-name');
    const formPlanInput = document.getElementById('form-plan-name');

    if (modal && closeBtn) {
        orderBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const planName = btn.getAttribute('data-plan'); 
                if (planNameSpan) planNameSpan.innerText = planName;
                if (formPlanInput) formPlanInput.value = planName;
                modal.style.display = 'flex';
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    // ==================================================
    // 3. FAQ (АКОРДЕОН)
    // ==================================================
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            question.classList.toggle('active');
            const answer = question.nextElementSibling;
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // ==================================================
    // 4. ШАПКА ТА СТРІЛКА (СКРОЛ)
    // ==================================================
    const header = document.querySelector('.header');
    const scrollArrow = document.querySelector('.scroll-down-btn');

    if (header) {
        const checkScroll = () => {
            let scrollPos = window.scrollY;

            // Шапка
            if (scrollPos > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');

            // Стрілка (якщо є)
            if (scrollArrow) {
                if (scrollPos > 100) scrollArrow.classList.add('hidden');
                else scrollArrow.classList.remove('hidden');
            }
        };
        window.addEventListener('scroll', checkScroll);
        checkScroll();
    }

    // ==================================================
    // 5. АНІМАЦІЯ ПОЯВИ
    // ==================================================
    const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               entry.target.classList.add('fade-in-up');
               observer.unobserve(entry.target); 
           }
       });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .pricing-card, .pain-card, .gallery-item, .service-row, .consult-promo, .flip-card').forEach(el => observer.observe(el));

    // ==================================================
    // 6. ВАЛІДАЦІЯ ФОРМИ
    // ==================================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let hasError = false;
            const inputs = contactForm.querySelectorAll('[required]');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    hasError = true;
                    input.classList.add('error');
                    const parent = input.closest('.form-group');
                    if (parent) parent.classList.add('active-error');
                } else {
                    input.classList.remove('error');
                    const parent = input.closest('.form-group');
                    if (parent) parent.classList.remove('active-error');
                }
                
                input.addEventListener('input', function() {
                    this.classList.remove('error');
                    const parent = this.closest('.form-group');
                    if (parent) parent.classList.remove('active-error');
                });
            });

            if (hasError) {
                e.preventDefault();
            }
        });
    }
});