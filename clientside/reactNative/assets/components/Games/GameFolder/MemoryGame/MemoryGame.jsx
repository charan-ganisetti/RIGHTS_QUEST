import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
import * as Speech from 'expo-speech';
const randomArrFunction = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

const gameCardsFunction = () => {
    const icons = [
        'paw', 'paw',
        'heart', 'heart',
        'tree', 'tree',
        'star', 'star',
        'bell', 'bell',
        'gift', 'gift',
    ];
    const randomIcons = randomArrFunction(icons);
    return randomIcons.map(
        (icon, index) => ({
            id: index,
            symbol: icon,
            isFlipped: false,
        })
    );
};

const App = () => {
    const [showRules, setShowRules] = useState(true); // State to control the visibility of rules
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [matches, setMatches] = useState(0);
    const [winMessage, setWinMessage] = useState(new Animated.Value(0));
    const [gameWon, setGameWon] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0); // Track index of message

    // Define messages for do's and don'ts against discrimination
    const messages = ["Article 14 guarantees equality before the law and equal protection of laws within India.",
    "Equal Protection of Laws ensures no discrimination based on religion, race, caste, sex, or place of birth.",
    "Prohibition of Discrimination extends to both State and private entities in public matters.",
    "Special Provisions allow for affirmative action for socially and educationally backward classes, including reserved seats in educational institutions and government jobs, scholarships, and other support measures aimed at improving their social and educational status.",
    "Equality of Opportunity mandates fair opportunities in public employment.",
    "Abolition of Untouchability declares untouchability as an offense punishable by law."
  
    ]

    useEffect(() => {
        setCards(gameCardsFunction());
    }, []);

    const cardClickFunction = (card) => {
        if (!gameWon && selectedCards.length < 2 && !card.isFlipped) {
            const updatedSelectedCards = [...selectedCards, card];
            const updatedCards = cards.map((c) =>
                c.id === card.id ? { ...c, isFlipped: true } : c
            );
            setSelectedCards(updatedSelectedCards);
            setCards(updatedCards);
            if (updatedSelectedCards.length === 2) {
                if (updatedSelectedCards[0].symbol === updatedSelectedCards[1].symbol) {
                    
                    setMatches(matches + 1);
                    setSelectedCards([]);
                    speakMessage(messages[messageIndex])
                    setMessageIndex((messageIndex + 1) % messages.length);
                   
                     // Show message after match found
                    if (matches + 1 === cards.length / 2) {
                        geekWinGameFunction();
                        setGameWon(true);
                    }
                } else {
                    setTimeout(() => {
                        const flippedCards = updatedCards.map((c) =>
                            updatedSelectedCards.some((s) => s.id === c.id) ? { ...c, isFlipped: false } : c
                        );
                        setSelectedCards([]);
                        setCards(flippedCards);
                    }, 1000);
                }
            }
        }
    };
    const speakMessage = async (message) => {
        await Speech.stop();
        await Speech.speak(message);
    };

    

    const geekWinGameFunction = () => {
        Animated.timing(winMessage, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        if (matches === cards.length / 2) {
            geekWinGameFunction();
            setGameWon(true);
            
        }
    }, [matches]);

    const msg = `Matches: ${matches} / ${cards.length / 2}`;

    return (
        <View style={styles.container}>
            {showRules && (
                <View style={styles.rulesContainer}>
                    <Text style={styles.rulesText}>Memory Pair Game</Text>
                    <Text style={styles.rulesText}>Rules:</Text>
                    <Text style={styles.rulesText}>
                        Match pairs of cards with the same symbol to win the game.
                    </Text>
                    <Text style={styles.rulesText}>
                        Click on any two cards to flip them. If the symbols match, they stay flipped.
                    </Text>
                    <Text style={styles.rulesText}>
                        If all pairs are matched, you win the game!
                    </Text>
                    <Button
                        title="Start Game"
                        onPress={() => {setShowRules(false);setGameWon(false)}} // Hide rules when start button is pressed
                    />
                </View>
            )}
            {!showRules &&  (
                <>

                    {gameWon ? (
                        <View style={styles.winMessage}>
                            <View style={styles.winMessageContent}>
                                <Text style={styles.winText}>Congratulations!</Text>
                                <Text style={styles.winText}>You Won!</Text>
                            </View>
                            <Button
                                title="Restart"
                                onPress={() => {
                                    setCards(gameCardsFunction());
                                    setSelectedCards([]);
                                    setMatches(0);
                                    setWinMessage(new Animated.Value(0));
                                    setGameWon(false);
                                }}
                            />
                        </View>
                    ) : (
                        <>
                         <Text style={styles.header1}>Memory Pair Game</Text>
                    <Text style={styles.matchText}>{msg}</Text>
                    <View styles={styles.animationAndMessageContainer}>
                    <View style={styles.animationContainer}>
                        <LottieView
                            source={require('./../../../Animations/character.json')} // Replace './animations/message.json' with the path to your Lottie animation file
                            autoPlay
                            loop
                            style={styles.animation}
                        />
                    </View>
                    <View style={styles.messageContainer}>
                    <View style={styles.bubble}>
                        
                        <Text style={styles.messageText}>{messages[messageIndex]}</Text>
                    </View>
                    </View>
                    </View>
                        <View style={styles.grid}>
                            {cards.map((card) => (
                                <TouchableOpacity
                                    key={card.id}
                                    style={[styles.card, card.isFlipped && styles.cardFlipped]}
                                    onPress={() => cardClickFunction(card)}
                                >
                                    {card.isFlipped ? (
                                        <Icon name={card.symbol} size={40} style={styles.cardIcon} />
                                    ) : null}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                    )}
                </>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F4EAE0',
    },
    header1: {
        fontSize: 36,
        marginBottom: 10,
        color: 'black',
        fontWeight:'bold'
    },
    matchText: {
        fontSize: 18,
        color: 'black',
    },
    animationContainer: {
       right:120,
       top:30
    },
    animation: {
        width: 100,
        height: 100,
    },
    messageText: {
        fontSize: 16,
        color: 'black',
    },
    rulesContainer: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor:'white'
    },
    rulesText: {
        fontSize: 16,
        marginBottom: 5,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        top:30
    },
    card: {
        width: 80,
        height: 80,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFD700',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    cardFlipped: {
        backgroundColor: 'white',
    },
    cardIcon: {
        color: 'blue',
    },
    winMessage: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    winMessageContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    winText: {
        fontSize: 36,
        color: 'black',
    },
     messageContainer: {
        backgroundColor: 'transparent',
        zIndex: 1,
        position: 'absolute',
        paddingHorizontal: 20,
        maxWidth: '100%',
        
        
        
         // Limit the width of the speech bubble
         // Adjust as needed to position the message above the character
        
    },
    animationAndMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
        bubble: {
            backgroundColor: 'white',
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 10,
            elevation: 3,
            maxWidth: '100%',
            top:10 ,
            right:40,
            width:200 // Ensure the speech bubble doesn't overflow
        },
});
export default App;