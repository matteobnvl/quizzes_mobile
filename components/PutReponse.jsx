import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Text, Button } from "react-native";
import { View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { APP_URL } from "../config";

export default function PutReponse() {
    const route = useRoute()
    const navigation = useNavigation()
    const {userToken} = useContext(AuthContext)
    const id = route.params.id
    const [reponse, setReponse] = useState(route.params.reponse)
    const [isCorrect, setIsCorrect] = useState(route.params.correct)

    const handleSubmit = () => {
        const options = {
            method: 'PUT',
            url: `${APP_URL}/api/reponses/${id}`,
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            },
            data: {texte: reponse, juste: isCorrect}
        };
        
        axios.request(options).then(function (response) {
            navigation.goBack()
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <View>
            <Text>Modifier réponse</Text>
            <View>
                <TextInput
                    value={reponse}
                    onChangeText={text => setReponse(text)}
                    style={styles.input}
                />
                <Button title={isCorrect ? 'Réponse correcte' : 'réponse fausse'}
                    onPress={() => setIsCorrect(!isCorrect)}
                />
                <Button title="Modifier question" onPress={handleSubmit} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10
    },
})