
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Home() {
  const moveNext = () => {
    router.push("/DiceGame");
  }

  const [initialPoint, setInitialPoint] = useState("");
  const [error, setError] = useState("");


  // const vaild = () => {
  //   const
  // }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter Initial Point!</Text>
      <TextInput style={styles.textInput} placeholder="min 100 max 999" keyboardType="numeric" maxLength={3} onChangeText={setInitialPoint} />
     <Text style={styles.errText}>{error}</Text>
      <TouchableOpacity onPress={() => { }} style={styles.button}>
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
    color : "white",
      paddingVertical: 10,
    marginHorizontal: 40
  }
,errText :{
  
}
})