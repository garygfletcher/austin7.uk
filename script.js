document.getElementById('year').textContent = new Date().getFullYear();

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.querySelector('img').alt;
    lightbox.classList.add('open');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

const EMAIL_ENCODED = 'gary@austin7.uk'.split('').reverse().join('');
const RECAPTCHA_SITE_KEY = '6LdObCwtAAAAAByxII2NygcBqC-dzBWPorL5uJI-';

const emailLocked = document.getElementById('email-locked');
const emailLink = document.getElementById('email-link');
const emailCaptcha = document.getElementById('email-captcha');

function onEmailCaptchaSolved(token) {
  if (!token) return;
  const email = EMAIL_ENCODED.split('').reverse().join('');
  emailLink.href = 'mailto:' + email;
  emailLink.textContent = email;
  emailLink.style.display = '';
  emailLocked.style.display = 'none';
  emailCaptcha.innerHTML = '';
}
window.onEmailCaptchaSolved = onEmailCaptchaSolved;

emailLocked.addEventListener('click', () => {
  if (emailCaptcha.childElementCount > 0) return;
  emailLocked.textContent = 'Verifying you’re human…';

  const renderWidget = () => {
    if (!window.grecaptcha || !window.grecaptcha.render) {
      setTimeout(renderWidget, 200);
      return;
    }
    emailLocked.textContent = 'Reveal email';
    window.grecaptcha.render(emailCaptcha, {
      sitekey: RECAPTCHA_SITE_KEY,
      callback: onEmailCaptchaSolved
    });
  };
  renderWidget();
});
