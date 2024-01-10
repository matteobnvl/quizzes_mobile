import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { Button } from 'react-native';
import InputField from '../../components/InputField';


const RegisterScreen = ({navigation}) => {
  const {register} = useContext(AuthContext)

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#ffffff',
            marginBottom: 30,
          }}>
          Register
        </Text>
        <View>
          <InputField 
            label={'Name'}
            value={name}
            onChangeText={text => setName(text)}
            />
            <InputField 
            label={'Email'}
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
            />
            <InputField 
            label={'Password'}
            value={password}
            secureTextEntry
            inputType="password"
            onChangeText={text => setPassword(text)}
            />
            <Button title='Créer mon compte' onPress={ () => {register(name, email, password)} } />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text style={{color: '#fff'}}>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;