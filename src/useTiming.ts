import Animated, {
  sub,
  add,
  or,
  block,
  cond,
  eq,
  set,
  stopClock,
  and,
  not,
  clockRunning,
  startClock,
  lessThan,
  greaterThan,
  abs,
  timing,
  onChange,
} from 'react-native-reanimated';
import { I18nManager } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { useClock, useValue } from 'react-native-redash';
import { useMemo } from 'react';

const {
  interpolate: interpolateV1,
  interpolateNode: interpolateV2,
} = require('react-native-reanimated');
const interpolate = interpolateV2 || interpolateV1;

const {
  Easing: EasingV1,
  EasingNode: EasingV2,
} = require('react-native-reanimated');
const Easing = EasingV2 || EasingV1;

interface useTimingProps {
  value: Animated.Adaptable<number>;
  animatedStaticIndex: Animated.Value<number>;
  animatedOverrideIndex: Animated.Value<number>;
  velocity: Animated.Adaptable<number>;
  state: Animated.Value<State>;
  offset?: Animated.Value<number>;
  deceleration?: number;
  size: number;
  screenWidth: number;
}

export const useTiming = ({
  animatedStaticIndex,
  animatedOverrideIndex,
  value,
  velocity,
  state,
  size,
  screenWidth,
}: useTimingProps) => {
  const clock = useClock();
  const isManuallyAnimated = useValue(0);

  const config = useMemo(
    () => ({
      toValue: new Animated.Value(0),
      duration: 500,
      easing: Easing.out(Easing.exp),
    }),
    []
  );

  const animationState = useMemo(
    () => ({
      finished: new Animated.Value(0),
      position: new Animated.Value(0),
      frameTime: new Animated.Value(0),
      time: new Animated.Value(0),
    }),
    []
  );

  const valueClamp = useMemo(
    () =>
      interpolate(value, {
        inputRange: [screenWidth * -1, 0, screenWidth],
        outputRange: I18nManager.isRTL ? [-1, 0, 1] : [1, 0, -1],
        extrapolate: Animated.Extrapolate.CLAMP,
      }),
    [value, screenWidth]
  );

  const velocityClamp = useMemo(
    () =>
      interpolate(velocity, {
        inputRange: [screenWidth * -2, 0, screenWidth * 2],
        outputRange: I18nManager.isRTL ? [-0.5, 0, 0.5] : [0.5, 0, -0.5],
        extrapolate: Animated.Extrapolate.CLAMP,
      }),
    [screenWidth, velocity]
  );

  const isTimingInterrupted = and(eq(state, State.BEGAN), clockRunning(clock));
  const finishTiming = useMemo(
    () => [
      set(animatedStaticIndex, config.toValue),
      set(animatedOverrideIndex, config.toValue),
      set(animationState.frameTime, 0),
      set(animationState.time, 0),
      set(state, State.UNDETERMINED),
      set(isManuallyAnimated, 0),
      stopClock(clock),
    ],
    [
      state,
      animatedOverrideIndex,
      animatedStaticIndex,
      animationState.frameTime,
      animationState.time,
      clock,
      config.toValue,
      isManuallyAnimated,
    ]
  );

  const shouldAnimate = useMemo(
    () =>
      and(
        not(and(eq(animatedStaticIndex, 0), lessThan(valueClamp, 0))),
        not(and(eq(animatedStaticIndex, size - 1), greaterThan(valueClamp, 0)))
      ),
    [animatedStaticIndex, size, valueClamp]
  );
  const shouldReset = useMemo(
    () => not(greaterThan(add(abs(valueClamp), abs(velocityClamp)), 0.5)),
    [valueClamp, velocityClamp]
  );
  const shouldAnimateNext = useMemo(
    () =>
      greaterThan(
        add(animationState.position, velocityClamp),
        animatedStaticIndex
      ),
    [animatedStaticIndex, animationState.position, velocityClamp]
  );

  const animatedPosition = useMemo(
    () =>
      block([
        cond(isTimingInterrupted, finishTiming),
        cond(
          eq(state, State.ACTIVE),
          cond(
            and(
              not(and(eq(animatedStaticIndex, 0), lessThan(valueClamp, 0))),
              not(
                and(
                  eq(animatedStaticIndex, size - 1),
                  greaterThan(valueClamp, 0)
                )
              )
            ),
            [
              set(animationState.finished, 0),
              set(
                animationState.position,
                add(animatedStaticIndex, valueClamp)
              ),
            ]
          )
        ),

        onChange(animatedOverrideIndex, [
          set(isManuallyAnimated, 1),
          set(animationState.finished, 0),
        ]),

        cond(or(eq(state, State.END), isManuallyAnimated), [
          cond(and(not(clockRunning(clock)), not(animationState.finished)), [
            cond(
              isManuallyAnimated,
              set(config.toValue, animatedOverrideIndex),
              cond(
                or(shouldReset, not(shouldAnimate)),
                set(config.toValue, animatedStaticIndex),
                cond(
                  shouldAnimateNext,
                  set(config.toValue, add(animatedStaticIndex, 1)),
                  set(config.toValue, sub(animatedStaticIndex, 1))
                )
              )
            ),
            set(animationState.finished, 0),
            set(animationState.frameTime, 0),
            set(animationState.time, 0),
            startClock(clock),
          ]),
          timing(clock, animationState, config),
          cond(animationState.finished, finishTiming),
        ]),

        animationState.position,
      ]),
    [
      size,
      state,
      animatedOverrideIndex,
      animatedStaticIndex,
      animationState,
      clock,
      config,
      finishTiming,
      isManuallyAnimated,
      isTimingInterrupted,
      shouldAnimate,
      shouldAnimateNext,
      shouldReset,
      valueClamp,
    ]
  );
  return animatedPosition;
};
