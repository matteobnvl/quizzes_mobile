import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const CardQuizzVerify = ({ question, answers, id, answersUsers }) => {

    return (
        <View style={styles.card}>
            <Text style={styles.question}>{question}</Text>
            
            <View style={styles.container}>
                {answers.map((answer, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={[
                            styles.answerContainer,
                            (answer.correct && answersUsers.answerIds.includes(answer.id)) || answer.correct ? styles.correct : styles.incorrect
                        ]}
                    >
                        <Text 
                            style={[
                                styles.answer, 
                                (answer.correct && answersUsers.answerIds.includes(answer.id)) || answer.correct ? styles.correct : styles.incorrect
                            ]}
                        >
                            {answer.texte}
                        </Text>
                        <Ionicons 
                            name={answersUsers.answerIds.includes(answer.id) ? "checkbox" : "square-outline"}
                            color='black'
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    container: {
        marginTop: 10,
    },
    answerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 8,
    },
    answer: {
        fontSize: 16,
        flex: 1,
        color: '#555',
    },
    icon: {
        marginLeft: 10,
    },
    correct: {
        color: 'green',
        borderColor: 'green',
    },
    incorrect: {
        color: 'red',
    },
});


export default CardQuizzVerify;
