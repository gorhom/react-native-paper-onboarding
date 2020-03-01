import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {},
  border: {
    ...StyleSheet.absoluteFillObject,
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ scale: 1.1 }],
  },
  iconContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
