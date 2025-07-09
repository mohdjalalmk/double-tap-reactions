# react-native-double-tap-reaction

✨ A lightweight, customizable React Native wrapper to add double-tap emoji reactions with beautiful animations — just like Instagram ❤️.

![DoubleTapReaction Demo](https://raw.githubusercontent.com/mohdjalalmk/double-tap-reactions/main/demo/example.gif)

---

## 📦 Installation

Using npm:
```bash
npm install react-native-double-tap-reaction
```
Or using yarn:
```
yarn add react-native-double-tap-reaction\
```
## Usage
```
import { DoubleTapReaction } from 'react-native-double-tap-reaction';
import { Text, Image } from 'react-native';

export default function App() {
  return (
    <DoubleTapReaction
      type="fly"
      emojiComponent={<Text style={{ fontSize: 80 }}>❤️</Text>}
      onDoubleTap={() => console.log('Double tapped!')}
    >
      <Image
        source={{ uri: 'https://picsum.photos/400' }}
        style={{ width: 300, height: 300 }}
      />
    </DoubleTapReaction>
  );
}
```
## ✨ Props

| Prop                  | Type                        | Default   | Description                                                            |
|----------------------:|----------------------------:|---------:|---------------------------------------------------------------------:|
| `type`                | `"fade"` \| `"fly"`         | `"fade"`  | Animation style: simple fade+scale or fly-up                          |
| `emojiComponent`      | `ReactNode`                 | required  | Emoji, icon, or any React component to show on double tap             |
| `animationDuration`   | `number`                    | `700`     | Duration of the animation in milliseconds                             |
| `scaleToValue`        | `number`                    | `1.5`     | Final scale value for the animation                                   |
| `friction`            | `number`                    | `4`       | Spring friction                                                       |
| `flyDistance`         | `number`                    | `100`     | Pixels to fly up (used only when `type="fly"`)                        |
| `onDoubleTap`         | `() => void`                |           | Callback function when double tap detected (e.g., like API call)      |
| `emojiContainerStyle` | `ViewStyle` (optional)      |           | Custom style for positioning the animated emoji                       |

## 🪄 Demo
To see it in action, check the GIF above or clone this repo and run the example.
The example project is built with Expo, but the package works in any React Native project — including Expo, React Native CLI, and even React Native Web.
You can also add your own emoji / icon from react-native-vector-icons, expo/vector-icons, or even custom SVG.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/mohdjalalmk/double-tap-reactions/blob/main/LICENSE) file for details.