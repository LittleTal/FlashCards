import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text , StyleSheet ,TouchableOpacity } from "react-native";


class Deck extends Component {
  addNewQuestion = title => {
    this.props.navigation.navigate("AddCard", {title,
      update: () => this.refreshOnGoBack()});
  };

  quizStart = () => {
    this.props.navigation.navigate("Quiz", {deckId:
      this.props.navigation.state.params.deckId});
  };

  render() {
    const { decks, navigation } = this.props;
    const deck = decks[navigation.state.params.deckId];
    const cardTotal = deck.questions.length;


    return (

      <View style={styles.container}>

        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.numText}>{cardTotal} </Text>
        <Text>questions in deck.</Text>{cardTotal > 0 ? (

          <TouchableOpacity style={styles.btnSec}
            onPress={() => this.quizStart(deck.title)}>
            <Text style={styles.btnSecText}>{'Start Quiz'.toUpperCase()}</Text>
          </TouchableOpacity>) : null}

        <TouchableOpacity style={styles.btn}
          onPress={() => this.addNewQuestion(deck.title)}>
          <Text style={styles.btnText}>{'Add a question'.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f1f1"
  },
  title: {
    fontSize: 24,
    color: "#333",
    fontWeight: '500'
  },
  numText: {
    fontSize: 32,
    color: "#999",
    marginTop: 80,
  },
  btn: {
    padding: 12,
    width: 300,
    marginTop: 24,
    backgroundColor: "#333",
    borderRadius: 4,
    alignItems: "center"
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

  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: '700'
  }
});

export default connect(state => state)(Deck);
