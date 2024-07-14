import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function CustomInput({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  type,
  showPassword,
  setShowPassword,
  showRepeatPassword,
  setShowRepeatPassword,
}) {
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
      {type === "Password" ? (
        <Icon
          name={!showPassword ? "eye-off" : "eye"}
          size={20}
          color="#aaa"
          style={styles.icon}
          onPress={toggleShowPassword}
        />
      ) : null}
      {type === "RepeatPassword" ? (
        <Icon
          name={!showRepeatPassword ? "eye-off" : "eye"}
          size={20}
          color="#aaa"
          style={styles.icon}
          onPress={toggleShowRepeatPassword}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 17,
  },
  icon: {
    marginLeft: 10,
    marginTop: 15,
  },
});
