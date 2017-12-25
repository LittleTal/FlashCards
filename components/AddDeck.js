import React, { Component } from "react";
import {Text,Image, View,StyleSheet,TextInput,KeyboardAvoidingView,TouchableOpacity} from "react-native";
import { connect } from "react-redux";
import { saveNewDeck } from "../utils/api";
import { addDeck } from "../actions/addDeck";
import tolower from "lodash.tolower";


class AddDeck extends Component {
  state = {title: ""};

  componentWillUnmount() {
    this.setState({ title: "" });
  }

  addDeck = () => {
    const { title } = this.state;
    const deckId = tolower(title);
    this.setState({ title: "No Title" });
    this.props.dispatch(addDeck(title));
    this.props.navigation.navigate("Deck", { deckId });

    saveNewDeck(title);
  };


  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>

        <Text style={styles.title}>{'Add New Deck'.toUpperCase()}</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={this.addDeck}>
          <Text style={styles.btnText}>{'Create'.toUpperCase()}</Text>
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
    margin: 32,
    fontWeight: '500'
  },
  inputContainer: {
    height: 24,
    margin: 32,
    width: 300,
    flexDirection: "row",
  },
  input: {
    borderBottomColor: "#666",
    borderBottomWidth: 1,
    flex: 1
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
