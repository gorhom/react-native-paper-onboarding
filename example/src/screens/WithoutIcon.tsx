import React, { useCallback, useMemo } from 'react';
import { StatusBar } from 'react-native';
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
    color: '#698FB8',
    image: HotelSVG,
  },
  {
    title: 'Banks',
    description: 'We carefully verify all banks before add them into the app',
    color: '#6CB2B8',
    image: BankSVG,
  },
  {
    title: 'Stores',
    description: 'All local stores are categorized for your convenience',
    color: '#9D8FBF',
    image: StoreSVG,
  },
];

const WithoutIconScreen = () => {
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
      <StatusBar barStyle="light-content" />
      <PaperOnboarding
        data={data}
        safeInsets={{
          top: insets.top,
          bottom: insets.bottom,
          left: insets.left,
          right: insets.right,
        }}
        indicatorSize={25}
        closeButtonText="skip"
        onCloseButtonPress={handleOnClosePress}
      />
    </>
  );
};

export default WithoutIconScreen;
