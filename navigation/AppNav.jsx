import React, {useContext} from "react";

import {NavigationContainer, DefaultTheme, DarkTheme,} from '@react-navigation/native';
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";
import { AuthContext } from "../context/AuthContext";
import { ActivityIndicator, View, useColorScheme } from "react-native";

export const AppNav = () => {

    const {isLoading, userToken} = useContext(AuthContext);
    const scheme = useColorScheme();

    if (isLoading) {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }

    return (
        <NavigationContainer>
            { userToken !== null ? <AppStack /> : <AuthStack /> }
        </NavigationContainer>
    )
}