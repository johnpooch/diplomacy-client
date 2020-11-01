import React from 'react';

import Page from '../components/Page';

const Error = (props) => {
  const { text } = props;
  return (
    <Page title="Error" isLoaded>
      <p>{text}</p>
    </Page>
  );
};

export default Error;
