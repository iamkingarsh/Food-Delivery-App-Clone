import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestrauntScreen from './screens/RestrauntScreen';
import { Provider } from 'react-redux';
import { store } from './store';
import BasketScreen from './screens/BasketScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import AllergyScreen from './screens/AllergyScreen';
import OrderAccepted from './screens/OrderAccepted';
import WaitingForRequest from './screens/WaitingForRequest';
import RequestAccepted from './screens/RequestAccepted';
import { AppLoading } from 'expo';
import { useEffect } from 'react';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import OrderDetailsScreen from './screens/OrderDetailsScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }



  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restraunt" component={RestrauntScreen} />
          <Stack.Screen name="Basket" component={BasketScreen}
            options={{ presentation: 'modal', headerShown: false }}
          />
          <Stack.Screen name='PreparingOrder' component={PreparingOrderScreen}
            options={{ presentation: 'fullScreenModal', headerShown: false }}
          />
          <Stack.Screen name='Delivery' component={DeliveryScreen}
            options={{ presentation: 'fullScreenModal', headerShown: false }}
          />
          <Stack.Screen name='Allergy' component={AllergyScreen}
            options={{ presentation: 'modal', headerShown: false }}
          />
          <Stack.Screen name='OrderAccepted' component={OrderAccepted}
            options={{ presentation: 'modal', headerShown: false }}
          />
          <Stack.Screen name='WaitingRequest' component={WaitingForRequest}
            options={{ presentation: 'modal', headerShown: false }}
          />
          <Stack.Screen name='RequestAccepted' component={RequestAccepted}
            options={{ presentation: 'modal', headerShown: false }}
          />
          <Stack.Screen name='OrderDetails' component={OrderDetailsScreen}
            options={{ presentation: 'modal', headerShown: false }}
          />

        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}


