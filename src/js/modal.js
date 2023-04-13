export function modal () {
    const refs = {
        backdrop: document.querySelector(".backdrop"),
        closeBtn: document.querySelector(".modal-close-button"),
    };
    
    refs.closeBtn.addEventListener("click", toggleModal);
    
    function toggleModal () {
        refs.backdrop.classList.toggle('is-hidden')
    };
}
