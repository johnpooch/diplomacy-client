import React from 'react';

import Heading from './Heading';
import Loading from './Loading';
import { PageWrapper } from '../styles';

const Page = (props) => {
  const { children, headingText, isLoaded } = props;

  const renderPageWrapper = () => {
    if (!isLoaded) return <Loading />;
    return (
      <PageWrapper>
        {headingText ? <Heading text={headingText} /> : null}
        {children}
      </PageWrapper>
    );
  };

  return <main>{renderPageWrapper()}</main>;
};

export default Page;
