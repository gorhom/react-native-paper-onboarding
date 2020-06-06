import { ReactNode } from 'react';
import { TextStyle, Insets, StyleProp } from 'react-native';
import Animated from 'react-native-reanimated';

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

export interface PaperOnboardingScreenDimensions {
  width: number;
  height: number;
}

export type PaperOnboardingDirectionType = 'horizontal' | 'vertical';

// PROPS

export interface CloseButtonProps {
  lastIndex: number;
  safeInsets: Required<Insets>;
  currentIndex: Animated.Node<number>;
  text: string;
  textStyle?: StyleProp<TextStyle>;
  customButton?: (() => ReactNode) | ReactNode;
  onPress: () => void;
}

export interface PaperOnboardingProps
  extends Pick<
    Partial<PaperOnboardingItemType>,
    'titleStyle' | 'descriptionStyle'
  > {
  data: PaperOnboardingItemType[];
  safeInsets?: Partial<Insets>;
  direction?: PaperOnboardingDirectionType;
  indicatorSize?: number;
  indicatorColor?: string;
  closeButtonTextStyle?: TextStyle;
  closeButtonText?: string;
  closeButton?: (() => ReactNode) | ReactNode;
  onCloseButtonPress: () => void;
}
