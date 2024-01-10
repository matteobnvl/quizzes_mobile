import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardScreen from '../screens/App/DashboardScreen';
import ProfilScreen from '../screens/App/ProfilScreen';
import QuizzScreen from '../screens/App/QuizzScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
    return (
      <Tab.Navigator screenOptions={{showLabel:false}}>
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ 
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({focused}) => (<Ionicons name={focused ? "ios-home" : "ios-home-outline"} color='black' size={25} />)
            
          }}
        />
        <Tab.Screen
          name="Quizz"
          component={QuizzScreen}
          options={{ 
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({focused}) => (<Ionicons name={focused ? "school" : "school-outline"} color='black' size={25} />)
          }}
        />
        <Tab.Screen
          name="Profil"
          component={ProfilScreen}
          options={{ 
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({focused}) => (<Ionicons name={focused ? "options" : "options-outline"} color='black' size={25} />)
          }}
        />
      </Tab.Navigator>
    );
  };
  