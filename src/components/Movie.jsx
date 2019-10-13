import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_PLACEHOLDER_IMAGE = 'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg';

const getPoster = (Poster) => (Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : Poster);

const Movie = ({ movie: { Title, Year, Poster } }) => (
  <div className="movie">
    <h2>{Title}</h2>
    <div>
      <img
        width="200"
        alt={`The movie titled: ${Title}`}
        src={getPoster(Poster)}
      />
    </div>
    <p>
      {Year}
    </p>
  </div>
);

Movie.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Year: PropTypes.string,
    Poster: PropTypes.string,
  }).isRequired,
};

export default Movie;
