import React from 'react';
import { withRouter } from 'react-router-dom';

import Error from './Error';
import Map from '../components/Map';
import Loading from '../components/Loading';

import * as API from '../api';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.getGame(match.params.id);
  }

  getGame(id) {
    const { headers } = this.props;
    const GAMESTATEURL = API.GAMESTATEURL.replace('<int:game>', id);
    fetch(GAMESTATEURL, {
      method: 'GET',
      headers,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json) => {
        this.setState({
          game: json,
          isLoaded: true,
        });
      })
      .catch(() => {
        this.setState({
          isLoaded: true,
        });
      });
  }

  render() {
    const { isLoaded, game } = this.state;
    if (!isLoaded) return <Loading />;
    if (!game) return <Error text="Game not found" />;
    return <Map game={game} />;
  }
}

export default withRouter(Game);
