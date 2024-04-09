import React, { useState ,useRef,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Speech from 'expo-speech';

const AdvantureScreen = () => {
    const [showRules, setShowRules] = useState(true); // State to control the visibility of rules
    const [currentTurn, setCurrentTurn] = useState('Attorney');
    const [attorneyStatement, setAttorneyStatement] = useState('');
    const [witnessTestimony, setWitnessTestimony] = useState('');
    const [judgeDecision, setJudgeDecision] = useState('');
    const [verdict, setVerdict] = useState('');
    const [childLaborRightIndex, setChildLaborRightIndex] = useState(0);
    
    
    const childLaborRightsInfo = [
        "The Constitution of India, under Article 24, prohibits the employment of children below the age of 14 in hazardous occupations.",
        
        "It defines hazardous occupations and processes where child labor is strictly prohibited.",
        
        "Various government schemes aim to eradicate child labor by providing education and support to affected families.",
        "International conventions such as the United Nations Convention on the Rights of the Child further support efforts to eliminate child labor globally."
    ];

    // Function to handle the next turn
    const handleNextTurn = () => {
        setCurrentTurn(currentTurn === 'Attorney' ? 'Witness' : 'Judge');
     // Reset child labor right index
    };

    // Function to handle attorney's statement
    const handleAttorneyStatement = (statement) => {
        const result =
            statement.toLowerCase().includes('guilty') ? 'Guilty' : 'Not Guilty';
        setAttorneyStatement(statement);
        setJudgeDecision(result);
        handleNextTurn();
        speakMessage(childLaborRightsInfo[0])
        setChildLaborRightIndex(0); // Display first point after attorney's statement
    };
    const speakMessage = async (message) => {
        await Speech.stop();
        await Speech.speak(message);
    };


    // Function to handle witness's testimony
    const handleWitnessTestimony = (testimony) => {
        const result =
            testimony.toLowerCase().includes('credible')
                ? 'Credible'
                : 'Not Credible';
        setWitnessTestimony(testimony);
        setJudgeDecision(result);
        handleNextTurn();
        speakMessage(childLaborRightsInfo[1])
        setChildLaborRightIndex(1); // Display second point after witness testimony
    };

    // Function to handle judge's decision
    const handleJudgeDecision = (decision) => {
        let finalVerdict = 'Inconclusive';
        // Determine the final verdict based on inputs from attorney, witness, and judge
        if (
            attorneyStatement.toLowerCase().includes('guilty') &&
            witnessTestimony.toLowerCase().includes('credible') &&
            decision.toLowerCase().includes('guilty')
        ) {
            finalVerdict = 'Guilty';
        } else if (
            attorneyStatement.toLowerCase().includes('not guilty') &&
            witnessTestimony.toLowerCase().includes('not credible') &&
            decision.toLowerCase().includes('not guilty')
        ) {
            finalVerdict = 'Not Guilty';
        }

        // Set judge's decision and final verdict
        setJudgeDecision(decision);
        handleNextTurn();
        setVerdict(finalVerdict);
        speakMessage(childLaborRightsInfo[2])
        setChildLaborRightIndex(2); // Display third point after judge's decision
    };

    // Function to reset all state values
    const handleResetAll = () => {
        setAttorneyStatement('');
        setWitnessTestimony('');
        setJudgeDecision('');
        setVerdict('');
        setCurrentTurn('Attorney');
        setChildLaborRightIndex(0); // Reset child labor right index
    };


    return (
        <View style={styles.container}>
        {showRules && (
            <View style={styles.rulesContainer}>
                <Text style={styles.rulesText}>Courtroom Simulation Game</Text>
                <Text style={styles.rulesText}>Rules:</Text>
                <Text style={styles.rulesText}>
                    1. The game proceeds in turns: Attorney, Witness, Judge.
                </Text>
                <Text style={styles.rulesText}>
                    2. Attorney presents a statement, Witness provides testimony, and Judge makes the final decision.
                </Text>
                <Text style={styles.rulesText}>
                    3. Judge's decision is based on Attorney's statement, Witness's testimony, and personal judgment.
                </Text>
                <Text style={styles.rulesText}>
                    4. Ensure to follow child labor rights throughout the proceedings.
                </Text>
                <Button
                    title="Start Game"
                    onPress={() => setShowRules(false)} // Hide rules when start button is pressed
                />
            </View>
        )}
        {!showRules && (
            <><View style={styles.header}>
                <Text style={styles.headerText}>Courtroom Simulation</Text>
                </View>
                <View styles={styles.animationAndMessageContainer}>
                    <View style={styles.animationContainer}>
                        <LottieView
                            
                            source={require('./../../../Animations/character.json')}
                            autoPlay={false}
                            loop={false}
                            style={styles.animation}
                        />
                    </View>
                    <View style={styles.messageContainer}>
                        <View style={styles.bubble}>
                        <Text style={styles.childLaborRightText}>
    {childLaborRightsInfo[childLaborRightIndex] }
</Text>

                        </View>
                    </View>
                </View>
                <View style={styles.content}>
                {currentTurn === 'Attorney' && (
                    <AttorneyTurn onStatementSubmit={handleAttorneyStatement} />
                )}
                {currentTurn === 'Witness' && (
                    <WitnessTurn onTestimonySubmit={handleWitnessTestimony} />
                )}
                {currentTurn === 'Judge' && (
                    <JudgeTurn onDecisionSubmit={handleJudgeDecision} />
                )}

                {/* Displaying results */}
                <View style={styles.resultsContainer}>
                    <Text style={styles.resultsText}>Attorney Statement: {attorneyStatement}</Text>
                    <Text style={styles.resultsText}>Witness Testimony: {witnessTestimony}</Text>
                    <Text style={styles.resultsText}>Judge Decision: {judgeDecision}</Text>
                    <Text style={styles.resultsText}>Verdict: {verdict}</Text>
                </View>
                
                {/* Button to reset the game */}
                <TouchableOpacity style={styles.resetAllButton} onPress={handleResetAll}>
                    <Text style={styles.buttonText}>Reset All</Text>
                </TouchableOpacity>
                </View>
            </>
        )}
    </View>
);
};

const AttorneyTurn = ({ onStatementSubmit }) => {
    const [attorneyStatement, setAttorneyStatement] = useState('');

    return (
        <View>
            <Text style={styles.turnText}>Attorney's Turn</Text>
            <Text style={styles.label}>Present Your Statement:</Text>
            <TextInput
                style={styles.input}
                placeholder="Type your statement..."
                onChangeText={(text) => setAttorneyStatement(text)}
                value={attorneyStatement}
            />
            <TouchableOpacity style={styles.button} onPress={() => onStatementSubmit(attorneyStatement)}>
                <Text style={styles.buttonText}>Submit Statement</Text>
            </TouchableOpacity>
        </View>
    );
};

const WitnessTurn = ({ onTestimonySubmit }) => {
    const [witnessTestimony, setWitnessTestimony] = useState('');

    return (
        <View>
            <Text style={styles.turnText}>Witness's Turn</Text>
            <Text style={styles.label}>Present Your Testimony:</Text>
            <TextInput
                style={styles.input}
                placeholder="Type your testimony..."
                onChangeText={(text) => setWitnessTestimony(text)}
                value={witnessTestimony}
            />
            <TouchableOpacity style={styles.button} onPress={() => onTestimonySubmit(witnessTestimony)}>
                <Text style={styles.buttonText}>Submit Testimony</Text>
            </TouchableOpacity>
        </View>
    );
};

const JudgeTurn = ({ onDecisionSubmit }) => {
    const [judgeDecision, setJudgeDecision] = useState('');

    return (
        <View>
            <Text style={styles.turnText}>Judge's Turn</Text>
            <Text style={styles.label}>Make Your Decision:</Text>
            <TextInput
                style={styles.input}
                placeholder="Type your decision..."
                onChangeText={(text) => setJudgeDecision(text)}
                value={judgeDecision}
            />
            <TouchableOpacity style={styles.button} onPress={() => onDecisionSubmit(judgeDecision)}>
                <Text style={styles.buttonText}>Submit Decision</Text>
            </TouchableOpacity>
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
    
           
        rulesContainer: {
            padding: 20,
            alignItems: 'center',
        },
        rulesText: {
            fontSize: 18,
            textAlign: 'center',
            marginBottom: 10,
        },
        headerText: {
        
            
            fontSize: 36,
            marginBottom: 10,
            fontWeight:'bold'
        },
        animationAndMessageContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            
        },
        
        
       
        childLaborRightText: {
            fontSize: 16,
            textAlign: 'center',
        },
        turnText: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        label: {
            fontSize: 16,
            marginBottom: 5,
        },
        input: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
        },
        button: {
            backgroundColor: '#007BFF',
            padding: 10,
            borderRadius: 5,
        },
        buttonText: {
            color: 'white',
            textAlign: 'center',
        },
        resultsContainer: {
            marginTop: 20,
            padding: 10,
            backgroundColor: '#F0F0F0',
            borderRadius: 5,
        },
        resultsText: {
            fontSize: 16,
            marginBottom: 5,
        },
        resetAllButton: {
            marginTop: 20,
            backgroundColor: '#DC3545',
            padding: 10,
            borderRadius: 5,
        },
    
    messageContainer: {
        backgroundColor: 'transparent',
        zIndex: 1,
        position: 'absolute',
        paddingHorizontal: 20,
        width:800,
        maxWidth: '100%',
        
        
        
         // Limit the width of the speech bubble
         // Adjust as needed to position the message above the character
        
    },
    animationAndMessageContainer: {
        
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom:100,
        maxWidth: '100%',
        right:"19%"
        
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
        animationContainer: {
            right:120,
            top:30
         },
         animation: {
             width: 100,
             height: 100,
         },
         content:{
            top:60,
            justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
         }
});

export default AdvantureScreen;

   
