import React, { useState, useEffect, } from "react";
import { StyleSheet, Text, View, Pressable, TouchableHighlight } from 'react-native';
import { Input, } from "react-native-elements";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { firebase, firestore } from "../../database/firebaseDB";

const ChangePassword = ({ navigation }) => {

  const user = firebase.auth().currentUser;
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setid] = useState("");
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);

  const fetchData = () => {
    const collectionRef = firebase.firestore().collection("user");
    collectionRef
      .where("email", "==", user.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setid(doc.id);
          setUsername(data.username);
          setEmail(data.email);
          setPassword(data.password);
          setProfile(data.profile);
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  useEffect(() => {
    fetchData();
}, []);


  const editPassword = (passwordNew) => {
    const userRef = firebase.firestore().collection("user").doc(id);
  
    userRef
      .update({
        password: passwordNew,
      })
      .then(() => {
        console.log("Updating Alert", "The password was updated successfully.");
        navigation.navigate("Profile");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const RegisterSchema = Yup.object().shape({
    passwordNew: Yup.string().min(6, 'ตัวอักษรขั้นต่ำ 6 ตัว').required('กรุณากรอกรหัสผ่าน'),
    ConfirmPassword: Yup.string().min(6).oneOf([Yup.ref('passwordNew')], "ยืนยันรหัสผ่านไม่ถูกต้อง").required("กรุณายืนยันรหัสผ่าน"),
  });


  return (
    <Formik
      initialValues={{
        passwordNew: '',
        ConfirmPassword: ''
      }}
      validationSchema={RegisterSchema}>

      {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
        <View style={styles.container}>
          <View style={styles.new}>
            <Text style={{ color: "#176B87", marginLeft: 10, marginTop: 15 }}>รหัสผ่านใหม่</Text>
            <Input
              style={styles.input}
              placeholder={"รหัสผ่านใหม่"}
              value={values.passwordNew}
              secureTextEntry={true}
              onChangeText={handleChange('passwordNew')}
              onBlur={() => setFieldTouched('passwordNew')}
            />
            {touched.passwordNew && errors.passwordNew && (
              <Text style={{ color: 'red' }}>{errors.passwordNew}</Text>
            )}
          </View>
          <View style={styles.confirm}>
            <Text style={{ color: "#176B87", marginLeft: 10, marginTop: 15 }}>ยืนยันรหัสผ่านใหม่</Text>
            <Input
              style={styles.input}
              placeholder='ยืนยันรหัสผ่าน'
              secureTextEntry={true}
              value={values.ConfirmPassword}
              onChangeText={handleChange('ConfirmPassword')}
              onBlur={() => setFieldTouched('ConfirmPassword')}
            />
            {touched.ConfirmPassword && errors.ConfirmPassword && (
              <Text style={{ color: 'red' }}>{errors.ConfirmPassword}</Text>
            )}
          </View>

          <TouchableHighlight style={styles.buttonSave} onPress={() => editPassword(values.passwordNew)}>
            <Text>บันทึก</Text>
          </TouchableHighlight>

        </View>

      )}

    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: "#F4EEEE",
  },
  aboutMe: {
    backgroundColor: "#FFDBAA",
    marginBottom: 25,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonSave: {
    backgroundColor: "#FFDBAA",
    marginTop: 100,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ChangePassword;
