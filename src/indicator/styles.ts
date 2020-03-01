import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    borderColor: 'white',
    overflow: 'hidden',
  },
  border: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 8,
    borderColor: 'white',
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    transform: [{ scale: 1.1 }],
  },
  iconContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
