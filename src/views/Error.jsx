import React from 'react';

import Alert from '../components/Alert';
import Heading from '../components/Heading';
import { PageWrapper } from '../styles';

const Error = (props) => {
  const { text } = props;
  return (
    <PageWrapper>
      <Heading text="Error" />
      <Alert text={text} type="alert-danger" />
    </PageWrapper>
  );
};
export default Error;
