import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
      <Stack>
        <Stack.Screen name="home" options={{ title: 'Home' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
  );
}
