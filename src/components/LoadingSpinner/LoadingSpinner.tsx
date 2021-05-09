import React, { ReactElement } from 'react';

import StyledLoader from './LoadingSpinner.styles';
import { LoadingSpinnerComponentProps } from './LoadingSpinner.types';

const LoadingSpinner: React.FC<LoadingSpinnerComponentProps> = ({
  size,
}): ReactElement => <StyledLoader type="Oval" height={size} width={size} />;

export default LoadingSpinner;
