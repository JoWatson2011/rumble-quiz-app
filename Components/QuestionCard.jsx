import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { socket } from "../socket";
import { SafeAreaView } from "react-native-safe-area-context";
import { withTheme } from "react-native-paper";
import ProgressBar from "./ProgressBar";
import EndOfGame from "./EndOfGame";
import { UserContext } from "../context/UserContext";
function QuestionCard({ theme, remainingTime }) {
  const [questionTitle, setQuestionTitle] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [rightAnswer, setRightAnswer] = useState(null);
  const [resultColor, setResultColor] = useState("");
  const [roundCounter, setRoundCounter] = useState(0);
  const [playersRemaining, setPlayersRemaining] = useState(3); // 3 is the number of the room.size
  const [endOfGame, setEndOfGame] = useState("");
  const { userLogged } = useContext(UserContext);

  useEffect(() => {
    if (userLogged) {
      const handleQuestion = (question) => {
        setResultColor("");
        setPlayersRemaining(question.remainingPlayers);

        if (playersRemaining === 1) {
          socket.emit("leave-game", userLogged);
          setEndOfGame("win");
          return;
        }

        const newQuestionTitle = question.question;
        const newAnswers = [...question.incorrect_answers];
        setRightAnswer(question.correct_answer);
        newAnswers.splice(
          Math.floor(Math.random() * 4),
          0,
          question.correct_answer
        );

        setQuestionTitle(newQuestionTitle);
        setAnswers(newAnswers);
      };

      socket.on("question", handleQuestion);

      return () => {
        socket.off("question", handleQuestion);
      };
    }
  }, [roundCounter]);

  useEffect(() => {
    const handlePlayersReady = () => setRoundCounter((current) => current + 1);
    socket.on("playersReady", handlePlayersReady);

    return () => {
      socket.off("playersReady", handlePlayersReady);
    };
  }, []);

  const onChoicePress = (choice) => {
    const eliminated = choice === rightAnswer ? false : true;
    const answersFeedback = {
      username: userLogged,
      eliminated,
      points: 3,
    };

    socket.emit("answer", answersFeedback);

    let resultColor;
    if (choice === rightAnswer) {
      setResultColor("green");
    } else {
      setResultColor("red");
      socket.emit("leave-game", userLogged);
      setEndOfGame("lose");
    }
  };

  const styles = StyleSheet.create({
    questionCard: {
      borderRadius: 10,
      elevation: 5,
      backgroundColor: "white",
      shadowOffset: { width: 2, height: 2 },
      shadowColor: "#000",
      shadowOpacity: 0.4,
      shadowRadius: 3,
      marginHorizontal: 10,
      marginVertical: 10,
      padding: 20,
      paddingTop: 38,
      width: "90%",
      alignSelf: "center",
    },
    questionText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 20,
      textAlign: "center",
    },
    answerCards: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
    },
    answerButton: {
      borderRadius: 8,
      elevation: 3,
      shadowOffset: { width: 1, height: 1 },
      shadowColor: "#333",
      shadowOpacity: 0.3,
      shadowRadius: 2,
      marginHorizontal: 4,
      marginVertical: 6,
      paddingVertical: 15,
      paddingHorizontal: 10,
      alignItems: "center",
      minWidth: "45%",
    },
    answerText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
    },
  });
  return (
    <SafeAreaView>
      {!endOfGame ? (
        <View>
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{questionTitle}</Text>
            <View style={styles.answerCards}>
              {answers
                ? answers.map((choice, index) => (
                    <Pressable
                      key={index}
                      disabled={resultColor === "" ? false : true}
                      style={({ pressed }) => [
                        { backgroundColor: pressed ? resultColor : "#ff8c00" },
                        styles.answerButton,
                      ]}
                      onPress={() => onChoicePress(choice)}
                    >
                      <Text style={styles.answerText}>{choice}</Text>
                    </Pressable>
                  ))
                : null}
            </View>
          </View>
          <ProgressBar playersRemaining={playersRemaining} />
        </View>
      ) : (
        <EndOfGame endOfGameResult={endOfGame} />
      )}
    </SafeAreaView>
  );
}

export default withTheme(QuestionCard);
