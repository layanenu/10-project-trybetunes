import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      listaDeMusicas: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    // console.log(musics);
    this.setState({
      listaDeMusicas: musics,
    });
  }

  render() {
    const { listaDeMusicas } = this.state;
    console.log(listaDeMusicas);
    return (
      <div data-testid="page-album">
        <Header />
        {
          listaDeMusicas.length > 0 && (
            <div>
              <img
                src={ listaDeMusicas[0].artworkUrl60 }
                alt={ listaDeMusicas[0].collectionName }
              />
              <p data-testid="artist-name">{listaDeMusicas[0].artistName}</p>
              <p data-testid="album-name">{listaDeMusicas[0].collectionName}</p>
            </div>)
        }
        <div>
          { listaDeMusicas.map((element, index) => (index > 0 && (
            <MusicCard
              key={ element.trackId }
              trackName={ element.trackName }
              previewUrl={ element.previewUrl }
            />)))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
