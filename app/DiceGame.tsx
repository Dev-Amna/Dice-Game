import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DiceGame = () => {
  const WINNING_POINT = 100;
  const LOSING_POINT = 100;
  const MISS_POINT = 5;

  const { initialPoint } = useLocalSearchParams();
  const [point, setPoint] = useState<number>(Number.parseInt(initialPoint as string));
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [isFirstRoll, setIsFirstRoll] = useState(true);
  const [status, setStatus] = useState("");
  const [sum, setSum] = useState(0);
  const firstDiceWinComb = [7, 11];
  const firstDiceLoseComb = [2, 3, 12];
  const [isGameRuning, setIsGameRuning] = useState(true);
  const [target, setTarget] = useState(0);

  const msg = {
    winMsg: "You wons!",
    loseMsg: "You losts!",
  }


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


  useEffect(() => {
    if (!isFirstRoll) {
      setSum(index1 + index2 + 2);
    }

  }, [index1, index2])

  // Show msg for win or lose
  useEffect(() => {
    if (target > 0) {

      // we have a target, and match the sum with the target
      if (sum === target) {
        setStatus(msg.winMsg);
        setIsGameRuning(false);
        setPoint(point + WINNING_POINT);
      }
      else if (sum === 7) {
        setStatus(msg.loseMsg);
        setIsGameRuning(false);
        setPoint(point - LOSING_POINT);
      }
      else {
        setPoint(point - MISS_POINT);
      }
    }
    else {
      // First Roll
      if (firstDiceWinComb.includes(sum)) {
        setStatus(msg.winMsg);
        setIsGameRuning(false);
        setPoint(point + WINNING_POINT);
      }
      else if (firstDiceLoseComb.includes(sum)) {
        setStatus(msg.loseMsg);
        setIsGameRuning(false);
        setPoint(point - LOSING_POINT);
      }

      else {
        setTarget(sum);
      }
    }
  }, [sum])
  function generateRandomNumber() {
    return Math.floor(Math.random() * 6);
  }


  function rollTheDice() {
    setIndex1(generateRandomNumber());
    setIndex2(generateRandomNumber());
    isFirstRoll && setIsFirstRoll(false);

  }

  function reset() {
    setIndex1(0);
    setIndex2(0);
    setStatus("");
    setSum(0);
    setIsFirstRoll(true)
    setIsGameRuning(true);
    setTarget(0);
  }
  return (
    <View style={styles.container}>
      <View style={styles.diceRow}>
        <Image source={diceList[index1]} style={styles.dice} />
        <Image source={diceList[index2]} style={styles.dice} />
      </View>

      {status && <Text style={styles.statusText}>{status}</Text>}
      <View style={styles.scroborad}>
        <Text style={styles.pointText}>Your Point : {point }</Text>
        <Text style={styles.sumText}>Dice Sum  : {sum}</Text>
        {target > 0 && <Text style={styles.targetText}>Next Target : {target}</Text>}
      </View>

      {/* Buttons */}
      <View>
        <TouchableOpacity disabled={!isGameRuning} style={[styles.btn, !isGameRuning && styles.btnDisabled]} onPress={rollTheDice} >
          <Text style={styles.btnText}>
            ROLL
          </Text>
        </TouchableOpacity>

        <TouchableOpacity disabled={isGameRuning} style={[styles.btn, isGameRuning && styles.btnDisabled]} onPress={reset} >
          <Text style={styles.btnText}>
            Reset
          </Text>
        </TouchableOpacity>
      </View>
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
  btnDisabled: {
    backgroundColor: "gray",
    opacity: 0.5
  },
  btn: {
    backgroundColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    margin: 5
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
  },
  statusText: {
    fontSize: 60,
  },
  targetText: {
    fontSize: 22,
    color: "green"
  }

})
