import axios from 'axios';
const API_KEY = '30762698-4d5459f286765aeda4039727d';
axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchImage = async (searchImage, page) => {
  const response = await axios.get(
    `/?q=${searchImage}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
