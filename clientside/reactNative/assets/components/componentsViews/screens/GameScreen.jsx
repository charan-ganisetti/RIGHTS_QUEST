import React from "react";
import { StyleSheet, View, SafeAreaView, Text, ScrollView } from "react-native";
import NavBar from "../../NavBar/NavBar";
import GameCard from "../../Games/GameCard";

const GameScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>Welcome To The Games</Text>
                    <Text>Select Game You Want to Play</Text>
                </View>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.GameCardContainer}>
                        <View style={styles.Carddisplayer}>
                            <GameCard
                                imageSource={require('../../images/memoryImage.png')}
                                gameName={"Pairs Game"}
                                gamePage={"MemoryGame"}
                                level={"level1"}
                                prevlevel=""
                            />
                        </View>

                        <View style={styles.Carddisplayer}>
                            <GameCard
                                imageSource={require('../../images/tic_tac_image.jpg')}
                                gameName={"Tic Tac Game"}
                                gamePage={"TicTacGame"}
                                level={"level2"}
                                prevlevel={"level1"}
                            />
                        </View>
                        <View style={styles.Carddisplayer}>
                            <GameCard
                                imageSource={require('../../images/courtroom.jpg')}
                                gameName={"Court Room Stimulation Game"}
                                gamePage={"AdventureGame"}
                                level={"level3"}
                                prevlevel={"level2"}
                            />
                        </View>
                        <View style={styles.Carddisplayer}>
                                <GameCard
                                    imageSource={require('../../images/puzzleIcon.jpg')}
                                    gameName={"Crossword"}
                                    gamePage={"Crossword"}
                                    level={"level4"}
                                    prevlevel={"level3"}
                                />
                            </View>
                        
                        

                        <View style={styles.buttomcontainer}>
                        <View style={styles.Carddisplayer}>
                            <GameCard
                                imageSource={require('../../images/snakeGame.png')}
                                gameName={"Snake Game"}
                                gamePage={"SnakeGame"}
                                level={"level5"}
                                prevlevel={"level4"}
                            />
                        </View>
                            
                        </View>
                    </View>
                </ScrollView>
                <NavBar />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: '#F4EAE0'
    },
    heading: {
        display: 'flex',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 200
    },
    headingText: {
        fontSize: 25
    },
    content: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    GameCardContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    Carddisplayer: {
        width: 250,
        height: 100,
        backgroundColor: '#FAF6F0',
        margin: 15,
        borderRadius: 10
    },
    buttomcontainer: {
        marginBottom: 60
    }
});

export default GameScreen;
