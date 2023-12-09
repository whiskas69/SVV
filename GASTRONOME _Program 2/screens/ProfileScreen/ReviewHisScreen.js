import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from 'react';
import { firebase, auth, firestore } from "../../database/firebaseDB";
import { useFonts } from 'expo-font';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import comment from "../../components/CommentUser";

const ProfileScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  console.log("############################### HiSHISHIS page ###############################")
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.currentUser) {
          const username = auth.currentUser;
          const q = query(collection(firebase.firestore(), 'user'), where("email", '==', username.email));
          const history = query(collection(firebase.firestore(), 'comments'), where("email", '==', username.email));

          const userDataRef = onSnapshot(q, (querySnapshot) => {
            const userData = querySnapshot.docs[0].data();
            setData([userData]);
          });

          const historyDataRef = onSnapshot(history, (historySnapshot) => {
            const result = [];
            
            historySnapshot.forEach((history) => {
              
              result.push(history.data());
              
            });
            setData(result);
            setHistoryData(result)
            
          });

          return () => {
            userDataRef();
            historyDataRef();
          };
        }
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    const unsubscribe = fetchData();

    return () => {
      unsubscribe();
    };
  }, []);
  console.log("------------        history pls        ----------------")
  console.log("dataaaa", data)
  console.log("historyData 2", historyData)
  console.log("starr9,", data.rating)
  console.log("6789999", data[0])
  return (
    <View style={styles.container}>
      <FlatList
        data={historyData}
        renderItem={comment}
        numColumns={1}
        keyExtractor={(item, index) => `${item.email}_${index}`}
        style={{ marginBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4EEEE",
  },
  review: {
    height: 330,
    width: 370,
    borderRadius: 10,
    padding: 10,
    height: responsiveHeight(30),
    backgroundColor: 'white',
    margin: 10,
  },
});

export default ProfileScreen;
