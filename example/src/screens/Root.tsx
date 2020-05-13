import React from 'react';
import Showcase from '@gorhom/showcase-template';
import { version, description } from '../../../package.json';
import { useNavigation } from '@react-navigation/native';

const examples = [
  {
    title: 'default',
    data: [
      {
        name: 'Horizontal Gesture',
        slug: 'HorizontalGesture',
      },
      {
        name: 'Vertical Gesture',
        slug: 'VerticalGesture',
      },
    ],
  },
  {
    title: 'Customisation',
    data: [
      {
        name: 'Without Image',
        slug: 'WithoutImage',
      },
      {
        name: 'Without Icon',
        slug: 'WithoutIcon',
      },
      {
        name: 'With Styling',
        slug: 'WithStyling',
      },
      {
        name: 'Custom Content',
        slug: 'CustomContent',
      },
    ],
  },
];

const RootScreen = () => {
  // hooks
  const { navigate } = useNavigation();

  // callbacks
  const handleOnExamplePress = (slug: string) => {
    navigate(slug);
  };

  // renders
  return (
    <Showcase
      theme="dark"
      name="Paper Onboarding"
      description={description}
      version={version}
      author={{
        username: '@gorhom',
        url: 'https://twitter.com/gorhom',
      }}
      data={examples}
      handleOnPress={handleOnExamplePress}
    />
  );
};

export default RootScreen;
