import React, { useReducer } from 'react';
import axios from 'axios';

import '../App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';
import { reducer, initialState } from '../reducers/MoviesReducer';

const OMDB_URL = 'https://www.omdbapi.com/?';
const OMDB_KEY = process.env.REACT_APP_OMDB_API_KEY;
const API_KEY_FIELD = `apikey=${OMDB_KEY}`;

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const search = (searchValue) => {
    dispatch({ type: 'SEARCH_MOVIES' });

    axios.get(`${OMDB_URL}s=${searchValue}&${API_KEY_FIELD}`)
      .then((response) => {
        const { data } = response;
        const action = data.Response === 'True'
          ? { type: 'SEARCH_MOVIES_SUCCESS', payload: data.Search }
          : { type: 'SEARCH_MOVIES_FAILURE', payload: data.Error };

        dispatch(action);
      });
  };

  const { movies, errorMessage, loading } = state;

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && <span>loading...</span>}
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        {movies && movies.map((movie) => (
          <Movie key={`${movie.imdbID}`} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default App;
