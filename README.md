# Paper Onboarding [![npm](https://img.shields.io/npm/v/@gorhom/paper-onboarding)](https://www.npmjs.com/package/@gorhom/paper-onboarding)

Paper Onboarding is a material design UI slider for `React Native` inspired by [Ramotion Paper Onboarding](https://github.com/Ramotion/paper-onboarding).

<p align="center">
<img src="./preview.gif" width="600" height="450">
</p>

## Installation

```sh
yarn add @gorhom/paper-onboarding
# or
npm install @gorhom/paper-onboarding
```

Also, you need to install [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated), [react-native-gesture-handler](https://github.com/software-mansion/react-native-reanimated) & [react-native-svg](https://github.com/react-native-community/react-native-svg)

## Usage

```ts
import PaperOnboarding, {PaperOnboardingItemType} from "@gorhom/paper-onboarding";

const data: PaperOnboardingItemType[] = [
  {
    title: 'Hotels',
    description: 'All hotels and hostels are sorted by hospitality rating',
    color: '#698FB8',
    image: /* IMAGE COMPONENT */,
    icon: /* ICON COMPONENT */,
  },
  {
    title: 'Banks',
    description: 'We carefully verify all banks before add them into the app',
    color: '#6CB2B8',
    image: /* IMAGE COMPONENT */,
    icon: /* ICON COMPONENT */,
  },
  {
    title: 'Stores',
    description: 'All local stores are categorized for your convenience',
    color: '#9D8FBF',
    image: /* IMAGE COMPONENT */,
    icon: /* ICON COMPONENT */,
  },
];

const Screen = () => {
  const handleOnClosePress = () => console.log('navigate to other screen')
  return (
    <PaperOnboarding
      data={data}
      onCloseButtonPress={handleOnClosePress}
    />
  )
}
```

## Props

| name                 | required | default                                    | description                                                          |
| -------------------- | -------- | ------------------------------------------ | -------------------------------------------------------------------- |
| data                 | YES      |                                            | Array of pages/slides `PaperOnboardingItemType` to present.          |
| safeInsets           | NO       | {top: 50, bottom: 50, left: 50, right: 50} | Safe area insets usually come from `react-native-safe-area-context`. |
| direction            | NO       | horizontal                                 | Pan gusture direction. `horizontal` or `vertical`                    |
| indicatorSize        | NO       | 40                                         | Indicator width and height.                                          |
| indicatorColor       | NO       | white                                      | Indicator border and fill color.                                     |
| titleStyle           | NO       |                                            | Text style to override `all` page/slide title default style.         |
| descriptionStyle     | NO       |                                            | Text style to override `all` page/slide description default style.   |
| clostButtonTextStyle | NO       |                                            | Text style to override close button text default style.              |
| closeButtonText      | NO       | close                                      | Text to be set in close button.                                      |
| onCloseButtonPress   | YES      |                                            | Callback when user press on close button.                            |

#### PaperOnboardingItemType

| name             | required | default | description                                                  |
| ---------------- | -------- | ------- | ------------------------------------------------------------ |
| image            | NO       |         | Image/component to be add the slide/page.                    |
| icon             | NO       |         | Image/component to be add the slide/page indicator.          |
| color            | YES      |         | Background color for the slide/page.                         |
| title            | YES      |         | Title for the slide/page.                                    |
| description      | YES      |         | Description for the slide/page.                              |
| titleStyle       | NO       |         | Text style to override page/slide title default style.       |
| descriptionStyle | NO       |         | Text style to override page/slide description default style. |

## Built With ❤️

- [react-native-gesture-handler](https://github.com/software-mansion/react-native-reanimated)
- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)
- [react-native-redash](https://github.com/wcandillon/react-native-redash)
- [react-native-svg](https://github.com/react-native-community/react-native-svg)
- [@react-native-community/bob](https://github.com/react-native-community/bob)

## Author

- [Mo Gorhom](https://twitter.com/gorhom)

## License

MIT
