import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';

import { StyleSheet, View, TouchableHighlight, Text, TextInput, Alert, Image } from "react-native";
import { Input } from 'react-native-elements';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import iconfood from "../../assets/pic/iconfood.png";

import { auth } from '../../database/firebaseDB';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home");
      }
    })

    return unsubscribe
  }, [])

  const onLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Login', user.email);
      })
      .catch((error) => {
        alert("Email or Password wrong");
        console.log('Login', error);
      })
  }

  return (
    <View style={styles.contrainer}>
      {/* logo */}
      <Image source={iconfood} style={styles.logo} />

      <Text style={{ fontSize: 20, marginBottom: "10%" }}> เข้าสู่ระบบ </Text>

      <View style={styles.searchSection}>
        <Input
          placeholder='อีเมล'
          keyboardType='email-address'
          value={email}
          onChangeText={text => setEmail(text)}
          leftIcon={<Fontisto name="email" size={24} color="black" />} />
      </View>
      <View style={styles.searchSection}>
        <Input
          placeholder='รหัสผ่าน'
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
          leftIcon={<AntDesign name="lock" size={24} color="black" />} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight style={styles.button_login} onPress={() => onLogin()}>
          <Text style={styles.buttonTextLogin}>เข้าสู่ระบบ</Text>
        </TouchableHighlight>
        <Text style={styles.footerText}>ยังไม่เป็นสมาชิกหรอ? <Text onPress={() => navigation.replace("Register")} style={styles.footerLink}>สมัครสมาชิก</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contrainer: {
    flex: 1,
    backgroundColor: "#f4eeee",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4eeee',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    marginTop: '30%',
    marginBottom: '5%'
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4eeee',
    width: "80%"
  },
  button_login: {
    height: 50,
    width: 300,
    backgroundColor: '#3f2406',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 5,
  },
  buttonTextLogin: {
    color: '#f4eeee',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 16,
    color: '#3f2406'
  },
  footerLink: {
    color: "#93adc6",
    fontWeight: "bold",
    fontSize: 16
  },
})

export default LoginScreen;