import { ReactNode, MutableRefObject } from 'react';
import { TextStyle, Insets, StyleProp } from 'react-native';
import Animated from 'react-native-reanimated';

export interface PaperOnboardingItemType {
  /**
   * Image cover.
   * @type {(() => React.ReactNode) | React.ReactNode}
   */
  image?: (() => ReactNode) | ReactNode;
  /**
   * Indicator icon.
   * @type {(() => React.ReactNode) | React.ReactNode}
   */
  icon?: (() => ReactNode) | ReactNode;
  /**
   * Slide/page content.
   * @type {(() => React.ReactNode) | React.ReactNode}
   */
  content?: (() => ReactNode) | ReactNode;
  /**
   * Title text.
   * @type {string}
   */
  title?: string;
  /**
   * Title text style.
   * @type {StyleProp<TextStyle>}
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * Description text.
   * @type {string}
   */
  description?: string;
  /**
   * Description text style.
   * @type {StyleProp<TextStyle>}
   */
  descriptionStyle?: StyleProp<TextStyle>;
  /**
   * Background color.
   * @type {string}
   */
  backgroundColor: string;
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

export interface PageProps {
  index: number;
  item: PaperOnboardingItemType;
  currentIndex: Animated.Node<number>;
  animatedIndicatorsContainerPosition: Animated.Node<number>;
  indicatorSize: number;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  screenDimensions: PaperOnboardingScreenDimensions;
  safeInsets: Required<Insets>;
  handleRef: (ref: MutableRefObject<Animated.View>, index: number) => void;
}

export interface PaperOnboardingProps
  extends Pick<
    Partial<PaperOnboardingItemType>,
    'titleStyle' | 'descriptionStyle'
  > {
  /**
   * Array of pages/slides to present.
   * @type {Array<PaperOnboardingItemType>}
   */
  data: PaperOnboardingItemType[];
  /**
   * Safe area insets, usually come from `react-native-safe-area-context`.
   * @type {Insets}
   * @default {top: 50, bottom: 50, left: 50, right: 50}
   */
  safeInsets?: Partial<Insets>;
  /**
   * Pan gesture direction.
   * @type {'horizontal' | 'vertical'}
   * @default 'horizontal'
   */
  direction?: PaperOnboardingDirectionType;
  /**
   * Indicator size (width and height).
   * @type {number}
   * @default 40
   */
  indicatorSize?: number;
  /**
   * Indicator border and fill color.
   * @type {string}
   * @default 'white'
   */
  indicatorColor?: string;
  /**
   * Custom component to be used instead of the default close button.
   * @type {(() => React.ReactNode) | React.ReactNode}
   */
  closeButton?: (() => ReactNode) | ReactNode;
  /**
   * Close button text.
   * @type {string}
   * @default close
   */
  closeButtonText?: string;
  /**
   * Close button text style.
   * @type {StyleProp<TextStyle>}
   */
  closeButtonTextStyle?: StyleProp<TextStyle>;
  /**
   * Callback on close button pressed.
   * @type {() => void}
   */
  onCloseButtonPress: () => void;
}
