import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Card } from "./";
import {clearLocalNotification,setLocalNotification} from "../utils/notifications";


class Quiz extends Component {
  state = {index: 0,score: 0,done: false };

  handleAnswer = correct => {
    const deckId = this.props.navigation.state.params.deckId;
    const questions = this.props.decks[deckId].questions;
    let { score, index, done } = this.state;

    score = correct ? score + 1 : score;
    index++;

    done = index === questions.length;
    this.setState({ index, score, done });

    if (done) {
      clearLocalNotification().then(setLocalNotification);
    }
  };

  restartQuiz = () => {
    this.setState({ index: 0, score: 0, done: false });
  };

  backToDeck = () => {
    this.props.navigation.goBack();
  };

  render() {
    const deckId = this.props.navigation.state.params.deckId;
    const questions = this.props.decks[deckId].questions;
    const { index, score, done } = this.state;

    if (done) {
      return (
        <View style={styles.container}>
          <Text style={styles.subtitle}>
            Your Result Is:
          </Text>
          <Text style={styles.title}>
            {Math.floor(score / questions.length * 100)}% correct
          </Text>

          <TouchableOpacity style={styles.btnSec} onPress={this.restartQuiz}>
            <Text style={styles.btnSecText}>{'Resume Quiz'.toUpperCase()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={this.backToDeck}
          >
            <Text style={styles.btnText}>{'Back to Deck'.toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.scoreBoard}>{score}</Text>
        <Text style={styles.scoreBoardText}>Correct Answers</Text>

        <Text style={styles.scoreBoard}>{questions.length - index}</Text>
        <Text style={styles.scoreBoardText}>More Questions</Text>
        <Card style={styles.card} card={questions[index]} handleAnswer={this.handleAnswer}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    marginTop: 8,
    fontWeight: '200',
  },
  subtitle: {
    fontSize: 24,
    marginTop: 8,
    fontWeight: '700'
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
    height: "100%",
  },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
    borderRadius: 5,
    marginTop: 16,
    width: 300,
    height: 40,
    maxHeight: 40
  },
  btnText: {
    fontSize: 16,
    color: "white",
    fontWeight: '700',
    marginTop: 16
  },
  scoreBoard: {
    fontSize: 32,
    fontWeight: '200',
    marginTop: 32
  },
  scoreBoardText: {
    fontSize: 16,
    fontWeight: '600',
    margin: 16
  },
  btnSec: {
    padding: 12,
    width: 300,
    marginTop: 100,
    backgroundColor: "#f1f1f1",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center"
  },
  btnSecText: {
    fontSize: 16,
    fontWeight: '700'
  },
});

export default connect(state => state)(Quiz);
