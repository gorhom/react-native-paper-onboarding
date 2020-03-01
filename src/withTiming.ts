import Animated, { Easing } from 'react-native-reanimated';
import { State } from 'react-native-gesture-handler';
import { clamp, dec, inc } from 'react-native-redash';

const {
  Clock,
  Value,
  add,
  block,
  cond,
  eq,
  set,
  stopClock,
  and,
  not,
  clockRunning,
  startClock,
  neq,
  lessThan,
  greaterOrEq,
  greaterThan,
  interpolate,
  abs,
  timing,
} = Animated;

interface WithDecayParams {
  value: Animated.Adaptable<number>;
  velocity: Animated.Adaptable<number>;
  state: Animated.Value<State>;
  offset?: Animated.Value<number>;
  deceleration?: number;
  size: number;
  screenWidth: number;
}

export const withTiming = (props: WithDecayParams) => {
  const { value, velocity, state, size, screenWidth } = props;

  const clock = new Clock();

  const config = {
    toValue: new Value(0),
    duration: 500,
    easing: Easing.out(Easing.exp),
  };

  const animationState = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
  };

  const index = new Value(0);

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

  const isDecayInterrupted = and(eq(state, State.BEGAN), clockRunning(clock));
  const finishDecay = [
    stopClock(clock),
    cond(
      and(
        greaterThan(abs(animationState.position), 0.5),
        greaterOrEq(index, 0)
      ),
      cond(greaterThan(animationState.position, 0), inc(index), dec(index))
    ),
    set(animationState.position, 0),
    set(animationState.finished, 0),
    set(animationState.frameTime, 0),
    set(animationState.time, 0),
  ];

  return block([
    cond(isDecayInterrupted, finishDecay),
    cond(neq(state, State.END), [
      set(animationState.finished, 0),
      cond(
        and(
          not(and(eq(index, 0), lessThan(valueClamp, 0))),
          not(and(eq(index, size - 1), greaterThan(valueClamp, 0)))
        ),
        set(animationState.position, valueClamp),
        set(animationState.position, 0)
      ),
    ]),
    cond(eq(state, State.END), [
      cond(and(not(clockRunning(clock)), not(animationState.finished)), [
        cond(
          greaterThan(abs(add(animationState.position, velocityClamp)), 0.5),
          cond(
            greaterThan(add(animationState.position, velocityClamp), 0),
            // @ts-ignore
            set(config.toValue, 1),
            // @ts-ignore
            set(config.toValue, -1)
          ),
          // @ts-ignore
          set(config.toValue, 0)
        ),
        set(animationState.finished, 0),
        set(animationState.frameTime, 0),
        set(animationState.time, 0),
        startClock(clock),
      ]),
      timing(clock, animationState, config),
      cond(animationState.finished, finishDecay),
    ]),
    clamp(add(animationState.position, index), 0, size - 1),
  ]);
};
