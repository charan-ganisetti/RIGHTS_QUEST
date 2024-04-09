import react from "react";
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Text, ScrollView } from "react-native"
import NavBar from "../../NavBar/NavBar";
import Quiz from "../QuizExam/Quiz";
const ExamScreen = (props) => {
    const exam = props.route.params.data.replace(/\s/g, '')
    const level = props.route.params.level;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Quiz quizName={exam} level={level} />
                </View>
                {/* NavBar is placed outside the content */}
                <NavBar />
            </View>
        </SafeAreaView>
    );
};
export default ExamScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: '#FFFFFF'
    },
    content: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
});