import React, { Component } from "react";
import { connect } from "react-redux";
import {StyleSheet,View ,TouchableOpacity ,FlatList ,Text ,Image} from "react-native";
import { getDecks } from "../utils/api";
import tolower from "lodash.tolower";
import { receiveDecks } from "../actions/recieveDecks";


class DeckList extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    const data = await getDecks();
    dispatch(receiveDecks(JSON.parse(data)));
  }

  handlePress = title => {
    const deckId = tolower(title);
    this.props.navigation.navigate("Deck", { deckId });
  };

  render() {
    if (this.props.decks === null) {
      return (
        <View style={styles.container}>
          <Image source={require('../components/empty.jpg')} style={styles.img} />
          <View style={styles.container}>
            <Text style={{fontSize: 24}}>Deck is empty </Text>
            <Text style={{fontSize: 16}}>Choose "New Deck" to start</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.values(this.props.decks)}
          renderItem={({ item: { questions, title } }) => {
            return (
              <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => this.handlePress(title)}>

                <Text style={styles.title}>{title}</Text>
                <Text style={styles.btnText}>
                  {questions.length} {questions.length === 1
                    ? "Card"
                    : "Cards"}{" "}
                </Text>
              </TouchableOpacity>
            );
          }}

          keyExtractor={item => item.title}

        />
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
  img: {
    width: 300,
    marginTop: 200
  },
  title: {
    fontSize: 16,
    color: "#333"
  },
  ItemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 16,
    borderRadius: 2,
    height: 80,
    width: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },

});

export default connect(state => state)(DeckList);
