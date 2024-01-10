import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { APP_URL } from '../config';
import axios from 'axios';
import { TextInput, View, TouchableWithoutFeedback, KeyboardAvoidingView, StyleSheet, Button, Keyboard } from "react-native";


export default function CreateCategory() {
    const navigation = useNavigation()
    const {userToken, userInfo} = useContext(AuthContext)
    const [name, setName] = useState('')

    const createCategory = () => {
        const options = {
            method: 'POST',
            url: `${APP_URL}/api/categories`,
            headers: {
                Authorization: `bearer ${userToken}`
            },
            data: {"name": name, "user": `api/users/${userInfo.id}`}
        };
        axios.request(options).then(function (response) {
            navigation.goBack()
        }).catch(function (error) {
            console.error(error);
        });
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    
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
                <Button title='modifier' onPress={createCategory}/>
            </View>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    )
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