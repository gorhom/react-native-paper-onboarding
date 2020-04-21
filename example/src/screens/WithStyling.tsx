import React, { useCallback, useMemo } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PaperOnboarding, {
  PaperOnboardingItemType,
} from '@gorhom/paper-onboarding';
import { useSafeArea } from 'react-native-safe-area-context';
import BankSVG from '../svg/bank';
import HotelSVG from '../svg/hotel';
import StoreSVG from '../svg/store';

const data: PaperOnboardingItemType[] = [
  {
    title: 'Hotels',
    description: 'All hotels and hostels are sorted by hospitality rating',
    color: '#fff',
    image: <HotelSVG color={'#F7B500'} />,
  },
  {
    title: 'Banks',
    titleStyle: {
      color: '#b21f66',
    },
    description: 'We carefully verify all banks before add them into the app',
    color: '#ccc',
    image: <BankSVG color={'#b21f66'} />,
  },
  {
    title: 'Stores',
    titleStyle: {
      color: '#dc2f2f',
    },
    description: 'All local stores are categorized for your convenience',
    color: '#9E9E9E',
    image: <StoreSVG color={'#dc2f2f'} />,
  },
];

const WithStylingScreen = () => {
  // hooks
  const { goBack } = useNavigation();
  const safeInsets = useSafeArea();

  // variable
  const insets = useMemo(
    () => ({
      top: Math.max(safeInsets.top, 20),
      bottom: Math.max(safeInsets.bottom, 20),
      left: Math.max(safeInsets.left, 20),
      right: Math.max(safeInsets.right, 20),
    }),
    [safeInsets]
  );

  // callbacks
  const handleOnClosePress = useCallback(() => goBack(), [goBack]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <PaperOnboarding
        data={data}
        titleStyle={styles.title}
        descriptionStyle={styles.description}
        clostButtonTextStyle={styles.closeTextStyle}
        indicatorColor={'black'}
        indicatorSize={24}
        safeInsets={{
          top: insets.top,
          bottom: insets.bottom,
          left: insets.left,
          right: insets.right,
        }}
        onCloseButtonPress={handleOnClosePress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 46,
    fontWeight: '800',
    color: '#F7B500',
  },
  description: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000',
  },
  closeTextStyle: {
    color: '#000',
    fontWeight: '600',
  },
});

export default WithStylingScreen;
