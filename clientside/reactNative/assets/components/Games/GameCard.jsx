import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import url from "././../componentsViews/backendurl";

const GameCard = (props) => {
    const navigation = useNavigation();

    const handlePlayButtonPress = async () => {
        try {
            if (props.prevlevel !== '') {
                const prevresponse = await axios.get(url + 'status', {
                    params: {
                        email: userData.email,
                        level: props.prevlevel
                    }
                });

                if (!prevresponse.data.complete) {
                    Alert.alert(
                        'Incomplete Previous Level',
                        `Please complete the ${props.prevlevel} level first.`,
                        [{ text: 'OK' }]
                    );
                    return; // Stop further execution
                }
            }

            const response = await axios.get(url + 'status', {
                params: {
                    email: userData.email,
                    level: props.level
                }
            });

            if (response.data.complete) {
                navigation.navigate('RandomPuzzle', { data: props.gamePage, level: props.level });
            } else {
                Alert.alert(
                    'Incomplete Quiz',
                    `Please complete the ${props.level} level in the rights quiz.`,
                    [{ text: 'OK' }]
                );
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error if needed
        }
    };
    const [userData, setUserData] = useState(null);

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

    return (
        <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
                <Image source={props.imageSource} style={styles.image} resizeMode="cover" />
            </View>
            <View style={styles.textContainer}>
                <Text>{props.gameName}</Text>
                <TouchableOpacity onPress={handlePlayButtonPress}>
                    <View style={styles.playButton}>
                        <Text style={styles.playButtonText}>Play</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#FAF6F0',
        borderRadius: 10
    },
    imageContainer: {
        flex: 2,
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#F4DFC8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '80%',
        height: '80%',
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAF6F0',
        paddingVertical: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderRadius: 10
    },
    playButton: {
        marginTop: 10,
        backgroundColor: '#F4DFC8',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
    },
    playButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default GameCard;
