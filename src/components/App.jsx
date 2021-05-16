import React, { useReducer } from 'react';

import '../styles/App.css';
import Header from './Header';
import Show from './Show';
import Search from './Search';
import { reducer, initialState } from '../reducers/MoviesReducer';
import { findMovies } from '../services/OMDBService';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const search = async (searchValue) => {
    dispatch({ type: 'SEARCH_MOVIES' });

    const omdbData = await findMovies(searchValue);

    const action = {
      type: omdbData.error ? 'SEARCH_MOVIES_FAILURE' : 'SEARCH_MOVIES_SUCCESS',
      payload: omdbData.data,
    };

    return dispatch(action);
  };

  const { shows, errorMessage, loading } = state;

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite shows</p>
      <div className="shows">
        {loading && <span>loading...</span>}
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
        {shows && shows.map((show) => (
          <Show key={`${show.imdbID}`} show={show} />
        ))}
      </div>
    </div>
  );
};

export default App;
