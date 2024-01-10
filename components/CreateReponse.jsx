import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { APP_URL } from "../config";

export default function CreateReponse() {
    const route = useRoute()
    const navigation = useNavigation()
    const {userToken} = useContext(AuthContext)
    const [reponse, setReponse] = useState()
    const [isCorrect, setIsCorrect] = useState(false)
    const id = route.params.id

    const handleSubmit = () => {
        const options = {
            method: 'POST',
            url: `${APP_URL}/api/reponses`,
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            },
            data: {texte: reponse, juste: isCorrect, question: `api/questions/${id}`}
        };
        
        axios.request(options).then(function (response) {
            navigation.goBack()
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <View>
            <Text>Ajouter une réponse</Text>
            <View>
                <TextInput
                    value={reponse}
                    onChangeText={text => setReponse(text)}
                    placeholder="Votre réponse"
                    style={styles.input}
                />
                <Button title={isCorrect ? 'Réponse correcte' : 'réponse fausse'}
                    onPress={() => setIsCorrect(!isCorrect)}
                />
                <Button title="Créer question" onPress={handleSubmit} />
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