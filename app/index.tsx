
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Home() {
  let router = useRouter();

  const [initialPoint, setInitialPoint] = useState("999");
  const [error, setError] = useState("");


  function vaildateInput(): any {
    const input = Number.parseInt(initialPoint);

    if (isNaN(input) || input < 100 || input > 999) {
      setError("Please enter a valid point between 100 andd 999");
      return false;
    }
    setError("");
    return true;
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter Initial Point!</Text>
      <TextInput style={styles.textInput} defaultValue={initialPoint} placeholder="min 100 max 999" keyboardType="numeric" maxLength={3} onChangeText={setInitialPoint} />
      {error ? <Text style={styles.errText}>{error}</Text> : null}
      <TouchableOpacity onPress={() => {
        if (vaildateInput()) {
          router.push({
            pathname: "/DiceGame",
            params: { initialPoint: initialPoint }
          });
        }
      }} style={styles.button}>
        <Text style={styles.btnTxt}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "gray"
  },
  textInput: {
    margin: 24,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    padding: 20
  },
  button: {
    backgroundColor: "blue",
    color: "white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",


  },
  btnTxt: {
    color: "white",
    paddingVertical: 10,
    marginHorizontal: 40
  },

  errText: {
    color: "red",
    margin: 5
  }
})