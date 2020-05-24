import React from 'react';

import Heading from '../components/Heading';
import { PageWrapper } from '../styles';

const Error = (props) => {
  const { text } = props;
  return (
    <PageWrapper>
      <Heading text="Error" />
      <p>{text}</p>
    </PageWrapper>
  );
};
export default Error;
