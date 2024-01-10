import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";



export default function InfoPersonnelScreen() {
    const {userInfo, setUserInfo} = useContext(AuthContext)
    const navigation = useNavigation()
    const id = userInfo.id
    const name = userInfo.name
    const email = userInfo.email

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                style={{paddingHorizontal: 15, paddingVertical: 20}}>
                <View>
                    <Text style={styles.title}>
                    Mes informations
                    </Text>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.box}>
                        <Text>Nom</Text>
                        <Text style={styles.boxTitle}>{ name }</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.box}>
                        <Text>Email</Text>
                        <Text style={styles.boxTitle}>{ email }</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.box} onPress={() => {navigation.navigate('Modifier Information', {name, email, id})}}>
                        <Text style={styles.boxTitle}>modifier</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
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