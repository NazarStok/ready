const buttons = document.querySelectorAll('.button');
const blocks = document.querySelectorAll('.block');
const confirmationButtons = document.querySelectorAll('.confirmation-button');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        showBlock(index);
    });
});

confirmationButtons.forEach((confirmationButton, index) => {
    confirmationButton.addEventListener('click', () => {
        if (validateInputs(blocks[index])) {
            if (index < blocks.length - 1) {
                showBlock(index + 1);
            } else {
                alert('Це останній блок!');
            }
        } else {
            alert('Будь ласка, заповніть всі поля перед переходом.');
        }
    });
});

function showBlock(index) {
    blocks.forEach((block, i) => {
        if (i === index) {
            block.style.display = 'block';
        } else {
            block.style.display = 'none';
        }
    });
    buttons.forEach(btn => btn.classList.remove('active'));
    buttons[index].classList.add('active');
    if (index > 0) {
        buttons[index - 1].disabled = false;
    }
}

function validateInputs(block) {
    const inputs = block.querySelectorAll('input');
    const checkboxes = block.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === 'checkbox') {
            if (!inputs[i].checked) {
                return false;
            }
        } else {
            if (inputs[i].value.trim() === '') {
                return false;
            }
        }
    }
    return true;
}

showBlock(0);

const slides = document.querySelectorAll('.slide');
let intervalId;

function showSlide(slideIndex) {
  if (slideIndex >= slides.length) {
    return; // не показуємо неприпустимий слайд
  }

  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
  
  // Позначити активну кнопку
  document.querySelectorAll('.buttons button').forEach(button => {
    button.classList.remove('active', 'shown');
  });
  document.getElementById(`slide${slideIndex + 1}`).classList.add('active');

  // Позначити показані, але не активні кнопки
  for (let i = 0; i < slideIndex; i++) {
    document.getElementById(`slide${i + 1}`).classList.add('shown');
  }

  localStorage.setItem('activeSlideIndex', slideIndex); // зберегти активний слайд
}

// Показати активний слайд при завантаженні сторінки
showSlide(0); // зробити перший слайд активним при оновленні сторінки

// Автоматичне переключання слайдів кожні 10 секунд
function startAutoSlide() {
  intervalId = setInterval(() => {
    const activeSlideIndex = parseInt(localStorage.getItem('activeSlideIndex')) || 0;
    const nextSlideIndex = (activeSlideIndex + 1) % slides.length;
    showSlide(nextSlideIndex);
    if (nextSlideIndex === 0) {
      clearInterval(intervalId); // Зупиняємо автоматичне переключання після показу всіх слайдів
    }
  }, 10000); // 10 секунд
}

// Запуск автоматичного переключання слайдів
startAutoSlide();

// Зупинка автоматичного переключання при наведенні на слайдер
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', () => {
  clearInterval(intervalId);
});

// Поновлення автоматичного переключання при виїзді курсора зі слайдера
sliderContainer.addEventListener('mouseleave', () => {
  startAutoSlide();
});
