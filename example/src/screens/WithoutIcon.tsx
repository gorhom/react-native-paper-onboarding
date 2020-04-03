import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
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

// @ts-ignore
export const WithoutIcon = ({ navigation }) => {
  const insets = useSafeArea();
  const handleOnClosePress = useCallback(() => navigation.popToTop(), [
    navigation,
  ]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <PaperOnboarding
        data={data}
        safeInsets={{
          top: insets?.top,
          bottom: insets?.bottom,
          left: insets?.left,
          right: insets?.right,
        }}
        indicatorSize={25}
        closeButtonText="skip"
        onCloseButtonPress={handleOnClosePress}
      />
    </>
  );
};
