const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const reserveForm = document.getElementById('reserveForm');
const thanksDialog = document.getElementById('thanksDialog');
const thanksMessage = document.getElementById('thanksMessage');
const closeDialog = document.getElementById('closeDialog');
const dateInput = document.getElementById('date');

if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

if (reserveForm && thanksDialog && thanksMessage) {
  reserveForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(reserveForm);
    const name = formData.get('name');
    const people = formData.get('people');
    const date = formData.get('date');
    const time = formData.get('time');

    if (!name || !people || !date || !time) {
      alert('必須項目を入力してください。');
      return;
    }

    thanksMessage.textContent = `${name} 様 / ${people} / ${date} ${time} の内容で受け付けました。`;
    if (typeof thanksDialog.showModal === 'function') {
      thanksDialog.showModal();
    } else {
      alert('ご予約内容を受け付けました。');
    }

    reserveForm.reset();
  });
}

if (closeDialog && thanksDialog) {
  closeDialog.addEventListener('click', () => {
    thanksDialog.close();
  });
}
