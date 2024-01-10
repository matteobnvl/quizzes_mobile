import { useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

export default function ProfilScreen({navigation}) {
  const {logout} = useContext(AuthContext)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 15, paddingVertical: 20}}>
          <View>
            <Text style={styles.title}>
              Mon profil
            </Text>
          </View>
          <View style={styles.container}>
            <TouchableOpacity style={styles.box} onPress={() => {navigation.navigate('Information Personnel')}}>
              <Text style={styles.boxTitle}>Informations personnelles</Text>
            </TouchableOpacity>

            <View style={styles.box}>
              <Text style={styles.boxTitle}>Paramètres</Text>
            </View>

            <TouchableOpacity style={styles.box} onPress={() => {logout()}}>
              <Text style={styles.boxTitle}>Déconnexion</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 20
  },
  box: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 25
  }
});