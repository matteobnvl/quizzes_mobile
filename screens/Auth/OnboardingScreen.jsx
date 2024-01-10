import React from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OnboardingScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{marginTop: 20}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            color: '#ffffff',
          }}>
          GAMEON
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#AD40AF',
          padding: 20,
          width: '90%',
          borderRadius: 10,
          marginBottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => navigation.navigate('Register')}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          M'inscrire
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#AD4',
          padding: 20,
          width: '90%',
          borderRadius: 10,
          marginBottom: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Me connecter
        </Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnboardingScreen;