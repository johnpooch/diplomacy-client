import React from 'react';

import Alert from '../components/Alert';
import Heading from '../components/Heading';
import { PageWrapper } from '../globals';

const Error = (props) => {
  const { text } = props;
  return (
    <PageWrapper>
      <Heading text="Error" />
      <Alert text={text} type="error" />
    </PageWrapper>
  );
};
export default Error;
