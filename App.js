import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import * as firebase from 'firebase';
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label,
} from 'native-base';

const firebaseConfig = {
  apiKey: 'xx',
  authDomain: 'xx',
  databaseURL: 'xx',
  projectId: 'xx',
  storageBucket: '',
  messagingSenderId: 'xx',
  appId: 'xx',
};

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  state = {
    email: '',
    password: '',
  };

  signUpUser(email, password) {
    try {
      if (this.state.password.length < 6) {
        alert("A senha deve conter no mínimo 6 caracteres")
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.toString());
    }
  }


  signInUser(email, password) {
    try {
      if (this.state.password.length < 6) {
        alert("A senha deve conter no mínimo 6 caracteres")
        return;
      }
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error.toString());
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={email => this.setState({email})}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={password => this.setState({password})}
            />
          </Item>

          <Button
            style={styles.buttonSignIn}
            full
            rounded
            success
            onPress={() => {
              this.signInUser(this.state.email, this.state.password);
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </Button>

          <Button
            style={styles.buttonSignUp}
            full
            rounded
            primary
            onPress={() => {
              this.signUpUser(this.state.email, this.state.password);
            }}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  buttonSignIn: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonSignUp: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    color: '#ffffff',
  },
});
