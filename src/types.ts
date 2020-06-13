import { ReactNode, MutableRefObject, FC, ComponentClass } from 'react';
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
   * @type {((props: IndicatorIconProps) => React.ReactNode) | React.ReactNode}
   */
  icon?: FC<IndicatorIconProps> | ComponentClass<IndicatorIconProps>;
  /**
   * Slide/page content.
   * @type {((props: PageContentProps) => React.ReactNode) | React.ReactNode}
   */
  content?: FC<PageContentProps> | ComponentClass<PageContentProps>;
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
  /**
   * Show close button when page active.
   * `note: last page will always show close button.`
   * @type {boolean}
   * @default false
   */
  showCloseButton?: boolean;
}

export interface PaperOnboardingScreenDimensions {
  width: number;
  height: number;
}

export interface PaperOnboardingIndicatorConfig {
  /**
   * Indicator size (width and height).
   * @type {number}
   * @default 40
   */
  indicatorSize: number;
  /**
   * Indicator background color.
   * @type {string}
   * @default 'white'
   */
  indicatorBackgroundColor: string;
  /**
   * Indicator border color.
   * @type {string}
   * @default 'white'
   */
  indicatorBorderColor: string;
}

export interface PaperOnboardingCloseButtonConfig {
  /**
   * Custom component to be used instead of the default close button.
   * @type {(() => React.ReactNode) | React.ReactNode}
   */
  closeButton: (() => ReactNode) | ReactNode;
  /**
   * Close button text.
   * @type {string}
   * @default close
   */
  closeButtonText: string;
  /**
   * Close button text style.
   * @type {StyleProp<TextStyle>}
   */
  closeButtonTextStyle: StyleProp<TextStyle>;
  /**
   * Callback on close button pressed.
   * @type {() => void}
   */
  onCloseButtonPress: () => void;
}

export type PaperOnboardingDirectionType = 'horizontal' | 'vertical';

// PROPS

export interface CloseButtonProps extends PaperOnboardingCloseButtonConfig {
  data: Array<PaperOnboardingItemType>;
  safeInsets: Required<Insets>;
  animatedIndex: Animated.Node<number>;
}

export interface PageProps {
  index: number;
  item: PaperOnboardingItemType;
  animatedIndex: Animated.Node<number>;
  indicatorSize: number;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  screenDimensions: PaperOnboardingScreenDimensions;
  safeInsets: Required<Insets>;
  handleRef: (ref: MutableRefObject<Animated.View>, index: number) => void;
}

export interface PageContentProps
  extends Pick<
    PaperOnboardingItemType,
    'title' | 'titleStyle' | 'description' | 'descriptionStyle' | 'image'
  > {
  index: number;
  animatedFocus: Animated.Node<number>;
}

export interface IndicatorIconProps {
  size: number;
}

export interface PaperOnboardingProps
  extends Pick<
      Partial<PaperOnboardingItemType>,
      'titleStyle' | 'descriptionStyle'
    >,
    Partial<PaperOnboardingIndicatorConfig>,
    Partial<PaperOnboardingCloseButtonConfig> {
  /**
   * Callback when index change.
   * @type {() => void}
   * @default noop
   */
  onIndexChange?: (index: number) => void;
  /**
   * Array of pages/slides to present.
   * @type {Array<PaperOnboardingItemType>}
   */
  data: Array<PaperOnboardingItemType>;
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
}

export interface IndicatorsContainerProps
  extends PaperOnboardingIndicatorConfig {
  animatedIndex: Animated.Node<number>;
  data: PaperOnboardingItemType[];
  animatedIndicatorsContainerPosition: Animated.Node<number>;
  safeInsets: Required<Insets>;
}

export interface IndicatorProps extends PaperOnboardingIndicatorConfig {
  index: number;
  item: PaperOnboardingItemType;
  animatedIndex: Animated.Node<number>;
}

export interface BackgroundProps
  extends Pick<PaperOnboardingIndicatorConfig, 'indicatorSize'> {
  /**
   * Array of pages/slides to present.
   * @type {Array<PaperOnboardingItemType>}
   */
  data: Array<PaperOnboardingItemType>;
  animatedIndex: Animated.Node<number>;
  animatedIndicatorsContainerPosition: Animated.Node<number>;
  screenDimensions: PaperOnboardingScreenDimensions;
  safeInsets: Required<Insets>;
}

export interface BackgroundCircleProps
  extends Pick<PaperOnboardingIndicatorConfig, 'indicatorSize'> {
  index: number;
  animatedIndex: Animated.Node<number>;
  animatedIndicatorsContainerPosition: Animated.Node<number>;
  color: string;
  extendedSize: number;
  bottomPosition: number;
}
