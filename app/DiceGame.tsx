import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DiceGame = () => {
  const { initialPoint } = useLocalSearchParams();

  const diceList = [
    require("../assets/images/d1.png"),
    require("../assets/images/d2.png"),
    require("../assets/images/d3.png"),
    require("../assets/images/d4.png"),
    require("../assets/images/d5.png"),
    require("../assets/images/d6.png"),
  ]

  const sound = {
    win: require("../assets/audio/levelup.mp3"),
    lose: require("../assets/audio/wrong.mp3"),
  }


  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [sum, setSum] = useState(0);


  function generateRandomNumber() {
    return Math.floor(Math.random() * 6);
  }

  function rollTheDice() {
    setIndex1(generateRandomNumber());
    setIndex2(generateRandomNumber());
  }
  return (
    <View style={styles.container}>
      <View style={styles.diceRow}>
        <Image source={diceList[index1]} style={styles.dice} />
        <Image source={diceList[index2]} style={styles.dice} />
      </View>

      <View style={styles.scroborad}>
        <Text style={styles.pointText}>Your Point : {initialPoint}</Text>
        <Text style={styles.sumText}>Sum Text  : {sum}</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={rollTheDice} >
        <Text style={styles.btnText}>
          ROLL
        </Text>
      </TouchableOpacity>
    </View>
  )
}


export default DiceGame

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20
  },
  diceRow: {
    flexDirection: "row",
    justifyContent: "center",

  },
  dice: {
    width: 100,
    height: 100,
    borderRadius: 12,
    margin: 12
  },
  btn: {
    backgroundColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
  },
  btnText: {
    color: "white",
    paddingVertical: 10,
    marginHorizontal: 40
  },
  pointText: {
    fontSize: 18,
    color: "gray"
  },
  sumText: {
    fontSize: 20,
    color: "black",
    fontWeight: "500"
  },
  scroborad: {
    justifyContent: "center",
    alignItems: "center"
  }
})
