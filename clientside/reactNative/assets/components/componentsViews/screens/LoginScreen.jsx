import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, SafeAreaView, StatusBar, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EvilIcons } from '@expo/vector-icons';

import axios from 'axios';
import url from '../backendurl';

const LoginScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Clear password field when screen becomes visible
            setPassword('');
        });

        return unsubscribe;
    }, [navigation]);

    const handleLogin = async () => {
        if (!email || !password || !name) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post(url + '/login', {
                name,
                email,
                password
            });

            if (response.status === 200) {
                await AsyncStorage.setItem('userData', JSON.stringify({ "email": email, "name": name }));
                navigation.navigate('Home');
            } else if (response.status === 403) {
                setErrorMessage('Wrong password.');
            } else {
                setErrorMessage('An error occurred.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
            <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../images/logImage.png')} style={styles.logo} />
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <EvilIcons name="user" size={35} color="black" />
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <EvilIcons name="envelope" size={35} color="black" />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <EvilIcons name="lock" size={35} color="black" />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                        // secureTextEntry={true} // Use secureTextEntry for password
                        />
                    </View>
                    {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                    <Button title="Login" onPress={handleLogin} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4EAE0',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 300,
        height: 250,
    },
    formContainer: {
        width: '80%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginScreen;
