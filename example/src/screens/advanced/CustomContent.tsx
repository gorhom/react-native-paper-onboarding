import React, { useCallback, useMemo, useRef } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PaperOnboarding, {
  PaperOnboardingItemType,
} from '@gorhom/paper-onboarding';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomView from '../../components/CustomView';
import CustomButton from '../../components/CustomButton';

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
  const safeInsets = useSafeAreaInsets();

  // refs
  const goBackRef = useRef<any>(null);
  goBackRef.current = goBack;

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
  const handleOnIndexChange = useCallback(_index => {
    console.log(`Index changed: ${_index}`);
  }, []);
  const handleOnClosePress = useCallback(() => goBackRef.current(), []);

  // renders
  const renderCloseButton = useCallback(
    () => <CustomButton text={'X'} onPress={handleOnClosePress} />,
    [handleOnClosePress]
  );
  return (
    <>
      <StatusBar barStyle="light-content" />
      <PaperOnboarding
        onIndexChange={handleOnIndexChange}
        data={data}
        indicatorSize={24}
        indicatorBackgroundColor="#333"
        indicatorBorderColor="#333"
        safeInsets={insets}
        closeButton={renderCloseButton}
      />
    </>
  );
};

export default CustomContentScreen;
