import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

import '../App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';

const OMDB_URL = 'https://www.omdbapi.com/?';
const OMDB_KEY = process.env.REACT_APP_OMDB_API_KEY;
const API_KEY_FIELD = `apikey=${OMDB_KEY}`;

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(`${OMDB_URL}${API_KEY_FIELD}`)
      .then((res) => dispatch({ type: 'SEARCH_MOVIES_SUCCESS', payload: res.Search }));
  }, []);

  const search = (searchValue) => {
    dispatch({ type: 'SEARCH_MOVIES_REQUEST' });

    axios.get(`${OMDB_URL}s=${searchValue}&${API_KEY_FIELD}`)
      .then((res) => {
        const action = res.data.Response === 'True' ? { type: 'SEARCH_MOVIES_SUCCESS', payload: res.data.Search } : { type: 'SEARCH_MOVIES_FAILURE', payload: res.data.Error };

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
