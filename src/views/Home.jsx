import React from 'react';
import styled from '@emotion/styled';

import Heading from '../components/Heading';
import Loading from '../components/Loading';
import { PageWrapper } from '../globals';
import { fontSizes } from '../variables';

const StyledDiv = styled(PageWrapper)`
  p {
    margin: 0;
    font-size: ${fontSizes.sans[3]}px;
  }
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoaded: true,
    });
  }

  renderView() {
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return <Loading />;
    }

    return <p>Welcome to Diplomacy!</p>;
  }

  render() {
    return (
      <StyledDiv>
        <Heading text="Home" />
        {this.renderView()}
      </StyledDiv>
    );
  }
}

export default Home;
