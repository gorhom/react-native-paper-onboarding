import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PaperOnboarding, {
  PaperOnboardingItemType,
} from '@gorhom/paper-onboarding';
import { useSafeArea } from 'react-native-safe-area-context';
import KeySVG from '../svg/key';
import WalletSVG from '../svg/wallet';
import ShoppingCartSVG from '../svg/shopping-cart';

const data: PaperOnboardingItemType[] = [
  {
    title: 'Hotels',
    description: 'All hotels and hostels are sorted by hospitality rating',
    color: '#698FB8',
    icon: KeySVG,
  },
  {
    title: 'Banks',
    description: 'We carefully verify all banks before add them into the app',
    color: '#6CB2B8',
    icon: WalletSVG,
  },
  {
    title: 'Stores',
    description: 'All local stores are categorized for your convenience',
    color: '#9D8FBF',
    icon: ShoppingCartSVG,
  },
];

const WithoutImage = () => {
  // hooks
  const { goBack } = useNavigation();
  const insets = useSafeArea();

  // callbacks
  const handleOnClosePress = useCallback(() => goBack(), [goBack]);

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
        onCloseButtonPress={handleOnClosePress}
      />
    </>
  );
};

export default WithoutImage;
