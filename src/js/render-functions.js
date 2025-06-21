import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImagesByQuery } from './pixabay-api';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoadMore = document.querySelector('.btn-load-more');

let page = 1;
let queryCard = '';
const perPage = 15;

export const simpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

export function createGallery(images) {
  const galleryImg = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-list-item">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}"/>
          </a>
          <ul class="list-item">
            <li class="item">
              <h3 class="list-item-title">Likes</h3>
              <p class="list-item-text">${likes}</p>
            </li>
            <li class="item">
              <h3 class="list-item-title">Views</h3>
              <p class="list-item-text">${views}</p>
            </li>
            <li class="item">
              <h3 class="list-item-title">Comments</h3>
              <p class="list-item-text">${comments}</p>
            </li>
            <li class="item">
              <h3 class="list-item-title">Downloads</h3>
              <p class="list-item-text">${downloads}</p>
            </li>
          </ul>
        </li>
        `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', galleryImg);

  simpleLightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  btnLoadMore.classList.remove('hidden-btn');
}

export function hideLoadMoreButton() {
  btnLoadMore.classList.add('hidden-btn');
}

btnLoadMore.addEventListener('click', handleClick);

export function setQueryCard(query) {
  queryCard = query;
}

export async function handleClick(event) {
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
      left: 100,
      behavior: 'smooth',
    });

    btnLoadMore.disabled = false;

    const totalPages = Math.ceil(data.totalHits / perPage);
    console.log(totalPages);

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
