import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: '<key>',
      authDomain: 'react-native-auth-96b7c.firebaseapp.com',
      databaseURL: 'https://react-native-auth-96b7c.firebaseio.com',
      projectId: 'react-native-auth-96b7c',
      storageBucket: 'react-native-auth-96b7c.appspot.com',
      messagingSenderId: '835423298544'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return this.renderLogout();
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  renderLogout() {
    return (
      <Card>
        <CardSection>
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        </CardSection>
      </Card>
    );
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
