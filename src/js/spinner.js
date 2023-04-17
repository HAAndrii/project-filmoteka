const loader = document.querySelector('.loader');
export { loader }
function fnDelete() {

    setTimeout(() => {
        loader.classList.add('loader-hidden');
    }, 500);
     }

function fnLoad() {    
    loader.classList.remove('loader-hidden');
}

export default {  fnDelete, fnLoad };


