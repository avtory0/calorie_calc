import {closeModal, OpenModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector,modelTimerId) {
    //forms

    const form = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Success',
        failure: 'Failure'
    };

    form.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
       `;

            form.insertAdjacentElement('afterend', statusMessage);
            // insertAdjacentElement позволяет более гибко вставить эл-т; 1 прмтр - после какого элта вставлять, 2 - что именно

            // const request = new XMLHttpRequest(); //-- старый способ
            // request.open('POST', 'server.php');

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            //entries - превращает в массивов массивов
            //fromEntries - превращает массив массивов в обычный объект


            //Промис, который запускается с помощью fetch не обработает ошибку

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });

        });
    }


    function showThanksModal(message) {
        const prevModal = document.querySelector('.modal__dialog');

        prevModal.classList.add('hide');
        OpenModal('.modal', modelTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
       <div class="modal__content">
          <div class="modal__close" data-close>×</div>
          <div class="modal__title">${message}</div>
       </div>
    `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModal.classList.add('show');
            prevModal.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }


    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //       method: 'POST',
    //       body: JSON.stringify({
    //          name: 'Alex'
    //       }),
    //       headers: {
    //          'Content-Type': 'application/json'
    //       }
    //    })
    //    .then(response => response.json())
    //    .then(json => console.log(json));



    // jsnon-serever

    // fetch('http://localhost:3000/menu')
    //    .then(data => data.json())
    //    .then(res => console.log(res));



}

export default forms;