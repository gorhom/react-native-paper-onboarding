import type { ShowcaseScreenType } from '@gorhom/showcase-template';

const screenOptions = {
  headerTransparent: true,
  headerTitle: '',
  headerTintColor: 'white',
};

export const screens = [
  {
    title: 'Basic',
    data: [
      {
        name: 'Horizontal',
        slug: 'basic/horizontal',
        getScreen: () => require('./basic/HorizontalGesture').default,
        screenOptions,
      },
      {
        name: 'Vertical',
        slug: 'basic/vertical',
        getScreen: () => require('./basic/VerticalGesture').default,
        screenOptions,
      },
    ] as ShowcaseScreenType[],
  },
  {
    title: 'Advanced',
    data: [
      {
        name: 'Without Image',
        slug: 'advanced/without-image',
        getScreen: () => require('./advanced/WithoutImage').default,
        screenOptions,
      },
      {
        name: 'Without Icon',
        slug: 'advanced/without-icon',
        getScreen: () => require('./advanced/WithoutIcon').default,
        screenOptions,
      },
      {
        name: 'With Styling',
        slug: 'advanced/with-styling',
        getScreen: () => require('./advanced/WithStyling').default,
        screenOptions,
      },
      {
        name: 'Custom Content',
        slug: 'advanced/custom-content',
        getScreen: () => require('./advanced/CustomContent').default,
        screenOptions,
      },
    ] as ShowcaseScreenType[],
  },
];
