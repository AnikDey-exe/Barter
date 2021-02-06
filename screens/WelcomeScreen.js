import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, KeyboardAvoidingView, Image} from 'react-native';
import db from '../config';
import firebase from 'firebase';


export default class WelcomeScreen extends React.Component {
  constructor(){
    super();
    this.state = {
        emailID: '',
        password: '',
    }   
  }

  userLogin = (emailID,password) => {
    firebase.auth().signInWithEmailAndPassword(emailID,password)
    .then(()=>{
        return Alert.alert("Successfully logged in.");
    })
    .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
    })
  }

  userSignUp = (emailID,password) => {
    firebase.auth().createUserWithEmailAndPassword(emailID,password)
    .then((response)=>{
        return Alert.alert("User added successfully.");
    })
    .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
    })
  }

  render(){
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View>
            <Image
            source={require('../assets/barter.png')}
            style={{width: 200, height: 200, alignItems: 'center',marginTop: 30}}/>
            <Text style={styles.title}> Barter </Text>
          </View>
          <View>
              <TextInput
              style={styles.loginBox}
              placeholder="Email"
              placeholderTextColor="#eb4634"
              keyboardType='email-address'
              onChangeText={(text)=>{
                  this.setState({
                      emailID: text
                  })
              }}/>

              <TextInput
              style={styles.loginBox}
              placeholder="Password"
              placeholderTextColor="#eb4634"
              secureTextEntry={true}
              onChangeText={(text)=>{
                this.setState({
                    password: text
                })
              }}/>
          </View>

          <View>
              <TouchableOpacity 
              style={styles.loginButton}
              onPress={()=>{this.userLogin(this.state.emailID,this.state.password)}}> 
                  <Text style={styles.loginText}> Login </Text>
              </TouchableOpacity>

              <TouchableOpacity 
              style={styles.loginButton}
              onPress={()=>{this.userSignUp(this.state.emailID,this.state.password)}}> 
                  <Text style={styles.loginText}> Sign Up </Text>
              </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffab19',
      alignItems: 'center',
    },
    title: {
        fontSize: 55,
        marginTop: 20,
        textAlign: 'center',
        fontWeight: '300',
        paddingBottom: 0,
        color: '#ff2819',
        //fontFamily: 'lato-bold'
    },
    loginBox: {
        width: 300,
        height: 50,
        borderBottomWidth: 2,
        borderColor: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        margin: 40,
        paddingLeft: 0,
        paddingBottom: 30
    },
    loginButton: {
        backgroundColor: 'white',
        borderRadius: 25,
        margin: 15,
        width: 300,
        height: 50,
        justifyContent: 'center'
    },
    loginText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#1952ff',
        fontWeight: 'bold'
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
  });
