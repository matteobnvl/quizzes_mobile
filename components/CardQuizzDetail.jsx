import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const CardQuizzDetail = ({ question, answers, id }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.card}>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('update question', {question, id})}>
                    <Text style={styles.question}>{question}</Text>
                    <Ionicons name="pencil-outline" color='black'/>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                {answers.map((answer, index) => (
                    <View key={index} style={styles.answerContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('update reponse', {reponse: answer.texte,correct: answer.correct, id: answer.id })}>
                            <Text 
                                style={[styles.answer, answer.correct ? styles.correct : styles.incorrect]}
                            >
                                {answer.texte}
                            </Text>
                            <Ionicons name="pencil-outline" color='black'/>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            <Button title='ajouter réponse' onPress={() => navigation.navigate('create reponse', {id})} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
        marginBottom: 10,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    answer: {
        fontSize: 16,
        marginBottom: 5,
    },
    correct: {
        color: 'green'
    },
    incorrect: {
        color: 'red'
    },
    answerState: {
        fontSize: 18
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5
    },

});

export default CardQuizzDetail;
