import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { Button, Platform, StyleSheet } from 'react-native';
import { Text, View, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from "axios";
import { APP_URL } from '../config';
import { AuthContext } from '../context/AuthContext';

export default function ModalScreen() {
    const {userToken} = useContext(AuthContext)
    const route = useRoute()
    const {id} = route.params
    const [name, setName] = useState(route.params.name)
    const navigation = useNavigation()

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const updateCategory = () => {
        const options = {
        method: 'PUT',
        url: `${APP_URL}/api/categories/${id}`,
        headers: {
            Authorization: `bearer ${userToken}`
        },
        data: {"name": name}
        };
        axios.request(options).then(function (response) {
            navigation.navigate('Matière', {id, name})
        }).catch(function (error) {
            console.error(error);
        });
    }
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.container}>
                <TextInput style={styles.input}
                    value={name}
                    onChangeText={text => setName(text)}
                    autoCapitalize="none"
                    />
                <Button title='modifier' onPress={updateCategory}/>
            </View>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'white'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
