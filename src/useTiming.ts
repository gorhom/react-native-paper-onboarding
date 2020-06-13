import Animated, { Easing, sub } from 'react-native-reanimated';
import { State } from 'react-native-gesture-handler';
import { useClock, useValue } from 'react-native-redash';

const {
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
  interpolate,
  abs,
  timing,
} = Animated;

interface useTimingProps {
  value: Animated.Adaptable<number>;
  animatedStaticIndex: Animated.Value<number>;
  velocity: Animated.Adaptable<number>;
  state: Animated.Value<State>;
  offset?: Animated.Value<number>;
  deceleration?: number;
  size: number;
  screenWidth: number;
}

export const useTiming = ({
  animatedStaticIndex,
  value,
  velocity,
  state,
  size,
  screenWidth,
}: useTimingProps) => {
  const clock = useClock();

  const config = {
    toValue: useValue(0),
    duration: 500,
    easing: Easing.out(Easing.exp),
  };

  const animationState = {
    finished: useValue(0),
    position: useValue(0),
    frameTime: useValue(0),
    time: useValue(0),
  };

  const valueClamp = interpolate(value, {
    inputRange: [screenWidth * -1, 0, screenWidth],
    outputRange: [1, 0, -1],
    extrapolate: Animated.Extrapolate.CLAMP,
  });

  const velocityClamp = interpolate(velocity, {
    inputRange: [screenWidth * -2, 0, screenWidth * 2],
    outputRange: [0.5, 0, -0.5],
    extrapolate: Animated.Extrapolate.CLAMP,
  });

  const isTimingInterrupted = and(eq(state, State.BEGAN), clockRunning(clock));
  const finishTiming = [
    set(animatedStaticIndex, config.toValue),
    set(animationState.frameTime, 0),
    set(animationState.time, 0),
    stopClock(clock),
  ];

  const shouldAnimate = and(
    not(and(eq(animatedStaticIndex, 0), lessThan(valueClamp, 0))),
    not(and(eq(animatedStaticIndex, size - 1), greaterThan(valueClamp, 0)))
  );
  const shouldReset = not(
    greaterThan(add(abs(valueClamp), abs(velocityClamp)), 0.5)
  );

  const shouldAnimateNext = greaterThan(
    add(animationState.position, velocityClamp),
    animatedStaticIndex
  );

  return block([
    cond(isTimingInterrupted, finishTiming),
    cond(
      eq(state, State.ACTIVE),
      cond(
        and(
          not(and(eq(animatedStaticIndex, 0), lessThan(valueClamp, 0))),
          not(
            and(eq(animatedStaticIndex, size - 1), greaterThan(valueClamp, 0))
          )
        ),
        [
          set(animationState.finished, 0),
          set(animationState.position, add(animatedStaticIndex, valueClamp)),
        ]
      )
    ),

    cond(eq(state, State.END), [
      cond(and(not(clockRunning(clock)), not(animationState.finished)), [
        cond(
          or(shouldReset, not(shouldAnimate)),
          set(config.toValue, animatedStaticIndex),
          cond(
            shouldAnimateNext,
            set(config.toValue, add(animatedStaticIndex, 1)),
            set(config.toValue, sub(animatedStaticIndex, 1))
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
  ]);
};
