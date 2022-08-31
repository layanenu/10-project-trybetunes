import React from 'react';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  // constructor() {
  // super();
  state = {
    userName: '',
    carregando: true,
  };
  // }

  async componentDidMount() {
    const name = await getUser();
    this.setState({
      userName: name,
      carregando: false,
    });
  }

  render() {
    const { carregando, userName: { name } } = this.state;
    return (
      <header data-testid="header-component">
        {carregando ? <Carregando />
          : <p data-testid="header-user-name">{name}</p>}
      </header>
    );
  }
}

export default Header;
