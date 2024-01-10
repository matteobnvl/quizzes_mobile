import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import React, {useContext, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';
import InputField from '../../components/InputField';

export default function LoginScreens({ navigation }) {
  const {login} = useContext(AuthContext)

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>

          <View>
            <Text 
              style={{
              fontSize: 28,
              fontWeight: '500',
              color: '#fff',
              marginBottom: 30,
            }}>
              Login
            </Text>

            <View>
              <InputField 
                label={'Email'}
                keyboardType="email-address"
                value={email}
                onChangeText={text => setEmail(text)}
                />
              <InputField 
                label={'Password'}
                inputType="password"
                value={password}
                onChangeText={text => setPassword(text)}
                />
              <Button title='Se connecter' onPress={() => {login(email, password)}} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 30,
              }}>
                <Text>Toujours pas inscrit ?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={{color: '#AD40AF', fontWeight: '700'}}> Register</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});