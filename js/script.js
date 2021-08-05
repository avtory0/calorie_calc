require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import modal, { OpenModal } from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';


window.addEventListener('DOMContentLoaded', () => {

   const modelTimerId = setTimeout(() => OpenModal('.modal', modelTimerId), 50000);

   tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
   modal('[data-modal]', '.modal', modelTimerId);
   timer('.timer', '2021-07-13');
   cards();
   calc();
   forms('form', modelTimerId);
   slider({
      container: '.offer__slider',
      slide: '.offer__slide',
      nextArrow: '.offer__slider-next',
      prevArrow: '.offer__slider-prev',
      totalCounter: '#total',
      currentCounter: '#current',
      wrapper: '.offer__slider-wrapper',
      field: '.offer__slider-inner'
   });
});