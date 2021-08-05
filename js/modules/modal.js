function OpenModal(modalSelector, modelTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modelTimerId);
    if (modelTimerId) {
        clearInterval(modelTimerId);
    }
}


function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modelTimerId) {
    //modal

    const btn = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);


    btn.forEach(item => {
        item.addEventListener('click', () => OpenModal(modalSelector, modelTimerId)); // для того, чтобы ф-ция выполнилась после клика
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape") {
            closeModal(modalSelector);
        }
    });

    

    function showModelByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            OpenModal(modalSelector, modelTimerId);
            window.removeEventListener('scroll', showModelByScroll);
        }
    }

    window.addEventListener('scroll', showModelByScroll);

}

export default modal;
export {
    closeModal
};
export {
    OpenModal
};