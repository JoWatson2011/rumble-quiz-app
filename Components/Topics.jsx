import {
  View,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { getCategories } from "../utils/questionsApi";
import Topic from "./Topic";
// import TopicFlipCard from "./TopicFlipCard";
import QuizPage from "./QuizPage";
import { socket } from "../socket";
import { UserContext } from "../context/UserContext";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState();
  const [avatar, setAvatar] = useState();
  const { height } = useWindowDimensions();
  const { userLogged, login } = useContext(UserContext);

  useEffect(() => {
    getCategories()
      .then((data) => {
        const { trivia_categories } = data;
        setTopics(trivia_categories);
      })
      .catch((err) => console.log("Error getting categories:", err));
  }, []);

  const handleSelection = async (id) => {
    setSelectedTopic(id);
    if (userLogged && avatar) {
      socket.emit("topic-selected", id.toString(), {
        username: userLogged,
        avatar_url: avatar,
      });
    }
  };

  if (selectedTopic === undefined) {
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <View>
          <Image
            source={require("../assets/Designer.jpeg")}
            style={[styles.logo, { height: height * 0.3 }]}
          />
        </View>
        <ScrollView>
          {topics.map((topic) => {
            return (
              <Pressable
                key={topic.id}
                onPress={() => handleSelection(topic.id)}
              >
                <Topic topic={topic} />
              </Pressable>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return <QuizPage topic_id={selectedTopic} userLogged={userLogged} />;
  }
}

const styles = StyleSheet.create({
  SafeAreaView: {
    marginBottom: 70,
  },
  logo: {
    margin: "auto",
    width: "70%",
    maxWidth: 200,
    maxHeight: 200,
    borderRadius: 100,
  },
});
