import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState} from 'react'
import {APP_URL} from '../config.js'
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null)

    const login = async (username, password) => {
        setIsLoading(true)
        const options = {
            method: 'POST',
            url: `${APP_URL}/api/login_check`,
            headers: {'Content-Type': 'application/json'},
            data: {username: username, password: password}
        };
        
        axios.request(options).then(function (response) {
            setUserToken(response.data.token)
            AsyncStorage.setItem('userToken', response.data.token)
        }).catch(function (error) {
            console.error(error.message)
        });
        setIsLoading(false)
    }

    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem('userToken')
        AsyncStorage.removeItem('userInfo')
        setIsLoading(false)
    }

    const register = async (name, email, password) => {
        if (!name || !email || !password) {
            console.log('Veuillez remplir tous les champs.');
            return;
        }
        setIsLoading(true)
        try{
            const response = await fetch(`${APP_URL}/api/register`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                }),
            });
            const data = await response.json()
            if (response.ok) {
                console.log('Inscription réussie !');
                const token = data.token
                setUserToken(token)
                AsyncStorage.setItem('userToken', token)
            } else {
                console.log(response)
            }
        } catch(e) {
            console.log('error' + e)
        }
        setIsLoading(false)
    }

    const isLoggedIn = async() => {
        try{
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem('userToken')
            let userInfo = await AsyncStorage.getItem('userInfo')
            setUserToken(userToken)
            setUserInfo(JSON.parse(userInfo))
            setIsLoading(false)
        } catch(e) {
            console.log('error : ' + e)
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{login, logout,register, isLoading, userToken, userInfo, setUserInfo}}>
            { children }
        </AuthContext.Provider>
    )
}