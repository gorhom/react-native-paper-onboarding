import { ReactNode } from 'react';
import { TextStyle } from 'react-native';

export interface PaperOnboardingItemType {
  image?: () => ReactNode | ReactNode;
  icon?: () => ReactNode | ReactNode;
  title: string;
  titleStyle?: TextStyle;
  description: string;
  descriptionStyle?: TextStyle;
  color: string;
}

export interface PaperOnboardingSafeAreaInsetsType {
  top: number;
  bottom: number;
  right: number;
  left: number;
}

export interface PaperOnboardingScreenDimensions {
  width: number;
  height: number;
}
