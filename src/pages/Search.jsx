import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from './Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      valueInputArtistName: '',
      searchButtonDisabled: true,
      carregando: false,
      albums: [],
      artistaProcurado: '',
      mostraAlbums: false,
    };
  }

  // validacao button
  handleArtistSearch = ({ target }) => {
    const { name, value } = target;
    const minimumCharacters = 2;
    this.setState({
      [name]: value,
    });
    if (value.length >= minimumCharacters) {
      this.setState({
        searchButtonDisabled: false,
      });
    } else {
      this.setState({
        searchButtonDisabled: true,
      });
    }
  };

  // exibe carregando -> faz a requisição na Api -> carregando: false
  handleClick = async () => {
    try {
      const { valueInputArtistName } = this.state;
      this.setState({
        valueInputArtistName: '',
        carregando: true,
        searchButtonDisabled: true,
      });
      const listaDeAlbuns = await searchAlbumsAPI(valueInputArtistName);
      this.setState({
        carregando: false,
        albums: listaDeAlbuns,
        artistaProcurado: valueInputArtistName,
        mostraAlbums: true,
      });
    } catch (error) {
      window.alert('Houve algum erro inesperado');
    } finally {
      this.setState({
        carregando: false,
      });
    }
  };

  render() {
    const {
      valueInputArtistName,
      searchButtonDisabled,
      carregando,
      albums,
      mostraAlbums,
      artistaProcurado,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          carregando ? (
            <Carregando />
          ) : (
            <>
              <form>
                <input
                  type="text"
                  data-testid="search-artist-input"
                  placeholder="Nome do Artista"
                  name="valueInputArtistName"
                  value={ valueInputArtistName }
                  onChange={ this.handleArtistSearch }
                />
              </form>
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ searchButtonDisabled }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>

            </>)
        }
        {
          mostraAlbums && (
            <h1>
              Resultado de álbuns de:
              {' '}
              {`${artistaProcurado}`}
            </h1>)
        }
        {
          albums.length === 0
            ? <h2>Nenhum álbum foi encontrado</h2>
            : (
              <div>
                <ul>
                  {
                    albums.map((element) => (
                      <li key={ element.artistId }>
                        <img src={ element.artworkUrl100 } alt="imagem do album" />
                        <p>{element.artistName}</p>
                        <p>{element.collectionName}</p>
                        <Link
                          to={ `/album/${element.collectionId}` }
                          data-testid={ `link-to-album-${element.collectionId}` }
                        />
                      </li>
                    ))
                  }
                </ul>
              </div>
            )
        }
      </div>
    );
  }
}

export default Search;
