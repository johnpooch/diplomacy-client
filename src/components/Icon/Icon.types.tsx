import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

export interface IconComponentProps {
  icon: IconProp;
  size?: SizeProp;
}

export interface SpecializedIconComponentProps {
  size?: SizeProp;
}
