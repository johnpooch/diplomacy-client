import React from 'react';
import { withRouter } from 'react-router-dom';

import Alert from '../components/Alert';
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
    try {
      this.getGame(match.params.id);
    } catch (error) {
      console.error(error);
      this.setState({
        isLoaded: true,
      });
    }
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
        console.error(`Couldn't find game ${id}`);
        return null;
      })
      .then((json) => {
        console.log(json);
        this.setState({
          game: json,
          isLoaded: true,
        });
      });
  }

  render() {
    const { isLoaded, game } = this.state;
    if (!isLoaded) return <Loading />;
    if (!game) return <Alert text="Something went wrong!" type="error" />;
    return <Map game={game} />;
  }
}

export default withRouter(Game);
