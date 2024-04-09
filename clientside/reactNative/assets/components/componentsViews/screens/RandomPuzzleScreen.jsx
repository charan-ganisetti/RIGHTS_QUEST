import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as questions from "../QuizExam/questions";

const RandomPuzzleScreen = (props) => {
    const gamepage = props.route.params.data;
    const level = props.route.params.level;
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const level1 = ["RightToEquality", "Rightagainstdiscrimination"];
    const level2 = ["RightToFreedomOfSpeechAndExpresstion", "RightToEducation"];
    const level3 = ["RightAgainstChildLabor", "RightToIdentity"];
    const level4 = ["RightToBeProtectedFromTrafficking", "RightToLifeAndPersonalLiberty"];
    const level5 = ["RightToBeProtectedAgainstAbuse", "ProhibitionOfChildMarriages", "ProtectionFromSexualOffences"];

    useEffect(() => {
        const randomQuestionIndex = Math.floor(Math.random() * 10);
        let selectedLevel;
        switch (level) {
            case "level1":
                selectedLevel = level1;
                break;
            case "level2":
                selectedLevel = level2;
                break;
            case "level3":
                selectedLevel = level3;
                break;
            case "level4":
                selectedLevel = level4;
                break;
            case "level5":
                selectedLevel = level5;
                break;
            default:
                selectedLevel = level1;
        }
        const number = Math.floor(Math.random() * 2);
        const levelselection = selectedLevel[number];
        const questionlist = questions[levelselection];
        setSelectedQuestion(questionlist[randomQuestionIndex]);
    }, []);

    const handleOptionSelect = (selectedOptionIndex) => {
        setSelectedOption(selectedOptionIndex);
    };

    const handleSubmit = () => {
        // setcount(count+1);
        // if(count==3){

        // }
        if (selectedQuestion.correctIndex === selectedOption) {
            Alert.alert(
                'Correct Answer!',
                'You have selected the correct answer.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            props.navigation.navigate(gamepage);
                        },
                    },
                ],
                { cancelable: false }
            );
        } else {
            console.log('Incorrect option selected');
            Alert.alert(
                'Wrong Answer!',
                'Incorrect option selected.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            props.navigation.navigate("Quiz");
                        },
                    },
                ],
                { cancelable: false }
            );
        }
    };

    return (
        <View style={styles.container}>
            {selectedQuestion && (
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{selectedQuestion.question}</Text>
                    {selectedQuestion.options.map((option, index) => (
                        <Button
                            key={index}
                            title={option}
                            onPress={() => handleOptionSelect(index)}
                            color={selectedOption === index ? '#F4EAE0' : '#B0DBD7'}
                            style={styles.optionButton}
                        />
                    ))}
                </View>
            )}
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4EAE0',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    questionContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    questionText: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
    optionButton: {
        marginBottom: 10,
        marginTop: 5,
        color: 'black', // Change option text color to black
    },
});

export default RandomPuzzleScreen;
