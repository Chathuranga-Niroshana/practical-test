import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css";

import { fetchUser } from '@/slices/authSlice';
import { AppDispatch, persistor, store, type RootState } from '@/store';
import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function AppNavigator() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isLoggedIn && !user) {
      dispatch(fetchUser());
    }
  }, [isLoggedIn, user, dispatch]);

  return (
    <>
      <StatusBar hidden />
      <Stack screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <Stack.Screen name="loginScreen" />
        )}
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="product/[id]" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}