import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const CardQuizzMake = ({ question, answers, id, onAnswersUpdate }) => {
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const handleAnswerToggle = (answerId) => {
        let updatedSelectedAnswers;

        if (selectedAnswers.includes(answerId)) {
            updatedSelectedAnswers = selectedAnswers.filter(id => id !== answerId);
        } else {
            updatedSelectedAnswers = [...selectedAnswers, answerId];
        }

        

        setSelectedAnswers(updatedSelectedAnswers);
        
        // Inform the parent of the update
        onAnswersUpdate(id, updatedSelectedAnswers);
    }

    return (
        <View style={styles.card}>
            <Text style={styles.question}>{question}</Text>
            
            <View style={styles.container}>
                {answers.map((answer, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.answerContainer(selectedAnswers.includes(answer.id))}
                        onPress={() => handleAnswerToggle(answer.id)}
                    >
                        <Text 
                            style={[
                                styles.answer, 
                                selectedAnswers.includes(answer.id) ? styles.selected : {}
                            ]}
                        >
                            {answer.texte}
                        </Text>
                        <Ionicons 
                            name={selectedAnswers.includes(answer.id) ? "checkbox" : "square-outline"} 
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
        elevation: 3, // pour Android
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
        flex: 1,  // Assurez-vous que le texte prend tout l'espace disponible
        color: '#555',
    },
    icon: {
        marginLeft: 10,
    },
    answerContainer: (isSelected) => ({
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: isSelected ? '#666' : '#ddd', // Change ici
        marginBottom: 8,
    }),
});


export default CardQuizzMake;
