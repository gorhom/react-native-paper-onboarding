import * as React from 'react';
import { StatusBar } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaConsumer,
} from 'react-native-safe-area-context';
import PaperOnboarding, {
  PaperOnboardingItemType,
} from 'react-native-paper-onboarding';
import BankSVG from './svg/bank';
import HotelSVG from './svg/hotel';
import KeySVG from './svg/key';
import StoreSVG from './svg/store';
import WalletSVG from './svg/wallet';
import ShoppingCartSVG from './svg/shopping-cart';

const data: PaperOnboardingItemType[] = [
  {
    title: 'Hotels',
    description: 'All hotels and hostels are sorted by hospitality rating',
    color: '#698FB8',
    image: HotelSVG,
    icon: KeySVG,
  },
  {
    title: 'Banks',
    description: 'We carefully verify all banks before add them into the app',
    color: '#6CB2B8',
    image: BankSVG,
    icon: WalletSVG,
  },
  {
    title: 'Stores',
    description: 'All local stores are categorized for your convenience',
    color: '#9D8FBF',
    image: StoreSVG,
    icon: ShoppingCartSVG,
  },
];

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaConsumer>
        {insets => (
          <PaperOnboarding
            data={data}
            safeInsets={{
              top: insets?.top,
              bottom: insets?.bottom,
              left: insets?.left,
              right: insets?.right,
            }}
            onCloseButtonPress={() => console.log('close')}
          />
        )}
      </SafeAreaConsumer>
      <StatusBar barStyle="light-content" />
    </SafeAreaProvider>
  );
}
