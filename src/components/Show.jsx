import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_PLACEHOLDER_IMAGE = 'https://365psd.com/images/istock/previews/1012/101282869-white-blank-poster-mockup.jpg';

const getPoster = (Poster) => (Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : Poster);

const Show = ({ show: { Title, Year, Poster } }) => (
  <div className="show">
    <h2>{Title}</h2>
    <div>
      <img
        width="200"
        alt={`The show titled: ${Title}`}
        src={getPoster(Poster)}
      />
    </div>
    <p>
      {Year}
    </p>
  </div>
);

Show.propTypes = {
  show: PropTypes.shape({
    Title: PropTypes.string,
    Year: PropTypes.string,
    Poster: PropTypes.string,
  }).isRequired,
};

export default Show;
