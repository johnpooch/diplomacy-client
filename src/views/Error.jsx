import React from 'react';

import Header from '../components/Header';
import Heading from '../components/Heading';
import { PageWrapper } from '../styles';

const Error = (props) => {
  const { text } = props;
  return (
    <div>
      <Header />
      <PageWrapper>
        <Heading text="Error" />
        <p>{text}</p>
      </PageWrapper>
    </div>
  );
};

export default Error;
