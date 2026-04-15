// Массив с ДЗ (тема, ссылка на задание, ссылка на методичку)
const homeworkData = [
    {
        id: 1,
        title: "ДЗ 1: Интерфейс Blender и навигация",
        taskLink: "https://www.blender.org/",
        materialLink: "#"
    },
    {
        id: 2,
        title: "ДЗ 2: Моделирование меча (Low Poly)",
        taskLink: "#",
        materialLink: "#"
    },
    {
        id: 3,
        title: "ДЗ 3: Основы модификаторов (Subdivision, Mirror)",
        taskLink: "#",
        materialLink: "#"
    },
    {
        id: 4,
        title: "ДЗ 4: UV-развертка и текстурирование",
        taskLink: "#",
        materialLink: "#"
    },
    {
        id: 5,
        title: "ДЗ 5: Создание материалов в Shader Editor",
        taskLink: "#",
        materialLink: "#"
    },
    {
        id: 6,
        title: "ДЗ 6: Камеры и освещение сцены",
        taskLink: "#",
        materialLink: "#"
    },
    {
        id: 7,
        title: "ДЗ 7: Рендер в Cycles / Eevee",
        taskLink: "#",
        materialLink: "#"
    },
    {
        id: 8,
        title: "ДЗ 8: Анимация объектов (keyframes)",
        taskLink: "#",
        materialLink: "#"
    },
    {
        id: 9,
        title: "ДЗ 9: Скульптинг базовых форм",
        taskLink: "#",
        materialLink: "#"
    },
    {
        id: 10,
        title: "ДЗ 10: Итоговый проект: игровой пропс",
        taskLink: "#",
        materialLink: "#"
    },
    {
        id: 11,
        title: "ДЗ 11: Ретопология и оптимизация",
        taskLink: "#",
        materialLink: "#"
    },
    {
        id: 12,
        title: "ДЗ 12: Rigging (скелетная анимация)",
        taskLink: "#",
        materialLink: "#"
    }
];

// Функция генерации всех выпадающих блоков
function renderHomeworkList() {
    const container = document.getElementById('homeworkList');
    if (!container) return;

    container.innerHTML = '';

    homeworkData.forEach(hw => {
        // Создаём элемент аккордеона
        const item = document.createElement('div');
        item.className = 'homework-item';

        // Заголовок (кнопка выпадающего меню)
        const header = document.createElement('button');
        header.className = 'homework-header';
        header.innerHTML = `
            <h3>
                <i class="fas fa-cube" style="color:#4c9aff"></i>
                ${escapeHtml(hw.title)}
            </h3>
            <i class="fas fa-chevron-down header-icon"></i>
        `;

        // Контент с двумя ссылками
        const content = document.createElement('div');
        content.className = 'homework-content';
        content.innerHTML = `
            <div class="button-group">
                <a href="${escapeHtml(hw.taskLink)}" class="homework-btn" target="_blank">
                    <i class="fas fa-pen-ruler"></i> Перейти к заданию
                </a>
                <a href="${escapeHtml(hw.materialLink)}" class="homework-btn" target="_blank">
                    <i class="fas fa-book-open"></i> Методические материалы
                </a>
            </div>
        `;

        // Обработчик клика по заголовку (открыть/закрыть)
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            item.classList.toggle('open');
        });

        item.appendChild(header);
        item.appendChild(content);
        container.appendChild(item);
    });

    // Небольшое предупреждение для заглушек (если ссылка #)
    const allBtns = document.querySelectorAll('.homework-btn');
    allBtns.forEach(btn => {
        if (btn.getAttribute('href') === '#') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                alert('📌 Ссылка будет добавлена преподавателем позже. Следите за обновлениями!');
            });
        }
    });
}

// Простейший escapt для безопасности (если в заголовках есть спецсимволы)
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Мобильное меню (открытие/закрытие)
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
        // меняем иконку
        const icon = btn.querySelector('i');
        if (nav.classList.contains('mobile-open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Закрывать меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('mobile-open');
            const icon = btn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Плавный скролл для якорных ссылок
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElem = document.querySelector(targetId);
            if (targetElem) {
                e.preventDefault();
                targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    renderHomeworkList();    // генерируем выпадающие ДЗ
    initMobileMenu();        // адаптивное меню
    initSmoothScroll();      // плавная прокрутка
});