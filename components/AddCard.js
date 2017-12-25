import React, { Component } from "react";
import { connect } from "react-redux";
import { saveNewCard } from "../utils/api";
import { addCard } from "../actions/addCard";
import {Text, View, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView} from "react-native";
import tolower from "lodash.tolower";


class AddDeck extends Component {
  state = {question: "",answer: ""
  };


  saveCard = () => {
    const deckId = tolower(this.props.navigation.state.params.title);
    const { question, answer } = this.state;

    this.props.dispatch(addCard(deckId, { question, answer }));
    this.props.navigation.goBack();

    saveNewCard(deckId, { question, answer });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>{'Card content'.toUpperCase()}</Text>
        <Text style={styles.subtitle}> Fill below your Q&A description </Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input}
              multiline = {true}
              numberOfLines = {4}
              autoGrow={true}
              autoFocus={true}
              placeholder="Question Description"
              onChangeText={question => this.setState({ question })}
              value={this.state.question}
            />
          </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
            multiline = {true}
            numberOfLines = {4}
            autoGrow={true}
            autoFocus={true}
            placeholder="Answer Description"
            onChangeText={answer => this.setState({ answer })}
            value={this.state.answer}
          />
        </View>
        <TouchableOpacity onPress={this.saveCard} style={styles.btn}>
          <Text style={styles.btnText}>{'Save'.toUpperCase()}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  title: {
    fontSize: 24,
    color: "#333",
    fontWeight: '500'
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    margin: 40,
    marginTop: 8
  },

  inputContainer: {
    height: 96,
    margin: 16,
    width: "80%",
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
  },
  input: {
    borderColor: "#f2f2f2",
    borderWidth: 1,
    flex: 1,
    padding: 8,
    paddingTop: 8,
    fontSize: 16,
    fontWeight: '100',
    lineHeight: 16
  },
  btn: {
    padding: 12,
    width: 300,
    marginTop: 100,
    backgroundColor: "#333",
    borderRadius: 4,
    alignItems: "center"
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: '700'
  }
});


export default connect()(AddDeck);
