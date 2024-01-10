import { useContext, useState } from "react"
import { Button, StyleSheet, TextInput, View, Text } from "react-native"
import { APP_URL } from "../config";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

export default function CreateQuizz () {
    const [name, setName] = useState()
    const navigation = useNavigation()
    const route = useRoute()
    const id = route.params.id
    const {userToken} = useContext(AuthContext)

    const create = () => {
        const options = {
            method: 'POST',
            url: `${APP_URL}/api/quizzes`,
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            },
            data: {name: name, category: `api/categories/${id}`}
        };

        axios.request(options).then(function (response) {
            navigation.navigate("Quizz détails", {id:response.data.id, name:response.data.name})
        }).catch(function (error) {
            console.error(error);
        });
    }
    return (
        <View style={styles.container}>
            <Text>Créer quizz</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={text => setName(text)}
            />
            <Button title="Créer" onPress={create} />
        </View>
    )
}

const styles  = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
})