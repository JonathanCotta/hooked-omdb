import { get } from 'axios';

const OMDB_URL = 'https://www.omdbapi.com/?';
const { REACT_APP_OMDB_API_KEY } = process.env;
const API_KEY_FIELD = `apikey=${REACT_APP_OMDB_API_KEY}`;

export const findMovies = async (movieName) => {
  try {
    const { data } = await get(`${OMDB_URL}s=${movieName}&${API_KEY_FIELD}`);

    if (data?.Response === 'True') return { error: false, data: data.Search };

    return { error: true, data: data.Error };
  } catch (error) {
    return { error: true, data: error };
  }
};

export default { findMovies };
