/* ========================================
   Contact Form - Validation & Submit
   ======================================== */

export function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const successMsg = document.querySelector('[data-form-success]');
  const errorMsg = document.querySelector('[data-form-error]');
  const submitBtn = form.querySelector('[data-form-submit]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous states
    clearErrors(form);
    hideMessages(successMsg, errorMsg);

    // Validate
    const fields = {
      name: form.querySelector('[name="name"]'),
      email: form.querySelector('[name="email"]'),
      subject: form.querySelector('[name="_subject"]'),
      message: form.querySelector('[name="message"]')
    };

    let hasError = false;

    if (!fields.name.value.trim()) {
      showFieldError(fields.name, 'Nome é obrigatório');
      hasError = true;
    }

    if (!fields.email.value.trim()) {
      showFieldError(fields.email, 'Email é obrigatório');
      hasError = true;
    } else if (!isValidEmail(fields.email.value)) {
      showFieldError(fields.email, 'Email inválido');
      hasError = true;
    }

    if (!fields.subject.value.trim()) {
      showFieldError(fields.subject, 'Assunto é obrigatório');
      hasError = true;
    }

    if (!fields.message.value.trim()) {
      showFieldError(fields.message, 'Mensagem é obrigatória');
      hasError = true;
    }

    if (hasError) return;

    // Submit
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-pulse" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
      </svg>
      Enviando...
    `;

    try {
      const formData = new FormData(form);

      const response = await fetch('https://formsubmit.co/ajax/euller.santos.duarte@gmail.com', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        form.reset();
        successMsg.classList.add('active');
        setTimeout(() => successMsg.classList.remove('active'), 5000);
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      errorMsg.classList.add('active');
      setTimeout(() => errorMsg.classList.remove('active'), 5000);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
        Enviar Mensagem
      `;
    }
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(input, message) {
  const group = input.closest('.form-group');
  if (group) {
    group.classList.add('form-group--error');
    const errorEl = group.querySelector('.form-group__error');
    if (errorEl) errorEl.textContent = message;
  }
}

function clearErrors(form) {
  form.querySelectorAll('.form-group--error').forEach(g => {
    g.classList.remove('form-group--error');
  });
}

function hideMessages(success, error) {
  if (success) success.classList.remove('active');
  if (error) error.classList.remove('active');
}
