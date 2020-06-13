import React, { useCallback, useMemo } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PaperOnboarding, {
  PaperOnboardingItemType,
} from '@gorhom/paper-onboarding';
import { useSafeArea } from 'react-native-safe-area-context';
import CustomView from '../components/CustomView';
import CustomButton from '../components/CustomButton';

const data: PaperOnboardingItemType[] = [
  {
    content: CustomView,
    backgroundColor: '#000',
  },
  {
    content: CustomView,
    backgroundColor: '#666',
    showCloseButton: true,
  },
  {
    content: CustomView,
    backgroundColor: '#000',
  },
  {
    content: CustomView,
    backgroundColor: '#666',
  },
];

const CustomContentScreen = () => {
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
        indicatorSize={24}
        indicatorBackgroundColor="#333"
        indicatorBorderColor="#333"
        safeInsets={{
          top: insets.top,
          bottom: insets.bottom,
          left: insets.left,
          right: insets.right,
        }}
        onCloseButtonPress={handleOnClosePress}
        closeButton={<CustomButton onPress={handleOnClosePress} />}
      />
    </>
  );
};

export default CustomContentScreen;
