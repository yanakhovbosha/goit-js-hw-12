import axios from 'axios';

export async function getImagesByQuery(query, page = 1) {
  return await axios('https://pixabay.com/api/', {
    params: {
      key: '50825646-7ffda2e7b5c30b92a9f1b68eb',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page,
      per_page: 15,
    },
  }).then(res => res.data);
}
