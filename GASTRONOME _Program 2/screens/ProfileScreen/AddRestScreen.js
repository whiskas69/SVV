import React, { useState } from "react";
import { StyleSheet, View, TouchableHighlight, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { firebase, storage } from "../../database/firebaseDB";
import iconfood from '../../assets/pic/iconfood.png';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const AddRestScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [rating] = useState(0);
  const [review] = useState(0);
  const [picture, setPicture] = useState(null);
  const [isImageError, setIsImageError] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets)
    if (result.assets == null) {
      setIsImageError(true)
    }
    const source = { uri: result.assets[0].uri };

    setPicture(source);
    if (source == "") {
      setIsImageError(true)
    }

    if (!result.canceled) {
      setPicture(result.uri);
    }
  }

  const addRest = async () => {
    if (!name || !detail || !telephone || !picture) {
      alert("โปรดกรอกข้อมูลให้ครบถ้วน");
      return;
    }
    const restaurantData = {
      name: name,
      detail: detail,
      telephone: telephone,
      rating: rating,
      review: review,
      picture: "", // เราจะอัปโหลดรูปภาพเป็น URL ในคอลเลคชัน
    };
    try {
      const response = await fetch(picture);
      const blob = await response.blob();
      const filename = Date.now() + '.jpg';
      const imageRef = ref(storage, filename);
      await uploadBytes(imageRef, blob);

      const downloadURL = await getDownloadURL(imageRef);

      restaurantData.picture = downloadURL;

      await firebase.firestore().collection("Restaurant").add(restaurantData);

      alert("เพิ่มร้านอาหารเรียบร้อย");
      setName("");
      setDetail("");
      setTelephone("");
      setPicture(null);
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการเพิ่มร้านอาหาร: " + error);
    }
  };
  return (
    <View style={styles.container}>
      <Image source={iconfood} style={styles.logo} />
      <Input
        placeholder='ชื่อร้านอาหาร'
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <Input
        placeholder='รายละเอียด'
        onChangeText={(text) => setDetail(text)}
        value={detail}
      />
      <Input
        placeholder='เบอร์ติดต่อ'
        onChangeText={(text) => setTelephone(text)}
        value={telephone}
      />
      <ImageBackground
        source={{ uri: picture }}
        style={{ resizeMode: 'cover', width: 100, height: 100 }}
      >
        <TouchableOpacity
          style={[{ marginTop: 20, marginBottom: 10 }]}
          onPress={pickImage}>
        </TouchableOpacity>
      </ImageBackground>
      <Text style={{ color: "#176B87", fontSize: 16, marginBottom: 20 }} onPress={pickImage}>เพิ่มรูปร้านอาหาร</Text>

      <TouchableHighlight style={styles.button_login} onPress={() => addRest()}>
        <Text style={styles.buttonTextLogin}>เพิ่มร้านอาหาร</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4EEEE",
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    marginBottom: '5%'
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

});

export default AddRestScreen;