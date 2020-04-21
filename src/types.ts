import { ReactNode } from 'react';
import { TextStyle } from 'react-native';

export interface PaperOnboardingItemType {
  /**
   * SVG/Image/component to be added to the slide/page.
   */
  image?: (() => ReactNode) | ReactNode;
  /**
   * SVG/Image/component to be added to the slide/page.
   */
  icon?: (() => ReactNode) | ReactNode;
  /**
   * Custom component to be added to the slide/page.
   */
  content?: (() => ReactNode) | ReactNode;
  /**
   * Title for the slide/page.
   */
  title?: string;
  /**
   * Text style to override page/slide title default style.
   */
  titleStyle?: TextStyle;
  /**
   * Description for the slide/page.
   */
  description?: string;
  /**
   * Text style to override page/slide description default style.
   */
  descriptionStyle?: TextStyle;
  /**
   * Background color for the slide/page.
   */
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

export type PaperOnboardingDirectionType = 'horizontal' | 'vertical';
