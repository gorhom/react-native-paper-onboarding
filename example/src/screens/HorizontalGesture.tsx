import React, { useCallback, useMemo } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PaperOnboarding, {
  PaperOnboardingItemType,
} from '@gorhom/paper-onboarding';
import { useSafeArea } from 'react-native-safe-area-context';
import BankSVG from '../svg/bank';
import HotelSVG from '../svg/hotel';
import KeySVG from '../svg/key';
import StoreSVG from '../svg/store';
import WalletSVG from '../svg/wallet';
import ShoppingCartSVG from '../svg/shopping-cart';

const data: PaperOnboardingItemType[] = [
  {
    title: 'Hotels',
    description: 'All hotels and hostels are sorted by hospitality rating',
    backgroundColor: '#698FB8',
    image: HotelSVG,
    icon: ({ size }) => <KeySVG size={size} color={'#698FB8'} />,
  },
  {
    title: 'Banks',
    description: 'We carefully verify all banks before add them into the app',
    backgroundColor: '#6CB2B8',
    image: BankSVG,
    icon: ({ size }) => <WalletSVG size={size} color={'#6CB2B8'} />,
  },
  {
    title: 'Stores',
    description: 'All local stores are categorized for your convenience',
    backgroundColor: '#9D8FBF',
    image: StoreSVG,
    icon: ({ size }) => <ShoppingCartSVG size={size} color={'#9D8FBF'} />,
  },
];

const HorizontalGesture = () => {
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
        onCloseButtonPress={handleOnClosePress}
      />
    </>
  );
};

export default HorizontalGesture;
