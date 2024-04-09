import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Linking } from "react-native";
import { useNavigation } from '@react-navigation/native';

const RightComponent = (props) => {
    const navigation = useNavigation();

    const openVideo = () => {
        navigation.navigate("video", { "animationVideo": props.video })
    }
    const openWebSite = () => {
        Linking.openURL(props.webSiteLink);
    }
    const openQuiz = () => {
        navigation.navigate("ExamScreen", { "data": props.article, "level": props.level })
    }
    return (
        <View style={styles.rightContainer}>
            <View style={styles.headingContainer}>
                <Text style={styles.headingText}>{props.article}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text>{props.discription}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={openVideo}>
                    <Text>Video</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={openWebSite}>
                    <Text>Website or pdf</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={openQuiz}>
                    <Text>Attempt Quiz</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    rightContainer: {
        backgroundColor: "#FAF6F0",
        margin: 10,
        width: 300,
        height: 206,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        padding: 10,
    },
    headingContainer: {
        alignItems: "center",
    },
    headingText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    textContainer: {
        marginTop: 10,
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        backgroundColor: "#F4DFC8",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: "center",
        justifyContent: "center", // Align text to the center
    },
});

export default RightComponent;
