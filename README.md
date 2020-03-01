# Paper Onboarding

Paper Onboarding is a material design UI slider for `React Native` inspired by [Ramotion Paper Onboarding](https://github.com/Ramotion/paper-onboarding).

![Alt text](preview.gif 'Preview')

## Installation

```sh
yarn add react-native-paper-onboarding
# or
npm install react-native-paper-onboarding
```

## Usage

```ts
import PaperOnboarding, {PaperOnboardingItemType} from "react-native-paper-onboarding";

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
| safeInsets           | No       | {top: 50, bottom: 50, left: 50, right: 50} | Safe area insets usually come from `react-native-safe-area-context`. |
| indicatorSize        | No       | 40                                         | Indicator width and height.                                          |
| indicatorColor       | No       | white                                      | Indicator border and fill color.                                     |
| titleStyle           | No       |                                            | Text style to override `all` page/slide title default style.         |
| descriptionStyle     | No       |                                            | Text style to override `all` page/slide description default style.   |
| clostButtonTextStyle | No       |                                            | Text style to override close button text default style.              |
| closeButtonText      | No       | close                                      | Text to be set in close button.                                      |
| onCloseButtonPress   | YES      |                                            | Callback when user press on close button.                            |

#### PaperOnboardingItemType

| name             | required | default | description                                                  |
| ---------------- | -------- | ------- | ------------------------------------------------------------ |
| image            | No       |         | Image/component to be add the slide/page.                    |
| icon             | No       |         | Image/component to be add the slide/page indicator.          |
| color            | Yes      |         | Background color for the slide/page.                         |
| title            | Yes      |         | Title for the slide/page.                                    |
| description      | Yes      |         | Description for the slide/page.                              |
| titleStyle       | No       |         | Text style to override page/slide title default style.       |
| descriptionStyle | No       |         | Text style to override page/slide description default style. |


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
