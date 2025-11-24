// Навигация между страницами
        document.addEventListener('DOMContentLoaded', function() {
            const navItems = document.querySelectorAll('.nav-item');
            const pages = document.querySelectorAll('.page');
            
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    const targetPage = this.getAttribute('data-page');
                    
                    // Убираем активный класс у всех элементов навигации
                    navItems.forEach(navItem => {
                        navItem.classList.remove('active');
                    });
                    
                    // Добавляем активный класс текущему элементу
                    this.classList.add('active');
                    
                    // Скрываем все страницы
                    pages.forEach(page => {
                        page.classList.remove('active');
                    });
                    
                    // Показываем целевую страницу
                    document.getElementById(targetPage).classList.add('active');
                    
                    // Прокрутка вверх при смене страницы
                    window.scrollTo(0, 0);
                    
                    // Инициализация виртуального класса при переходе на эту страницу
                    if (targetPage === 'virtual-class') {
                        initVirtualClass();
                    }
                });
            });
            
            // Навигация в личном кабинете
            const sidebarItems = document.querySelectorAll('.sidebar-menu li');
            const cabinetSections = document.querySelectorAll('.cabinet-section');
            
            sidebarItems.forEach(item => {
                item.addEventListener('click', function() {
                    const targetSection = this.getAttribute('data-section');
                    
                    // Убираем активный класс у всех элементов меню
                    sidebarItems.forEach(sidebarItem => {
                        sidebarItem.classList.remove('active');
                    });
                    
                    // Добавляем активный класс текущему элементу
                    this.classList.add('active');
                    
                    // Скрываем все секции
                    cabinetSections.forEach(section => {
                        section.classList.remove('active');
                    });
                    
                    // Показываем целевую секцию
                    document.getElementById(targetSection).classList.add('active');
                });
            });
            
            // Выбор типа пользователя
            const userTypeBtns = document.querySelectorAll('.user-type-btn');
            
            userTypeBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    userTypeBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Обработка формы входа
            document.getElementById('loginForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const userType = document.querySelector('.user-type-btn.active').getAttribute('data-type');
                const userName = userType === 'student' ? 'Иван Иванов' : 'Анна Ивановна';
                
                document.getElementById('userDisplayName').textContent = userName;
                
                // Закрываем модальное окно
                closeLoginModal();
                
                // Показываем страницу личного кабинета
                document.querySelectorAll('.page').forEach(page => {
                    page.classList.remove('active');
                });
                document.getElementById('personal-cabinet').classList.add('active');
                
                // Обновляем навигацию
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Показываем соответствующий интерфейс в зависимости от типа пользователя
                if (userType === 'student') {
                    document.getElementById('my-lessons-student').classList.add('active');
                    document.getElementById('my-lessons-tutor').classList.remove('active');
                } else {
                    document.getElementById('my-lessons-student').classList.remove('active');
                    document.getElementById('my-lessons-tutor').classList.add('active');
                }
            });
            
            // Открытие модального окна входа
            document.getElementById('openLogin').addEventListener('click', function() {
                document.getElementById('loginModal').style.display = 'block';
            });
        });

        // Данные репетиторов для модальных окон
        const tutorsData = {
            'anna': {
                name: 'Анна Ивановна',
                subject: 'Математика (ЕГЭ)',
                rating: '4.9',
                experience: '8 лет',
                reviews: '227 отзывов',
                price: 'от 1200 р/час',
                avatar: './images/анна ивановна.jpg',
                description: 'Опытный преподаватель математики с 8-летним стажем. Специализируется на подготовке к ЕГЭ и ОГЭ. Выпускница механико-математического факультета МГУ. Индивидуальный подход к каждому ученику, разработка персональной программы обучения.',
                details: {
                    'Образование': 'МГУ им. М.В. Ломоносова, механико-математический факультет',
                    'Специализация': 'Подготовка к ЕГЭ, ОГЭ, олимпиадам',
                    'Методика': 'Индивидуальный подход, разбор сложных тем, практические задания',
                    'Ученики': 'Более 200 выпускников с высокими баллами ЕГЭ'
                }
            },
            'olga': {
                name: 'Ольга Козлова',
                subject: 'Программирование',
                rating: '4.8',
                experience: '10 лет',
                reviews: '227 отзывов',
                price: 'от 2200 р/час',
                avatar: './images/ольга козлова.jpg',
                description: 'Full-stack разработчик с 10-летним опытом. Преподаватель программирования для начинающих и продвинутых студентов. Специализируется на Python, JavaScript, React. Помощь в создании проектов и портфолио для трудоустройства.',
                details: {
                    'Образование': 'МФТИ, факультет управления и прикладной математики',
                    'Специализация': 'Python, JavaScript, React, веб-разработка',
                    'Методика': 'Практико-ориентированный подход, реальные проекты',
                    'Ученики': 'Более 100 студентов успешно трудоустроились'
                }
            },
            'alexander': {
                name: 'Александр Новиков',
                subject: 'Русский язык',
                rating: '4.9',
                experience: '9 лет',
                reviews: '127 отзывов',
                price: 'от 1100 р/час',
                avatar: './images/александр новиков.jpg',
                description: 'Филолог, преподаватель высшей категории с 9-летним опытом. Специализируется на подготовке к ЕГЭ по русскому языку, написанию сочинений, повышении грамотности. Автор методических пособий для подготовки к экзаменам.',
                details: {
                    'Образование': 'МГУ им. М.В. Ломоносова, филологический факультет',
                    'Специализация': 'ЕГЭ по русскому языку, сочинения, грамотность',
                    'Методика': 'Системный подход, работа над ошибками, практика',
                    'Достижения': 'Автор 3 методических пособий'
                }
            },
         'natalia': {
        name: 'Наталья Волкова',
        subject: 'Химия (ЕГЭ)',
        rating: '4.8',
        experience: '10 лет',
        reviews: '129 отзывов',
        price: 'от 2200 р/час',
        avatar: './images/наталья волкова.jpg',
        description: 'Магистр химических наук с 10-летним опытом преподавания. Специализируется на подготовке к экзаменам и олимпиадам. Практический подход к обучению с использованием современных методик и наглядных материалов.',
        details: {
            'Образование': 'МГУ им. М.В. Ломоносова, химический факультет',
            'Специализация': 'Подготовка к ЕГЭ по химии, олимпиады',
            'Методика': 'Практический подход, эксперименты, наглядные материалы',
            'Достижения': 'Победитель всероссийской олимпиады по химии'
        }
    },
    'mikhail': {
        name: 'Михаил Лапов',
        subject: 'История/Обществознание',
        rating: '4.8',
        experience: '10 лет',
        reviews: '120 отзывов',
        price: 'от 1700 р/час',
        avatar: './images/михаил лапов.jpg',
        description: 'Кандидат исторических наук с 10-летним стажем преподавания. Специализируется на подготовке к ЕГЭ по истории и обществознанию. Углубленное изучение истории России и мира с использованием интерактивных материалов.',
        details: {
            'Образование': 'МГУ им. М.В. Ломоносова, исторический факультет',
            'Специализация': 'ЕГЭ по истории и обществознанию',
            'Методика': 'Интерактивное обучение, работа с источниками',
            'Достижения': 'Кандидат исторических наук'
        }
    },
    'maryam': {
        name: 'Марьям Павлова',
        subject: 'Биология',
        rating: '4.9',
        experience: '12 лет',
        reviews: '121 отзыв',
        price: 'от 1900 р/час',
        avatar: './images/марьям павлова.jpg',
        description: 'Биолог, преподаватель медицинского университета с 12-летним опытом. Специализируется на подготовке к ЕГЭ и поступлению в медицинские вузы. Использует современные методики обучения и индивидуальный подход к каждому студенту.',
        details: {
            'Образование': 'Первый МГМУ им. И.М. Сеченова',
            'Специализация': 'Подготовка к ЕГЭ по биологии, поступление в медвузы',
            'Методика': 'Современные методики, индивидуальный подход',
            'Достижения': 'Преподаватель медицинского университета'
        }
    },
    'viktor': {
        name: 'Виктор Семенов',
        subject: 'Обществознание (ЕГЭ)',
        rating: '4.9',
        experience: '9 лет',
        reviews: '157 отзывов',
        price: 'от 1900 р/час',
        avatar: './images/виктор семенов.jpg',
        description: 'Преподаватель обществознания с 9-летним опытом. Эксперт ЕГЭ. Использует системный подход к подготовке, особое внимание уделяет разбору сложных тем и написанию эссе. Помогает студентам развивать критическое мышление.',
        details: {
            'Образование': 'МГУ им. М.В. Ломоносова, философский факультет',
            'Специализация': 'ЕГЭ по обществознанию, написание эссе',
            'Методика': 'Системный подход, развитие критического мышления',
            'Достижения': 'Эксперт ЕГЭ'
        }
    },
    'svetlana': {
        name: 'Светлана Одинцова',
        subject: 'Информатика',
        rating: '4.9',
        experience: '12 лет',
        reviews: '197 отзывов',
        price: 'от 3200 р/час',
        avatar: './images/светлана одинцова.jpg',
        description: 'Программист, преподаватель информатики с 12-летним опытом. Специализируется на подготовке к ЕГЭ и олимпиадам по информатике. Использует практико-ориентированный подход с решением реальных задач и проектов.',
        details: {
            'Образование': 'МФТИ, факультет инноваций и высоких технологий',
            'Специализация': 'ЕГЭ по информатике, олимпиадное программирование',
            'Методика': 'Практико-ориентированный подход, решение реальных задач',
            'Достижения': 'Призер международных олимпиад по программированию'
        }
    }
        };

        // Функция открытия модального окна
        function openModal(tutorId) {
            const tutor = tutorsData[tutorId];
            if (!tutor) return;

            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <div class="modal-header">
                    <img src="${tutor.avatar}" alt="${tutor.name}" class="modal-avatar">
                    <div class="modal-info">
                        <div class="modal-name">${tutor.name}</div>
                        <div class="modal-subject">${tutor.subject}</div>
                        <div class="modal-rating">
                            <div class="rating-stars">
                                ${'<div class="rating-star"></div>'.repeat(5)}
                            </div>
                            <div class="rating-value">${tutor.rating}</div>
                        </div>
                        <div class="modal-stats">
                            <div class="modal-stat">
                                <div class="stat-value">${tutor.experience}</div>
                                <div class="stat-label">Опыт работы</div>
                            </div>
                            <div class="modal-stat">
                                <div class="stat-value">${tutor.reviews}</div>
                                <div class="stat-label">Отзывы</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-description">
                    ${tutor.description}
                </div>
                <div class="modal-details">
                    ${Object.entries(tutor.details).map(([key, value]) => `
                        <div class="detail-item">
                            <div class="detail-title">${key}</div>
                            <div class="detail-value">${value}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="modal-price">${tutor.price}</div>
                <div class="modal-actions">
                    <button class="modal-btn-signup">Записаться на пробный урок</button>
                </div>
            `;

            document.getElementById('tutorModal').style.display = 'block';
        }

        // Функция закрытия модального окна
        function closeModal() {
            document.getElementById('tutorModal').style.display = 'none';
        }
        
        // Функция закрытия модального окна входа
        function closeLoginModal() {
            document.getElementById('loginModal').style.display = 'none';
        }

        // Закрытие модального окна при клике вне его
        window.onclick = function(event) {
            const modal = document.getElementById('tutorModal');
            if (event.target == modal) {
                closeModal();
            }
            
            const loginModal = document.getElementById('loginModal');
            if (event.target == loginModal) {
                closeLoginModal();
            }
        }
        
        // Функция инициализации виртуального класса
        function initVirtualClass() {
            const canvas = document.getElementById('whiteboard');
            const ctx = canvas.getContext('2d');
            const cursor = document.querySelector('.drawing-cursor');
            
            // Установка размеров canvas
            function resizeCanvas() {
                const container = canvas.parentElement;
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
                
                // Перерисовка существующего содержимого
                redrawCanvas();
            }
            
            // Перерисовка содержимого canvas
            function redrawCanvas() {
                // В реальном приложении здесь будет перерисовка сохраненных данных
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Пример начального текста
                ctx.fillStyle = '#cccccc';
                ctx.font = '20px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Используйте инструменты для рисования', canvas.width / 2, canvas.height / 2);
            }
            
            // Переменные для рисования
            let isDrawing = false;
            let lastX = 0;
            let lastY = 0;
            let currentTool = 'pen';
            let currentColor = '#000000';
            let brushSize = 3;
            let drawingHistory = [];
            let currentStep = -1;
            
            // Настройка инструментов
            const toolButtons = document.querySelectorAll('.tool-btn[data-tool]');
            toolButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    toolButtons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    currentTool = this.getAttribute('data-tool');
                });
            });
            
            // Настройка выбора цвета
            const colorOptions = document.querySelectorAll('.color-option');
            colorOptions.forEach(option => {
                option.addEventListener('click', function() {
                    colorOptions.forEach(o => o.classList.remove('active'));
                    this.classList.add('active');
                    currentColor = this.getAttribute('data-color');
                    cursor.style.backgroundColor = currentColor;
                });
            });
            
            // Настройка размера кисти
            const brushSizeInput = document.getElementById('brushSize');
            brushSizeInput.addEventListener('input', function() {
                brushSize = parseInt(this.value);
                cursor.style.width = `${brushSize}px`;
                cursor.style.height = `${brushSize}px`;
            });
            
            // Очистка canvas
            document.getElementById('clearCanvas').addEventListener('click', function() {
                if (confirm('Вы уверены, что хотите очистить доску?')) {
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    saveToHistory();
                }
            });
            
            // Отмена действия
            document.getElementById('undoAction').addEventListener('click', function() {
                if (currentStep > 0) {
                    currentStep--;
                    const imageData = drawingHistory[currentStep];
                    ctx.putImageData(imageData, 0, 0);
                } else {
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
            });
            
            // Сохранение состояния canvas в историю
            function saveToHistory() {
                currentStep++;
                if (currentStep < drawingHistory.length) {
                    drawingHistory = drawingHistory.slice(0, currentStep);
                }
                drawingHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            }
            
            // Обработчики событий мыши для рисования
            canvas.addEventListener('mousedown', startDrawing);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', stopDrawing);
            canvas.addEventListener('mouseout', stopDrawing);
            
            // Обработчики событий касания для мобильных устройств
            canvas.addEventListener('touchstart', handleTouchStart);
            canvas.addEventListener('touchmove', handleTouchMove);
            canvas.addEventListener('touchend', handleTouchEnd);
            
            function startDrawing(e) {
                isDrawing = true;
                const pos = getMousePos(canvas, e);
                [lastX, lastY] = [pos.x, pos.y];
                
                // Показываем курсор
                cursor.style.display = 'block';
                cursor.style.left = `${pos.x}px`;
                cursor.style.top = `${pos.y}px`;
                
                // Для инструмента "кисть" начинаем рисовать сразу
                if (currentTool === 'pen') {
                    ctx.beginPath();
                    ctx.moveTo(lastX, lastY);
                }
                
                e.preventDefault();
            }
            
            function draw(e) {
                if (!isDrawing) return;
                
                const pos = getMousePos(canvas, e);
                const x = pos.x;
                const y = pos.y;
                
                // Обновляем позицию курсора
                cursor.style.left = `${x}px`;
                cursor.style.top = `${y}px`;
                
                ctx.lineWidth = brushSize;
                ctx.lineCap = 'round';
                ctx.strokeStyle = currentColor;
                ctx.fillStyle = currentColor;
                
                switch (currentTool) {
                    case 'pen':
                        ctx.lineTo(x, y);
                        ctx.stroke();
                        break;
                        
                    case 'eraser':
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-out';
                        ctx.lineTo(x, y);
                        ctx.stroke();
                        ctx.restore();
                        break;
                        
                    case 'line':
                        // Временное рисование линии (будет заменено при отпускании мыши)
                        redrawCanvas();
                        ctx.beginPath();
                        ctx.moveTo(lastX, lastY);
                        ctx.lineTo(x, y);
                        ctx.stroke();
                        break;
                        
                    case 'rectangle':
                        // Временное рисование прямоугольника
                        redrawCanvas();
                        ctx.strokeRect(lastX, lastY, x - lastX, y - lastY);
                        break;
                        
                    case 'circle':
                        // Временное рисование круга
                        redrawCanvas();
                        const radius = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));
                        ctx.beginPath();
                        ctx.arc(lastX, lastY, radius, 0, Math.PI * 2);
                        ctx.stroke();
                        break;
                        
                    case 'text':
                        // Для текста нужен отдельный обработчик
                        break;
                }
                
                e.preventDefault();
            }
            
            function stopDrawing(e) {
                if (!isDrawing) return;
                
                isDrawing = false;
                cursor.style.display = 'none';
                
                // Сохраняем финальное состояние для инструментов формы
                if (currentTool !== 'pen' && currentTool !== 'eraser') {
                    const pos = getMousePos(canvas, e);
                    const x = pos.x;
                    const y = pos.y;
                    
                    ctx.lineWidth = brushSize;
                    ctx.strokeStyle = currentColor;
                    
                    switch (currentTool) {
                        case 'line':
                            ctx.beginPath();
                            ctx.moveTo(lastX, lastY);
                            ctx.lineTo(x, y);
                            ctx.stroke();
                            break;
                            
                        case 'rectangle':
                            ctx.strokeRect(lastX, lastY, x - lastX, y - lastY);
                            break;
                            
                        case 'circle':
                            const radius = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));
                            ctx.beginPath();
                            ctx.arc(lastX, lastY, radius, 0, Math.PI * 2);
                            ctx.stroke();
                            break;
                    }
                    
                    saveToHistory();
                } else {
                    saveToHistory();
                }
                
                e.preventDefault();
            }
            
            // Функции для обработки касаний
            function handleTouchStart(e) {
                e.preventDefault();
                const touch = e.touches[0];
                const mouseEvent = new MouseEvent('mousedown', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                canvas.dispatchEvent(mouseEvent);
            }
            
            function handleTouchMove(e) {
                e.preventDefault();
                const touch = e.touches[0];
                const mouseEvent = new MouseEvent('mousemove', {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                canvas.dispatchEvent(mouseEvent);
            }
            
            function handleTouchEnd(e) {
                e.preventDefault();
                const mouseEvent = new MouseEvent('mouseup', {});
                canvas.dispatchEvent(mouseEvent);
            }
            
            // Получение позиции мыши относительно canvas
            function getMousePos(canvas, evt) {
                const rect = canvas.getBoundingClientRect();
                return {
                    x: evt.clientX - rect.left,
                    y: evt.clientY - rect.top
                };
            }
            
            // Инициализация чата
            const chatInput = document.querySelector('.chat-input input');
            const chatSend = document.querySelector('.chat-send');
            const chatMessages = document.querySelector('.chat-messages');
            
            // Отправка сообщения
            function sendMessage() {
                const messageText = chatInput.value.trim();
                if (messageText === '') return;
                
                // Добавление сообщения в чат
                const messageElement = document.createElement('div');
                messageElement.className = 'message sent';
                messageElement.innerHTML = `
                    <div class="message-sender">Вы</div>
                    <div>${messageText}</div>
                `;
                
                chatMessages.appendChild(messageElement);
                chatInput.value = '';
                
                // Прокрутка к последнему сообщению
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // В реальном приложении здесь будет отправка сообщения на сервер
                // Имитация ответа через 1-2 секунды
                setTimeout(() => {
                    const responses = [
                        "Хорошо, понял ваше сообщение.",
                        "Спасибо за информацию!",
                        "Давайте продолжим наше занятие.",
                        "Отличный вопрос! Сейчас разберем его."
                    ];
                    
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    
                    const responseElement = document.createElement('div');
                    responseElement.className = 'message received';
                    responseElement.innerHTML = `
                        <div class="message-sender">Анна Ивановна</div>
                        <div>${randomResponse}</div>
                    `;
                    
                    chatMessages.appendChild(responseElement);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000 + Math.random() * 1000);
            }
            
            // Обработчики событий
            chatSend.addEventListener('click', sendMessage);
            
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
            
            // Инициализация элементов управления
            const controlButtons = document.querySelectorAll('.control-btn');
            
            controlButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    // В реальном приложении здесь будет соответствующая функциональность
                    console.log('Нажата кнопка управления');
                    
                    // Пример переключения состояния кнопки микрофона/камеры
                    if (!this.classList.contains('primary') && !this.classList.contains('danger')) {
                        this.classList.toggle('active');
                    }
                });
            });
            
            // Кнопка завершения занятия
            document.querySelector('.control-btn.danger').addEventListener('click', function() {
                if (confirm('Вы уверены, что хотите завершить занятие?')) {
                    alert('Занятие завершено. Возвращаемся в личный кабинет.');
                    // В реальном приложении здесь будет переход в личный кабинет
                    document.querySelectorAll('.page').forEach(page => {
                        page.classList.remove('active');
                    });
                    document.getElementById('personal-cabinet').classList.add('active');
                }
            });
            
            // Инициализация
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();
        }

        // Добавьте этот код в конец файла script.js

// Функциональность для популярных направлений
document.addEventListener('DOMContentLoaded', function() {
    // Обработчики для предметов в популярных направлениях
    const subjectItems = document.querySelectorAll('.subject-item');
    
    subjectItems.forEach(item => {
        item.addEventListener('click', function() {
            // Переходим на страницу каталога
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            document.getElementById('catalog').classList.add('active');
            
            // Обновляем навигацию
            document.querySelectorAll('.nav-item').forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Находим и активируем элемент навигации "Каталог репетиторов"
            const catalogNavItems = document.querySelectorAll('.nav-item[data-page="catalog"]');
            catalogNavItems.forEach(navItem => {
                navItem.classList.add('active');
            });
            
            // Прокрутка вверх
            window.scrollTo(0, 0);
            
            // Можно также автоматически выбрать соответствующий предмет в фильтрах
            const subjectName = this.textContent.trim();
            const subjectSelect = document.querySelector('.filter-select');
            if (subjectSelect) {
                for (let i = 0; i < subjectSelect.options.length; i++) {
                    if (subjectSelect.options[i].text === subjectName) {
                        subjectSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        });
    });
    
    // Обработчики для кнопок "Записаться" в каталоге
    const signupButtons = document.querySelectorAll('.btn-signup');
    
    signupButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Открываем модальное окно входа
            document.getElementById('loginModal').style.display = 'block';
            
            // Можно добавить дополнительную логику, например:
            // - Сохранять информацию о выбранном репетиторе
            // - Предзаполнять форму
        });
    });
    
    // Обработчики для кнопок "Записаться" в модальных окнах репетиторов
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-btn-signup')) {
            // Открываем модальное окно входа
            document.getElementById('loginModal').style.display = 'block';
            
            // Закрываем модальное окно с информацией о репетиторе
            closeModal();
        }
    });
    
    // Обработчики для всех кнопок "Подробнее" в каталоге
    const detailButtons = document.querySelectorAll('.btn-details');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Получаем ID репетитора из атрибута onclick
            const onclickAttr = this.getAttribute('onclick');
            if (onclickAttr && onclickAttr.includes('openModal')) {
                // Извлекаем ID репетитора из строки onclick
                const tutorIdMatch = onclickAttr.match(/openModal\('([^']+)'\)/);
                if (tutorIdMatch && tutorIdMatch[1]) {
                    const tutorId = tutorIdMatch[1];
                    openModal(tutorId);
                }
            }
        });
    });
});

// Функциональность для рассылки с уведомлением
document.addEventListener('DOMContentLoaded', function() {
    // Обработчик для кнопки подписки на рассылку
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = newsletterInput.value.trim();
            
            // Простая валидация email
            if (email === '') {
                showNotification('Пожалуйста, введите ваш email', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            // Имитация успешной подписки
            showNotification('Вы успешно подписались на рассылку!', 'success');
            
            // Очищаем поле ввода
            newsletterInput.value = '';
            
            // В реальном приложении здесь был бы AJAX запрос к серверу
            console.log('Email для подписки:', email);
        });
        
        // Также обрабатываем нажатие Enter в поле ввода
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                newsletterBtn.click();
            }
        });
    }
});

// Функция для проверки email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Функция для показа уведомлений
function showNotification(message, type = 'success') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-family: 'Alice', serif;
        font-size: 16px;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s ease-in-out;
    `;
    
    // Цвета в зависимости от типа уведомления
    if (type === 'success') {
        notification.style.backgroundColor = '#4cd964';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ff3b30';
    } else {
        notification.style.backgroundColor = '#007aff';
    }
    
    // Добавляем уведомление на страницу
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Автоматическое скрытие через 4 секунды
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        
        // Удаляем элемент после анимации
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
    
    // Возможность закрыть уведомление кликом
    notification.addEventListener('click', function() {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Функциональность поиска в каталоге
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const tutorCards = document.querySelectorAll('.tutor-card');
    const tutorsCount = document.querySelector('.tutors-count');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            let visibleCount = 0;
            
            tutorCards.forEach(card => {
                const tutorName = card.querySelector('.tutor-name').textContent.toLowerCase();
                const tutorSubject = card.querySelector('.tutor-subject').textContent.toLowerCase();
                const tutorDescription = card.querySelector('.tutor-description').textContent.toLowerCase();
                
                const matches = tutorName.includes(searchTerm) || 
                              tutorSubject.includes(searchTerm) || 
                              tutorDescription.includes(searchTerm);
                
                if (matches || searchTerm === '') {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Обновляем счетчик
            if (tutorsCount) {
                tutorsCount.textContent = `Найдено репетиторов: ${visibleCount}`;
            }
        });
    }
    
    // Функциональность фильтров
    const filterSelects = document.querySelectorAll('.filter-select');
    const resetFiltersBtn = document.querySelector('.reset-filters');
    
    function applyFilters() {
        const subjectFilter = document.querySelector('.filter-select').value;
        const priceFilter = document.querySelectorAll('.filter-select')[1].value;
        
        let visibleCount = 0;
        
        tutorCards.forEach(card => {
            const tutorSubject = card.querySelector('.tutor-subject').textContent;
            const tutorPrice = parseInt(card.querySelector('.tutor-price').textContent.match(/\d+/)[0]);
            
            let subjectMatch = subjectFilter === 'Все предметы' || tutorSubject.includes(subjectFilter);
            let priceMatch = true;
            
            if (priceFilter !== 'Любая') {
                if (priceFilter === 'до 1000 руб') {
                    priceMatch = tutorPrice <= 1000;
                } else if (priceFilter === '1000-1500 руб') {
                    priceMatch = tutorPrice >= 1000 && tutorPrice <= 1500;
                } else if (priceFilter === '1500-2000 руб') {
                    priceMatch = tutorPrice >= 1500 && tutorPrice <= 2000;
                } else if (priceFilter === 'свыше 2000 руб') {
                    priceMatch = tutorPrice > 2000;
                }
            }
            
            if (subjectMatch && priceMatch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (tutorsCount) {
            tutorsCount.textContent = `Найдено репетиторов: ${visibleCount}`;
        }
    }
    
    filterSelects.forEach(select => {
        select.addEventListener('change', applyFilters);
    });
    
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            filterSelects.forEach(select => {
                select.selectedIndex = 0;
            });
            if (searchInput) {
                searchInput.value = '';
            }
            applyFilters();
            if (tutorsCount) {
                tutorsCount.textContent = 'Популярные репетиторы: 16';
            }
        });
    }
});

// Обработка формы настроек
document.addEventListener('DOMContentLoaded', function() {
    const settingsForm = document.querySelector('.settings-form');
    
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем значения из формы
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const about = document.getElementById('about').value;
            const email = document.getElementById('email').value;
            const favoriteSubject = document.getElementById('favoriteSubject').value;
            
            // Здесь можно отправить данные на сервер
            console.log('Сохранение данных:', {
                firstName,
                lastName,
                about,
                email,
                favoriteSubject
            });
            
            // Обновляем имя пользователя в шапке
            const userDisplayName = document.getElementById('userDisplayName');
            if (userDisplayName) {
                userDisplayName.textContent = `${firstName} ${lastName}`;
            }
            
            // Показываем уведомление об успешном сохранении
            alert('Данные успешно сохранены!');
        });
    }
    
    // Обработка загрузки аватара (упрощенная версия)
    const avatarUploadBtn = document.querySelector('.avatar-upload-btn');
    if (avatarUploadBtn) {
        avatarUploadBtn.addEventListener('click', function() {
            // В реальном приложении здесь будет логика загрузки файла
            alert('В реальном приложении здесь будет окно выбора файла для загрузки аватара');
        });
    }
});

// Переменная для хранения типа пользователя
let currentUserType = 'student'; // по умолчанию ученик

// Функция для переключения типа пользователя
function switchUserType(userType) {
    currentUserType = userType;
    
    // Обновляем аватар в зависимости от типа пользователя
    const userAvatar = document.getElementById('userAvatar');
    const settingsAvatar = document.getElementById('settingsAvatar');
    const userTypeDisplay = document.getElementById('userTypeDisplay');
    const userDisplayName = document.getElementById('userDisplayName');
    
    if (userType === 'student') {
        userAvatar.src = './images/УЧЕНИК 2.jpg';
        settingsAvatar.src = './images/УЧЕНИК 2.jpg';
        userTypeDisplay.textContent = 'Ученик';
        userDisplayName.textContent = 'Иван Иванов';
        
        // Показываем раздел для ученика, скрываем для репетитора
        document.getElementById('my-lessons-student').classList.add('active');
        document.getElementById('my-lessons-tutor').classList.remove('active');
        document.getElementById('payments').innerHTML = getStudentPaymentsHTML();
        
    } else if (userType === 'tutor') {
        userAvatar.src = './images/анна ивановна.jpg'; // или другая аватарка репетитора
        settingsAvatar.src = './images/анна ивановна.jpg';
        userTypeDisplay.textContent = 'Репетитор';
        userDisplayName.textContent = 'Анна Ивановна';
        
        // Показываем раздел для репетитора, скрываем для ученика
        document.getElementById('my-lessons-student').classList.remove('active');
        document.getElementById('my-lessons-tutor').classList.add('active');
        document.getElementById('payments').innerHTML = getTutorPaymentsHTML();
    }
}

// HTML для раздела оплаты ученика
function getStudentPaymentsHTML() {
    return `
        <h2 class="section-title">Оплата</h2>
        <div class="payment-info">
            <div class="payment-amount">2 400 ₽</div>
            <div class="payment-details">
                <div class="payment-detail">
                    <div class="detail-label">Баланс</div>
                    <div class="detail-value">2 400 ₽</div>
                </div>
                <div class="payment-detail">
                    <div class="detail-label">Заблокировано</div>
                    <div class="detail-value">0 ₽</div>
                </div>
            </div>
            <button class="btn-withdraw" disabled>Пополнить баланс</button>
        </div>
        
        <div class="payment-history">
            <h3>История операций</h3>
            <div class="payment-item">
                <div class="payment-date">10 мая 2025</div>
                <div class="payment-description">Пополнение баланса</div>
                <div class="payment-sum">+5 000 ₽</div>
            </div>
            <div class="payment-item">
                <div class="payment-date">12 мая 2025</div>
                <div class="payment-description">Оплата занятия по математике</div>
                <div class="payment-sum">-1 200 ₽</div>
            </div>
            <div class="payment-item">
                <div class="payment-date">10 мая 2025</div>
                <div class="payment-description">Оплата занятия по программированию</div>
                <div class="payment-sum">-1 400 ₽</div>
            </div>
        </div>
    `;
}

// HTML для раздела оплаты репетитора
function getTutorPaymentsHTML() {
    return `
        <h2 class="section-title">Оплата</h2>
        <div class="payment-info">
            <div class="payment-amount">15 750 ₽</div>
            <div class="payment-details">
                <div class="payment-detail">
                    <div class="detail-label">Доступно для вывода</div>
                    <div class="detail-value">12 500 ₽</div>
                </div>
                <div class="payment-detail">
                    <div class="detail-label">В обработке</div>
                    <div class="detail-value">3 250 ₽</div>
                </div>
            </div>
            <button class="btn-withdraw">Вывести средства</button>
        </div>
        
        <div class="payment-history">
            <h3>История операций</h3>
            <div class="payment-item">
                <div class="payment-date">12 мая 2025</div>
                <div class="payment-description">Оплата занятия по математике</div>
                <div class="payment-sum">+1 200 ₽</div>
            </div>
            <div class="payment-item">
                <div class="payment-date">10 мая 2025</div>
                <div class="payment-description">Оплата занятия по программированию</div>
                <div class="payment-sum">+2 200 ₽</div>
            </div>
            <div class="payment-item">
                <div class="payment-date">5 мая 2025</div>
                <div class="payment-description">Вывод средств</div>
                <div class="payment-sum">-10 000 ₽</div>
            </div>
        </div>
    `;
}

// Обработчик для формы входа - переключение типа пользователя
document.addEventListener('DOMContentLoaded', function() {
    const userTypeButtons = document.querySelectorAll('.user-type-btn');
    
    userTypeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            userTypeButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            // Переключаем тип пользователя
            const userType = this.getAttribute('data-type');
            switchUserType(userType);
        });
    });
    
    // Обработка формы настроек
    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const about = document.getElementById('about').value;
            const email = document.getElementById('email').value;
            const favoriteSubject = document.getElementById('favoriteSubject').value;
            
            // Обновляем имя пользователя
            const userDisplayName = document.getElementById('userDisplayName');
            if (userDisplayName) {
                userDisplayName.textContent = `${firstName} ${lastName}`;
            }
            
            alert('Данные успешно сохранены!');
        });
    }
});

// Функция для входа в виртуальный класс
function enterVirtualClass() {
    // Закрываем все открытые страницы
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Открываем страницу виртуального класса
    document.getElementById('virtual-class').classList.add('active');
    
    // Обновляем навигацию
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Находим и активируем элемент навигации "Виртуальный класс"
    const virtualClassNavItems = document.querySelectorAll('.nav-item[data-page="virtual-class"]');
    virtualClassNavItems.forEach(navItem => {
        navItem.classList.add('active');
    });
    
    // Прокрутка вверх
    window.scrollTo(0, 0);
    
    // Инициализируем виртуальный класс
    initVirtualClass();
}

// Обработчики для кнопок "Войти в класс" в личном кабинете ученика
document.addEventListener('DOMContentLoaded', function() {
    // Обработчики для кнопок "Войти в класс" в разделе ученика
    const studentJoinButtons = document.querySelectorAll('#my-lessons-student .btn-join:not([disabled])');
    
    studentJoinButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            enterVirtualClass();
        });
    });
    
    // Обработчики для кнопок "Начать занятие" в разделе репетитора
    const tutorStartButtons = document.querySelectorAll('#my-lessons-tutor .btn-start:not([disabled])');
    
    tutorStartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            enterVirtualClass();
        });
    });
    
    // Также добавляем обработчики для динамически создаваемых кнопок
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-join') && !e.target.disabled) {
            e.preventDefault();
            enterVirtualClass();
        }
        
        if (e.target.classList.contains('btn-start') && !e.target.disabled) {
            e.preventDefault();
            enterVirtualClass();
        }
    });
});
