import React from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

class Pet extends React.Component {
  render() {
    const { name, animal, breed, media, location, id } = this.props;
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo['@size'] === 'pn');
    }

    let hero = 'http://placecorgi.com/300/300';
    if (photos[0] && photos[0].value) {
      hero = photos[0].value;
    }

    return (
      <Link to={`/details/${id}`} className="pet">
        <div className="image-container">
          <img src={hero} alt={name} />
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
        </div>
      </Link>
    );
  }
}

Pet.propTypes = {
  name: PropTypes.string.isRequired,
  animal: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  media: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Pet;
