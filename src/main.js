import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  gallery,
  btnLoadMore,
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const nameSearch = document.querySelector('input[name="search-text"]');
const btn = document.querySelector('button[type="submit"]');

nameSearch.classList.add('input-form');
btn.classList.add('btn-form');

let page = 1;
let queryCard = '';
const perPage = 15;
let totalPages;
console.log(totalPages);

form.addEventListener('submit', changeSubmit);

export async function changeSubmit(event) {
  event.preventDefault();

  const valueName = nameSearch.value.toLowerCase().trim();
  setQueryCard(valueName);

  page = 1;

  if (valueName === '') {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      backgroundColor: 'pink',
      position: 'topRight',
    });
    return;
  }

  showLoader();
  clearGallery();
  try {
    const res = await getImagesByQuery(valueName, page);
    const dataHits = res.hits;
    if (dataHits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        backgroundColor: 'pink',
        position: 'topRight',
      });
      return;
    }
    totalPages = Math.ceil(res.totalHits / perPage);
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
    createGallery(res.hits);
  } catch (error) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      backgroundColor: 'pink',
      position: 'topRight',
    });
    return;
  } finally {
    hideLoader();
  }
  event.target.reset();
}

btnLoadMore.addEventListener('click', handleClick);

function setQueryCard(query) {
  queryCard = query;
}

async function handleClick(event) {
  page += 1;
  btnLoadMore.disabled = true;
  showLoader();

  try {
    const data = await getImagesByQuery(queryCard, page);
    createGallery(data.hits);

    const galleryChild = gallery.firstElementChild;
    const cardHeight = galleryChild.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      left: 0,
      behavior: 'smooth',
    });

    btnLoadMore.disabled = false;

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
    console.log(data);
  } catch (error) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      backgroundColor: 'pink',
      position: 'topRight',
    });
    return;
  } finally {
    hideLoader();
  }
}
