export function modal() {
  const refs = {
    backdrop: document.querySelector('.backdrop'),
    closeBtn: document.querySelector('.modal-close-button'),
  };

  refs.closeBtn.addEventListener('click', toggleModal);
  refs.backdrop.addEventListener('click', handleClickOutside);

  window.addEventListener('keydown', handleEscPress);

  function toggleModal() {
    refs.backdrop.classList.toggle('is-hidden');
    removeEventListeners();
  }

  function handleClickOutside(event) {
    if (event.target === refs.backdrop) {
      toggleModal();
    }
  }

  function handleEscPress(event) {
    if (event.code === 'Escape') {
      toggleModal();
    }
  }

  function removeEventListeners() {
    refs.closeBtn.removeEventListener('click', toggleModal);
    refs.backdrop.removeEventListener('click', handleClickOutside);
    window.removeEventListener('keydown', handleEscPress);
  }
}
