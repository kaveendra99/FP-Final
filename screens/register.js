import React, {useEffect, useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Colors } from './Colors';

const App = ({navigation}) => {
  
  const [email, setemail] = useState([]);
  const [pass, setpass] = useState([]);
  const [fname, setfname] = useState([]);
  const [lname, setlname] = useState([]);
  const [pass2, setpass2] = useState([]);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [pass2Error, setPass2Error] = useState('');


  const login = async () => {
    if (email.length === 0) {
      setEmailError('Please enter your email');
    } else {
      setEmailError('');
    }
    if (pass.length === 0) {
      setPasswordError('Please enter your password');
    } else {
      setPasswordError('');
    }
    if (fname.length === 0) {
        setFnameError('Please enter your First Name');
    } else {
        setFnameError('');
    }
    if (lname.length === 0) {
        setLnameError('Please enter your Last Name');
    } else {
        setLnameError('');
    }
    if (pass2.length === 0) {
        setPass2Error('Please confirm your Password');
    } else {
        if (pass2 != pass) {
            setPass2Error('Password mismatched');
        } else {
            setPass2Error('');
        }
    }
    if (email.length > 0 && pass.length > 0) {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input1}
        placeholder="Email"
        placeholderTextColor={Colors.white}
        onChangeText={setemail}
      />
        <Text style={styles.error}>{emailError}</Text>
      <TextInput
        style={styles.input2}
        placeholder="First Name"
        placeholderTextColor={Colors.white}
        onChangeText={setfname}
        secureTextEntry
      />
      <Text style={styles.error}>{fnameError}</Text>
      <TextInput
        style={styles.input2}
        placeholder="Last Name"
        placeholderTextColor={Colors.white}
        onChangeText={setlname}
        secureTextEntry
      />
      <Text style={styles.error}>{lnameError}</Text>
      <TextInput
        style={styles.input2}
        placeholder="Create Password"
        placeholderTextColor={Colors.white}
        onChangeText={setpass}
        secureTextEntry
      />
      <Text style={styles.error}>{passwordError}</Text>
      <TextInput
        style={styles.input2}
        placeholder="Re-enter Password"
        placeholderTextColor={Colors.white}
        onChangeText={setpass2}
        secureTextEntry
      />
      <Text style={styles.error}>{pass2Error}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.signinbutton} onPress={() => {login()}}>
          <Text style={styles.signinbuttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark,
    padding: 20,
  },
  header: {
    fontSize: 32,
    marginBottom: 32,
    color: Colors.green,
  },
  input1: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 30,
    borderColor: Colors.green,
    color: Colors.white,
  },
  input2: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    borderColor: Colors.green,
    color: Colors.white,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 40,
    marginTop: 'auto',
  },
  signinbutton: {
    backgroundColor: Colors.green,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 0,
    alignItems: 'center',
  },
  signinbuttonText: {
    color: Colors.dark,
    fontSize: 18,
  },
});


export default App;