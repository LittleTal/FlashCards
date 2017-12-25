import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default class Card extends Component {
  state = {showAnswer: false};

  flipCard = () => {this.setState({ showAnswer: !this.state.showAnswer });};

  render() {
    if (this.state.showAnswer) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>The answer is</Text>
          <Text style={styles.qaContainer}>{this.props.card.answer}</Text>
          <TouchableOpacity style={styles.btnCorrect}
            onPress={() => {
              this.flipCard();
              this.props.handleAnswer(true);
            }}>
          <Text style={styles.btnText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnWrong}
            onPress={() => {
              this.flipCard();
              this.props.handleAnswer(false);
            }}
          >
            <Text style={styles.btnText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Question</Text>
        <Text style={styles.qaContainer}>{this.props.card.question}</Text>

        <TouchableOpacity style={styles.btn} onPress={this.flipCard}>
          <Text style={styles.btnText}>Flip to answer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
    alignItems: "center",
    borderColor: "#e1e1e1",
    borderWidth: 1,
    width: "100%",
    paddingTop: 24,
    backgroundColor: "white"
  },
  title: {
    fontSize: 24,
    color: "#333",
    margin: 8,
    fontWeight: '500'
  },
  btn: {
    padding: 12,
    width: 150,
    marginTop: 24,
    backgroundColor: "#333",
    borderRadius: 4,
    alignItems: "center"
  },
  btnWrong: {
    padding: 12,
    width: 150,
    marginTop: 24,
    backgroundColor: "red",
    borderRadius: 4,
    alignItems: "center"
  },
  btnCorrect: {
    padding: 12,
    width: 150,
    marginTop: 8,
    backgroundColor: "green",
    borderRadius: 4,
    alignItems: "center"
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: '700'
  },
  subtitle:{
    fontSize: 16,
    margin: 24
  },
  qaContainer: {
    height: 100,
    fontSize: 16,
    marginTop: 24
  }

});
