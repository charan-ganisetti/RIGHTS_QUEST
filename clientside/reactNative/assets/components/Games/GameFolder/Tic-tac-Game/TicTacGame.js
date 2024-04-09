import React, { useState, useEffect,useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import Board from './Board';
import * as Speech from 'expo-speech';
const TicTac = () => {
    const initialBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];

    const [board, setBoard] = useState(initialBoard);
    const [player, setPlayer] = useState('X');
    const [winner, setWinner] = useState('');
    const [messages, setMessages] = useState([ 
        "The Right to Education Act, 2009 (Article 21-A) guarantees free and compulsory education for children aged 6 to 14.",
        "It aims to ensure equitable access to quality education for all children, regardless of socio-economic background.",
        "The Act mandates that private schools reserve a percentage of seats for economically disadvantaged students.",
        "It prohibits discrimination in admission based on factors such as religion, caste, or gender.",
        "The Act outlines standards for infrastructure, teacher-student ratio, and curriculum to improve the quality of education.",
        "It emphasizes the importance of inclusive education and special provisions for children with disabilities.",
        "The Act establishes mechanisms for monitoring and evaluation of educational institutions to ensure compliance with its provisions.",
        "It promotes community participation in the management of schools and encourages parental involvement in their children's education.",
        "The Act provides for the establishment of neighborhood schools to ensure accessibility and reduce dropout rates among children."]);
    const [messageIndex,setMessageIndex]=useState(0);
    const lottieRef = useRef(null);

    useEffect(() => {
        checkWinner();
        speakMessage(messages[messageIndex]);
        
    }, [board]);
    

    const handlePress = (rowIndex, cellIndex) => {
        if (board[rowIndex][cellIndex] === '' && !winner) {
            const newBoard = [...board];
            newBoard[rowIndex][cellIndex] = player;
            setBoard(newBoard);
            setPlayer(player === 'X' ? 'O' : 'X');
           
            playAnimationOnce();
            setMessageIndex(messageIndex+1);
            

        }

        
    };
    const speakMessage = async (message) => {
        await Speech.stop();
        await Speech.speak(message);
    };

    const checkWinner = () => {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                setWinner(board[i][0]);
                break;
            }
        }
        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] !== '' && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
                setWinner(board[0][i]);
                break;
            }
        }
        // Check diagonals
        if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
            setWinner(board[0][0]);
        } else if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
            setWinner(board[0][2]);
        } else {
            const isBoardFull = board.every(row => row.every(cell => cell !== ''));
            if (isBoardFull) {
                setWinner('TIE');
            }
        }
    };

    

    const resetBoard = () => {
        setBoard(initialBoard);
        setPlayer('X');
        setWinner('');
        setMessageIndex(0)
    };

    

    
    const playAnimationOnce = () => {
        if (lottieRef.current) {
            lottieRef.current.play(); // Play the animation once
        }
    };

    useEffect(() => {
        if (winner === 'TIE') {
            Alert.alert(
                `It's a tie!`,
                
                'The Indian Constitution ensures that everyone is treated equally regardless of their caste, religion, gender, or economic status. It prohibits discrimination and promotes social justice.',
                [{ text: 'Ok', onPress: resetBoard }]
            );
        } else if (winner) {
            Alert.alert(
                `Player ${winner} won!`,
                'The Indian Constitution ensures that everyone is treated equally regardless of their caste, religion, gender, or economic status. It prohibits discrimination and promotes social justice.',
                [{ text: 'Ok', onPress: resetBoard }]
            );
        }
    }, [winner]);

    return (
        <View style={styles.container}>
            <View style={styles.animationAndMessageContainer}>
                <View style={styles.animationContainer}>
                    <LottieView
                         ref={lottieRef} // Assign the ref to the LottieView
                         source={require('./../../../Animations/character.json')}
                         autoPlay={false} // Set autoPlay to false
                         loop={false} // Set loop to false
                         style={{ width: 100, height: 100 }}
                    />
                </View>
                
                    <View style={styles.messageContainer}>
                        <View style={styles.bubble}>
                            <Text style={styles.messageText}>{messages[messageIndex]}</Text>
                        </View>
                        <View style={styles.leftArrow}>
  
                      </View>
                    </View>
            
            </View>
            <View style={styles.content}>
                <Board board={board} onPress={handlePress} />
                <TouchableOpacity onPress={resetBoard}>
                    <View style={styles.resetButton}>
                        <Text style={styles.buttonText}>Reset Board</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4EAE0',
    },
    animationAndMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    animationContainer: {
        marginRight: '100%',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    resetButton: {
        backgroundColor: 'black',
        marginTop: 30,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    messageContainer: {
        backgroundColor: 'transparent',
        zIndex: 1,
        position: 'absolute',
        paddingHorizontal: 20,
        maxWidth: '100%', // Limit the width of the speech bubble
        top: -20, // Adjust as needed to position the message above the character
        left: 70,
        right:20
    },
    bubble: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        elevation: 3,
        maxWidth: '100%', // Ensure the speech bubble doesn't overflow
    },
    messageText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        flexWrap:'wrap' // Set to 'left' for multi-line support
    },
    
})

export default TicTac;