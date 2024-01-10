import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { APP_URL } from "../config";

export default function PutQuestions() {
    const navigation = useNavigation()
    const route = useRoute()
    const id = route.params.id
    const [question, setQuestion] = useState(route.params.question)
    const {userToken} = useContext(AuthContext)

    const changeQuestion = () => {
        const options = {
            method: 'PUT',
            url: `${APP_URL}/api/questions/${id}`,
            headers: {
                Authorization: `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            },
            data: {question: question}
        };
        
        axios.request(options).then(function (response) {
            navigation.goBack()
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modifier question</Text>
            <View>
                <TextInput
                    value={question}
                    onChangeText={text => setQuestion(text)}
                    style={styles.input}
                />
                <Button title="modifier" onPress={changeQuestion} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    title:{
        fontSize: 25
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