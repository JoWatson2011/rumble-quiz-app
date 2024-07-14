import { ScrollView } from "react-native";
import { useEffect, useState, useContext } from "react";
import React from "react";
import CountdownTimer from "./Countdown";
import QuestionCard from "./QuestionCard";
import PlayerAvatars from "./PlayerAvatars";
import { socket } from "../socket";
import WaitingRoom from "./WaitingRoom";
import { UserContext } from "../context/UserContext";

export default function QuizPage({ topic_id }) {
  const [avatarsReceived, setAvatarsReceived] = useState(false);
  const { userLogged } = useContext(UserContext);
  useEffect(() => {
    socket.on("avatars", () => {
      setAvatarsReceived(true);
    });
    return () => {
      socket.emit("leave-game", topic_id, userLogged);
    };
  }, []);

  if (avatarsReceived) {
    return (
      <ScrollView>
        <PlayerAvatars />
        <CountdownTimer />
        <QuestionCard />
      </ScrollView>
    );
  } else {
    return <WaitingRoom />;
  }
}
