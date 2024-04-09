import React from "react";
import { View, StyleSheet } from "react-native";
import CrosswordGrid from "./CrosswordGrid";

const CrossWord = () => {
    // levels can be added here in the crosswordData
    const crosswordData = [
        [
            {
                answer: "DIGNITY",
                hint: "Which legal doctrine emphasizes the importance of respecting an individual's right to self-determination?",
                startx: 1,
                starty: 0,
                orientation: "down",
                position: 1,
            },
            {
                answer: "IDENTITY",
                hint: "What term describes the right of individuals to be recognized as unique members of society?",
                startx: 5,
                starty: 0,
                orientation: "across",
                position: 2,
            },
            {
                answer: "FAIRNESS",
                hint: "What term refers to the fair treatment and equal opportunities for all individuals, regardless of their background?",
                startx: 0,
                starty: 3,
                orientation: "down",
                position: 3,
            },
            {
                answer: "IDCARD",
                hint: "What small card proves who you are when you need to go somewhere or do something important?",
                startx: 2,
                starty: 0,
                orientation: "across",
                position: 4,
            },
        ],
        [
            {
                answer: "CHOICE",
                hint: "What idea ensures that everyone has the right to make their own choices and decisions?",
                startx: 1,
                starty: 2,
                orientation: "across",
                position: 1,
            },
            {
                answer: "EQUITY",
                hint: "What term refers to the practice of treating everyone the same, regardless of their differences?",
                startx: 2,
                starty: 0,
                orientation: "down",
                position: 2,
            },
            {
                answer: "FAIRNESS",
                hint: "What term refers to the fair treatment and equal opportunities for all individuals, regardless of their background?",
                startx: 0,
                starty: 5,
                orientation: "down",
                position: 3,
            },
            {
                answer: "EQUALITY",
                hint: "Which legal concept protects individuals from unfair treatment based on their race, gender, or beliefs?",
                startx: 2,
                starty: 6,
                orientation: "across",
                position: 4,
            },
        ],
    ];

    return (
        <View style={styles.container}>
            <CrosswordGrid crosswordData={crosswordData} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#F4EAE0'
    },
});

export default CrossWord;
