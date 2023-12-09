import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Alert, TouchableHighlight, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/core';
import { TextInput } from 'react-native-paper';
import { Input } from 'react-native-elements';

import { AntDesign, Fontisto } from '@expo/vector-icons';
import iconfood from '../../assets/pic/iconfood.png';
import { auth, firebase, firestore } from '../../database/firebaseDB';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Formik } from 'formik';
import * as Yup from 'yup';

const RegistrationScreen = () => {
  const navigation = useNavigation()

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")

      }
    })

    return unsubscribe
  }, [])


  const onRegister = (email, password, username, values) => {

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);

        const userData = {
          email: user.email,
          username: username,
          password: password,
          profile: "https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png",
        };

        addDoc(collection(firestore, 'user'), userData)
          .then(() => {
            console.log('User data added to Firestore');
          })
          .catch(error => {
            console.error('Error adding user data to Firestore:', error);
          });
      })
      .catch(error => {
        alert(error.message);
      });
  }

  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'ตัวอักษรขั้นต่ำ 4 ตัว')
      .max(20, 'ตัวอักษรสูงสุด 20 ตัว')
      .required('กรุณากรอกชื่อ'),
    email: Yup.string().email('อีเมลไม่ถูกต้อง').required('กรุณากรอกอีเมล'),
    password: Yup.string().min(6, 'ตัวอักษรขั้นต่ำ 6 ตัว').required('กรุณากรอกรหัสผ่าน'),
    ConfirmPassword: Yup.string().min(6).oneOf([Yup.ref('password')], "ยืนยันรหัสผ่านไม่ถูกต้อง").required("กรุณายืนยันรหัสผ่าน"),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        username: '',
        password: '',
        ConfirmPassword: ''
      }}
      validationSchema={RegisterSchema}>

      {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (

        <View style={styles.container}>

          <Image source={iconfood} style={styles.logo} />

          <Text style={{ fontSize: 20, marginBottom: "10%" }} > สมัครสมาชิก </Text>

          <View style={styles.searchSection}>
            <Input
              style={styles.input}
              placeholder='ชื่อ'
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={() => setFieldTouched('username')}
              leftIcon={<AntDesign name="user" size={24} color="black" />} />
            {touched.username && errors.username && (
              <Text style={{ color: 'red' }}>{errors.username}</Text>
            )}
          </View>

          <View style={styles.searchSection}>
            <Input
              style={styles.input}
              placeholder='อีเมล'
              keyboardType='email-address'
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              leftIcon={<Fontisto name="email" size={24} color="black" />} />
            {touched.email && errors.email && (
              <Text style={{ color: 'red' }}>{errors.email}</Text>
            )}
          </View>

          <View style={styles.searchSection}>
          <Input
            style={styles.input}
            placeholder='รหัสผ่าน'
            secureTextEntry={true}
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={() => setFieldTouched('password')}
            leftIcon={<AntDesign name="lock" size={24} color="black" />} />
          {touched.password && errors.password && (
            <Text style={{ color: 'red' }}>{errors.password}</Text>
          )}
          </View>

          <View style={styles.searchSection}>
          <Input
            style={styles.input}
            placeholder='ยืนยันรหัสผ่าน'
            secureTextEntry={true}
            value={values.ConfirmPassword}
            onChangeText={handleChange('ConfirmPassword')}
            onBlur={() => setFieldTouched('ConfirmPassword')}
            leftIcon={<AntDesign name="lock" size={24} color="black" />} />
          {touched.ConfirmPassword && errors.ConfirmPassword && (
            <Text style={{ color: 'red' }}>{errors.ConfirmPassword}</Text>
          )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableHighlight style={styles.button_login} onPress={() => onRegister(values.email, values.password, values.username)}>
              <Text style={styles.buttonTextLogin}>สมัครสมาชิก</Text>
            </TouchableHighlight>
            <Text style={styles.footerText}>เป็นสมาชิกแล้ว <Text onPress={() => navigation.replace("Login")} style={styles.footerLink}>เข้าสู่ระบบ</Text></Text>
          </View>
        </View>
      )}

    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
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
    // flexDirection: 'row',
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
});


export default RegistrationScreen;