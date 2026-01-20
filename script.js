document.addEventListener('DOMContentLoaded', () => {

    // ==================================================
    // 1. МОБІЛЬНЕ МЕНЮ (Floating Card Logic)
    // ==================================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (mobileMenuBtn && navMenu) {

        // Функція перемикання
        const toggleMenu = () => {
            const isActive = navMenu.classList.contains('active');
            if (isActive) {
                // Закриваємо
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('no-scroll');
            } else {
                // Відкриваємо
                mobileMenuBtn.classList.add('active');
                navMenu.classList.add('active');
                body.classList.add('no-scroll');
            }
        };

        // Клік по бургеру
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Закриття при кліку ПОЗА меню (на затемнений фон або просто повз)
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active')) {
                // Якщо клікнули не по меню і не по кнопці
                if (!navMenu.contains(e.target) && e.target !== mobileMenuBtn) {
                    toggleMenu(); // Закриваємо
                }
            }
        });

        // Закриття при кліку на будь-яке посилання всередині
        const menuLinks = document.querySelectorAll('.nav-links a, .mobile-nav-logo, .mobile-btn');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(); // Закриваємо
            });
        });
    }

    // ==================================================
    // 2. FAQ (АКОРДЕОН)
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
    // 3. ШАПКА ТА СТРІЛКА (СКРОЛ)
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
    // 4. АНІМАЦІЯ ПОЯВИ (РОЗУМНА)
    // ==================================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // ГРУПА 1: Анімуємо ВСЮДИ (і на телефоні, і на ПК)
    // (Сюди пишемо все, крім карток болей і переваг)
    const alwaysAnimate = document.querySelectorAll('.pricing-card, .gallery-item, .service-row, .consult-promo, .flip-card');
    alwaysAnimate.forEach(el => observer.observe(el));

    // ГРУПА 2: Анімуємо ТІЛЬКИ НА ПК (Ширина екрану більше 900px)
    if (window.innerWidth > 900) {
        // Сюди додаємо наші проблемні картки. 
        // На телефоні цей код просто проігнорується.
        const desktopOnly = document.querySelectorAll('.pain-card, .feature-card');
        desktopOnly.forEach(el => observer.observe(el));
    }

    // ==================================================
    // 5. ВАЛІДАЦІЯ ФОРМИ (З ВІБРАЦІЄЮ)
    // ==================================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            let hasError = false;

            // Знаходимо всі обов'язкові поля
            const requiredInputs = contactForm.querySelectorAll('input[required]');

            requiredInputs.forEach(input => {
                const errorText = input.nextElementSibling; // Текст знизу

                if (!input.value.trim()) {
                    // --- ПОМИЛКА ---
                    hasError = true;

                    // 1. Червона рамка (залишається)
                    input.classList.add('input-error');

                    // 2. Анімація тряски (додаємо і видаляємо через 0.5с)
                    input.classList.add('shake-active');
                    setTimeout(() => {
                        input.classList.remove('shake-active');
                    }, 500);

                    // 3. Показати текст
                    if (errorText && errorText.classList.contains('error-text-hint')) {
                        errorText.style.display = 'block';
                    }

                } else {
                    // --- ВСЕ ДОБРЕ ---
                    input.classList.remove('input-error');
                    if (errorText && errorText.classList.contains('error-text-hint')) {
                        errorText.style.display = 'none';
                    }
                }

                // Прибираємо червоне, коли почали писати
                input.addEventListener('input', function () {
                    this.classList.remove('input-error');
                    const currentErrorText = this.nextElementSibling;
                    if (currentErrorText) currentErrorText.style.display = 'none';
                });
            });

            // Блокуємо відправку, якщо є помилки
            if (hasError) {
                e.preventDefault();
            }
        });
    }

    // ==================================================
    // 6. ГАЛЕРЕЯ (ВИПРАВЛЕНО КОНФЛІКТ ІМЕН)
    // ==================================================
    const certItems = document.querySelectorAll('.cert-item');
    const imageViewer = document.getElementById('image-viewer');
    const fullImage = document.getElementById('full-image');
    const closeViewer = document.querySelector('.close-viewer');

    // Функція відкриття ГАЛЕРЕЇ (перейменували)
    const openGallery = (imgLink) => {
        if (!imgLink) return;

        fullImage.src = imgLink;
        imageViewer.classList.add('active');

        // Блокуємо скрол
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    };

    // Функція закриття ГАЛЕРЕЇ (перейменували)
    const closeGallery = () => {
        imageViewer.classList.remove('active');

        // Відновлюємо скрол
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';

        setTimeout(() => {
            if (fullImage) fullImage.src = '';
        }, 400);
    };

    if (imageViewer && fullImage) {
        // Кліки по списку
        certItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgLink = item.getAttribute('data-img');
                openGallery(imgLink); // Викликаємо нову функцію
            });
        });

        // Хрестик
        if (closeViewer) {
            closeViewer.addEventListener('click', closeGallery);
        }

        // Клік по фону
        imageViewer.addEventListener('click', (e) => {
            if (e.target === imageViewer) {
                closeGallery();
            }
        });
    }

    // ==================================================
    // 7. МОДАЛЬНЕ ВІКНО ФОРМИ (ВИПРАВЛЕНО КОНФЛІКТ ІМЕН)
    // ==================================================
    const modalOverlay = document.querySelector('.form-modal-overlay');
    const closeFormBtn = document.querySelector('.close-form-btn');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');

    // Функція відкриття ФОРМИ (перейменували)
    const openForm = (e) => {
        if (e) e.preventDefault();
        if (modalOverlay) {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    // Функція закриття ФОРМИ (перейменували)
    const closeForm = () => {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // Вішаємо подію на кнопки
    if (openModalBtns.length > 0) {
        openModalBtns.forEach(btn => {
            btn.removeEventListener('click', openForm); // Чистка на всяк випадок
            btn.addEventListener('click', openForm);
        });
    }

    // Закриття хрестиком
    if (closeFormBtn) {
        closeFormBtn.addEventListener('click', closeForm);
    }

    // Закриття кліком по фону
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeForm();
            }
        });
    }

    // Закриття через Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeForm();
        }
    });

    // ==================================================
    // 8. ЛОГІКА ДЛЯ КРАСИВИХ СПИСКІВ (DROPDOWN)
    // ==================================================
    const selectWrappers = document.querySelectorAll('.custom-select-wrapper');

    selectWrappers.forEach(wrapper => {
        const trigger = wrapper.querySelector('.custom-select-trigger');
        const options = wrapper.querySelectorAll('.custom-option');
        const hiddenSelect = wrapper.querySelector('select'); // Знаходимо справжній селект
        const triggerText = wrapper.querySelector('span'); // Текст на кнопці

        // 1. Відкрити/Закрити при кліку
        trigger.addEventListener('click', (e) => {
            // Закриваємо всі інші відкриті списки, якщо є
            selectWrappers.forEach(otherWrapper => {
                if (otherWrapper !== wrapper) otherWrapper.classList.remove('open');
            });
            wrapper.classList.toggle('open');
            e.stopPropagation(); // Щоб клік не пішов далі
        });

        // 2. Вибір опції
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();

                // Прибираємо клас selected у всіх і додаємо натиснутому
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                // Оновлюємо текст на кнопці (з іконкою, якщо є)
                triggerText.innerHTML = option.innerHTML;

                // Оновлюємо значення СПРАВЖНЬОГО прихованого селекту
                const value = option.getAttribute('data-value');
                hiddenSelect.value = value;

                // Закриваємо список
                wrapper.classList.remove('open');
            });
        });
    });

    // 3. Закриття при кліку поза межами
    document.addEventListener('click', (e) => {
        selectWrappers.forEach(wrapper => {
            if (!wrapper.contains(e.target)) {
                wrapper.classList.remove('open');
            }
        });
    });



});