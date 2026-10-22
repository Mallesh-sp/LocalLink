/**
 * LocalLink - Contact Form Validation JavaScript
 * Validates customer contact input fields and renders confirmation alert.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('contactSuccessMsg');

  if (!form) return;

  function setError(inputId, errId, isValid) {
    const inputEl = document.getElementById(inputId);
    const errEl = document.getElementById(errId);
    if (!inputEl || !errEl) return isValid;

    if (!isValid) {
      inputEl.classList.add('is-invalid');
      errEl.classList.add('visible');
    } else {
      inputEl.classList.remove('is-invalid');
      errEl.classList.remove('visible');
    }
    return isValid;
  }

  // Live input error removal
  ['contactName', 'contactEmail', 'contactMobile', 'contactSubject', 'contactMessage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => el.classList.remove('is-invalid'));
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const mobile = document.getElementById('contactMobile').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    const isNameValid = setError('contactName', 'errContactName', name.length >= 2);
    const isEmailValid = setError('contactEmail', 'errContactEmail', /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email));
    const isMobileValid = setError('contactMobile', 'errContactMobile', /^[6-9]\d{9}$/.test(mobile));
    const isSubjectValid = setError('contactSubject', 'errContactSubject', subject.length > 0);
    const isMessageValid = setError('contactMessage', 'errContactMessage', message.length > 0);

    const formIsValid = isNameValid && isEmailValid && isMobileValid && isSubjectValid && isMessageValid;

    if (!formIsValid) {
      showToast('Please fix the errors in the form before sending.', 'danger');
      return;
    }

    // Display inline success message
    if (successMsg) {
      successMsg.style.display = 'flex';
    }

    showToast('Thank you! Your message has been received.', 'success');

    // Reset Form
    form.reset();
  });
});
