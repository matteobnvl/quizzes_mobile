import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CardQuizz = ({ name, id }) => {

    const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.card} onPress={() => {navigation.navigate('Quizz page', {id, name})}}>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // Pour l'ombre sur Android
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

export default CardQuizz;
