import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { APP_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';

export default function CreateQuestionScreen() {
    const route = useRoute()
    const id = route.params.id
    const [question, setQuestion] = useState({ id_quiz: id, question: '', reponse: [] });
    const [responseText, setResponseText] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const {userToken} = useContext(AuthContext)
    const navigation = useNavigation()

    const addResponse = () => {
        if (!responseText.trim()) {
            alert('Veuillez entrer un texte pour la réponse.');
            return;
        }
        setQuestion({
            ...question,
            reponse: [...question.reponse, { texte: responseText, correct: isCorrect }]
        });
        setResponseText('');
        setIsCorrect(false);
    };

    const handleSubmit = () => {
        if (!question.question.trim()) {
            alert('Veuillez entrer une question.');
            return;
        }
    
        if (question.reponse.length === 0) {
            alert('Veuillez ajouter au moins une réponse.');
            return;
        }
    
        const correctAnswers = question.reponse.filter(response => response.correct);
        if (correctAnswers.length === 0) {
            alert('Veuillez marquer au moins une réponse comme correcte.');
            return;
        }

        const options = {
            method: 'POST',
            url: `${APP_URL}/api/quiz/create-question`,
            headers: {
              Authorization: `Bearer ${userToken}`,
              'Content-Type': 'application/json'
            },
            data: question
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
          }).catch(function (error) {
            console.error(error);
          });
        navigation.goBack()
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.container}>
                <Text style={styles.title}>Créer une Question</Text>
                <TextInput
                    value={question.question}
                    onChangeText={text => setQuestion({ ...question, question: text })}
                    placeholder="Entrez votre question"
                    style={styles.input}
                />
                {question.reponse.map((response, index) => (
                    <Text key={index}>{response.texte} - {response.correct ? 'Correcte' : 'Incorrecte'}</Text>
                ))}
                <TextInput
                    value={responseText}
                    onChangeText={setResponseText}
                    placeholder="Ajoutez une réponse"
                    style={styles.input}
                />
                <Button
                    title={isCorrect ? "Réponse correcte" : "Réponse incorrecte"}
                    onPress={() => setIsCorrect(!isCorrect)}
                />
                <Button
                    title="Ajouter la réponse"
                    onPress={addResponse}
                />
                <Button
                    title="Soumettre la question"
                    onPress={handleSubmit}
                />
            </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    title: {
        fontSize: 24,
        marginBottom: 10
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10
    },
});
