import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 34,
  },
  imageContainer: {
    overflow: 'hidden',
    marginBottom: 64,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 36,
    marginBottom: 16,
  },
  description: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 18,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
});
