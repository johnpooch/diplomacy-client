import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTheme } from 'styled-components';

import {
  IconComponentProps,
  SpecializedIconComponentProps,
} from './Icon.types';

export const Icon: React.FC<IconComponentProps> = ({ icon, size }) => (
  <FontAwesomeIcon icon={icon} size={size} />
);

export const SupplyCenterIcon: React.FC<SpecializedIconComponentProps> = ({
  size,
}) => <Icon icon={useTheme().icons.supplyCenter} size={size} />;

export const SettingsIcon: React.FC<SpecializedIconComponentProps> = ({
  size,
}) => <Icon icon={useTheme().icons.bars} size={size} />;

export const CancelIcon: React.FC<SpecializedIconComponentProps> = ({
  size,
}) => <Icon icon={useTheme().icons.cancel} size={size} />;
