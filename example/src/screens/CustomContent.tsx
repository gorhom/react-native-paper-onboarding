import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PaperOnboarding, {
  PaperOnboardingItemType,
} from '@gorhom/paper-onboarding';
import { useSafeArea } from 'react-native-safe-area-context';
import CustomView from '../components/CustomView';

const data: PaperOnboardingItemType[] = [
  {
    content: CustomView,
    color: '#000',
  },
  {
    content: CustomView,
    color: '#666',
  },
  {
    content: CustomView,
    color: '#000',
  },
];

const CustomContentScreen = () => {
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
        indicatorSize={20}
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

export default CustomContentScreen;
