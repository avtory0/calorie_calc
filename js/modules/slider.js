function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //slider

    const slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesField).width,
        slider = document.querySelector(container);

    let slideIndex = 1;
    let offset = 0;
    slider.style.position = 'relative';


    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slides => {
        slides.style.width = width;
    });

    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dotActive();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        dotActive();
    });

    const dotWrapper = document.createElement('ul');
    dotWrapper.classList.add('carousel-indicators');
    slider.append(dotWrapper);


    slides.forEach(dots => {
        dots = document.createElement('li');
        dots.classList.add('dot');
        dotWrapper.append(dots);
    });

    const dots = document.querySelectorAll('.dot');

    function dotActive() {
        dots.forEach(item => {
            item.style.opacity = '0.5';
        });
        dots[slideIndex - 1].style.opacity = 1;
    }

    dotActive();

    dots.forEach(item => {
        item.addEventListener('click', (e) => {
            dots.forEach((item, index) => {
                if (e.target == item) {
                    slideIndex = index + 1;
                    offset = +width.slice(0, width.length - 2) * (slideIndex - 1);

                    slidesField.style.transform = `translateX(-${offset}px)`;
                    dotActive();

                    if (slideIndex < 10) {
                        current.textContent = `0${slideIndex}`;
                    } else {
                        current.textContent = slideIndex;
                    }
                }

            });
        });
    });

}

export default slider;