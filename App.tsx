import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from 'expo-constants';
import { NativeEventSubscription, Platform } from 'react-native'
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import { createStore } from "redux";
import mainReducer from "./store/reducers/ServingTray";
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage';

//Connect to the redux store for menu information
const store = createStore(mainReducer);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

//Define remove for typescript
const remove: NativeEventSubscription = {
  remove: () => {},
};

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<NativeEventSubscription>(remove);
  const responseListener = useRef<NativeEventSubscription>(remove);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      //Not really using this rn, storing the token in local storage.
      setExpoPushToken(token)
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    );
  }
}

//This function is from the expo docs https://docs.expo.io/versions/latest/sdk/notifications/
//It asks the user for permission to send push notifications
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    AsyncStorage.setItem('@pushToken', JSON.stringify(token))
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}
