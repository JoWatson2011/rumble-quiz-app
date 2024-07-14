import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";

const notifications = [
  {
    id: 1,
    title: "Friend Request",
    description: "RobotOverlord has sent you a friend request.",
    image: require("../assets/avatars/icons8-gorilla-48.png"),
    backgroundColor: "#b22222",
  },
  {
    id: 2,
    title: "Friend Added",
    description: "PirateQueen has accepted your friend request.",
    image: require("../assets/avatars/icons8-lion-48.png"),
    backgroundColor: "#90ee90",
  },
  {
    id: 3,
    title: "Friend Request",
    description: "NinjaWarrior has sent you a friend request.",
    image: require("../assets/avatars/icons8-tiger-48.png"),
    backgroundColor: "#daa520",
  },
];

export default function NotificationsList() {
  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <View
        style={[
          styles.profileImageContainer,
          { backgroundColor: item.backgroundColor },
        ]}
      />
      <Image source={item.image} style={styles.profileImage} />
      <View style={styles.notificationText}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "../assets/jigsaw_puzzle_frame_6_a_white.jpg" }}
        style={styles.headerStrip}>
        <Text style={styles.headerText}>Notifications</Text>
      </ImageBackground>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
  },
  headerStrip: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(30, 144, 255)",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#ffffff",
  },
  listContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  notificationCard: {
    width: "90%",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 48,
    height: 48,
    marginRight: 15,
    borderRadius: 50,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  notificationDescription: {
    fontSize: 16,
  },
});
