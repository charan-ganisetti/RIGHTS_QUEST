import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Certificate from '../Profile/certificate';
import CertificateGenerator from '../Profile/CertificateGenerator';
import NavBar from "../../NavBar/NavBar";
import url from "../backendurl";
import axios from 'axios';
import LottieView from "lottie-react-native";


const ProfileScreen = () => {
    const [userData, setUserData] = useState(null);
    const [name, setName] = useState('*****');
    const navigation = useNavigation();

    // Function to fetch user data from AsyncStorage
    const getUserData = async () => {
        try {
            const storedUserData = await AsyncStorage.getItem('userData');
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        getUserData(); // Fetch user data when the component mounts
    }, []);

    // Function to fetch user status
    const getUserStatus = async () => {
        try {
            if (userData?.email) {
                const response = await axios.get(`${url}status`, {
                    params: {
                        email: userData.email,
                        level: 'level5'
                    }
                });
                if (response.data.complete) {
                    setName(userData.name);
                    console.log(response.data.complete);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserStatus(); // Fetch user status when userData is updated
    }, [userData]);

    // Function to handle logout
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userData'); // Remove userData from AsyncStorage
            setUserData(null); // Clear the userData state
            navigation.navigate('Login'); // Navigate to Login screen
        } catch (error) {
            console.error('Error removing user data:', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Certificate components */}

            <View style={styles.rankingAnimation}>
                <LottieView style={{ flex: 1 }} source={require("../../Animations/ranking.json")} autoPlay loop />
            </View>
            <View style={styles.certificateContainer}>
                <Certificate recipientName={name} />
            </View>

            {/* Generate Certificate button */}
            <View style={styles.buttonContainer}>
                <CertificateGenerator recipientName={name} />
            </View>

            {/* Logout button */}
            <Button title="Logout" onPress={handleLogout} />

            {/* Navbar */}
            <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4EAE0'
    },
    certificateContainer: {
        marginBottom: 20 // Add marginBottom for spacing
    },
    buttonContainer: {
        marginBottom: 10 // Add marginBottom for spacing
    },
    rankingAnimation: {
        marginTop: 0,
        height: 200,
        aspectRatio: 1
    }
});

export default ProfileScreen;