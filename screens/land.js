import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from './Colors';

const LoginPage = ({navigation}) => {

  const login = async () => {
    navigation.navigate('Login');
  }

  const register = async () => {
    navigation.navigate('Reg');
  }

  return (
    <View style={styles.container}>
      {/* Top section with logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')} // Replace with the path to your logo image
          style={styles.logo}
        />
      </View>

      {/* Bottom section with sign in and sign up buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.signinbutton} onPress={() => {login()}}>
          <Text style={styles.signinbuttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.signUpButton]} onPress={() => {register()}}>
          <Text style={styles.signupbuttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: Colors.dark, 
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  signinbutton: {
    backgroundColor: Colors.green,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.green,
  },
  signinbuttonText: {
    color: Colors.dark,
    fontSize: 18,
  },
  signupbuttonText: {
    color: Colors.green,
    fontSize: 18,
  },
});

export default LoginPage;
