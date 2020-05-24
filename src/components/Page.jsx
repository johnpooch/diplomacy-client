import React from 'react';

import Header from './Header';
import Heading from './Heading';
import { PageWrapper } from '../styles';

const Page = (props) => {
  const { children, headingText } = props;

  return (
    <main>
      <Header />
      <PageWrapper>
        {headingText ? <Heading text={headingText} /> : null}
        {children}
      </PageWrapper>
    </main>
  );
};

export default Page;
