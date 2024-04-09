import React, { useState, useEffect } from 'react';
import axios from 'axios';
import url from '../backendurl';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as questions from "./questions";

const Quiz = (props) => {
    const quizQuestions = questions[props.quizName];
    const [selectedAnswers, setSelectedAnswers] = useState(Array(quizQuestions.length).fill(null));
    const [quizSubmitted, setQuizSubmitted] = useState(false);


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



    const handleOptionPress = (questionIndex, optionIndex) => {
        if (!quizSubmitted && selectedAnswers[questionIndex] === null) {
            const updatedAnswers = [...selectedAnswers];
            updatedAnswers[questionIndex] = optionIndex;
            setSelectedAnswers(updatedAnswers);
        }
    };

    const handleSubmit = () => {
        setQuizSubmitted(true);
        // Calculate score and display an alert or navigate to the next screen
        const correctAnswers = quizQuestions.map((question) => question.correctIndex);
        const score = selectedAnswers.reduce((acc, selected, index) => {
            return acc + (correctAnswers[index] === selected ? 1 : 0);
        }, 0);

        const updatedscore = async () => {
            try {
                const response = await axios.patch(url + "updatescore", {
                    "email": userData.email,
                    "level": props.level,
                    "quizHeading": props.quizName,
                    "score": score
                    // email: userData.email,
                    // level: props.level,
                    // quizHeading: quizQuestions,
                    // score: `${score} / ${quizQuestions.length}`,
                });
                console.log("Score updated successfully:", response.data);
            } catch (error) {
                console.error("Error updating score:", error);
            }
        };

        Alert.alert(
            "Quiz is completed",
            `Your Score: ${score} / ${quizQuestions.length}`,
            [{ text: 'OK' }]
        );
        updatedscore();
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {quizQuestions.map((question, index) => (
                    <View key={index} style={styles.questionContainer}>
                        <Text style={styles.questionText}>{`Question ${index + 1}: ${question.question}`}</Text>
                        {question.options.map((option, optionIndex) => (
                            <TouchableOpacity
                                key={optionIndex}
                                onPress={() => handleOptionPress(index, optionIndex)}
                                style={[
                                    styles.optionButton,
                                    {
                                        backgroundColor: selectedAnswers[index] === optionIndex
                                            ? '#92C7CF' // Change the color to blue for selected option
                                            : quizSubmitted && optionIndex === question.correctIndex
                                                ? 'green' // Keep the green color for correct option after submitting
                                                : '#F4DFC8',
                                    },
                                ]}
                                disabled={quizSubmitted || selectedAnswers[index] !== null}
                            >
                                <Text style={styles.optionText}>{`${String.fromCharCode(65 + optionIndex)}. ${option}`}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
                <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit Quiz</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    questionContainer: {
        marginBottom: 20,
    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    optionButton: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    optionText: {
        fontSize: 14,
    },
    submitButton: {
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 40
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default Quiz;
