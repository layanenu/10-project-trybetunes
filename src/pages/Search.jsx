import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      searchButtonDisabled: true,
    };
  }

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

  render() {
    const { name, searchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          placeholder="Nome do Artista"
          name="name"
          value={ name }
          onChange={ this.handleArtistSearch }

        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ searchButtonDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
