import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { TabNavigator, StackNavigator } from "react-navigation";
import { View } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import reducer from "./reducers";
import { AddDeck, AddCard, DeckList, Deck, Quiz } from "./components";
import { setLocalNotification } from "./utils/notifications";

const store = createStore(reducer);

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Deck List",
      tabBarIcon: () => <Entypo name="documents" size={30} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "New Deck",
      tabBarIcon: () => (<FontAwesome name="plus-square-o" size={30} />)
    }
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckList: {
    screen: DeckList
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
    title: "Deck Info"
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
    title: "Add A Question"
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
    title: "Quiz"
    }
  }
});

export default class App extends React.Component {
  componentDidMount() {
  setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
