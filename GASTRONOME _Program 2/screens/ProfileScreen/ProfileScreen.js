import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { firebase, auth } from "../../database/firebaseDB";
import { collection, query, where, onSnapshot } from "firebase/firestore";


const ProfileSceen = ({ navigation }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const userData = async () => {
            try {
                if (auth.currentUser) {
                    const userEmail = auth.currentUser.email;//email, uid,
                    const q = query(collection(firebase.firestore(), 'user'), where('email', '==', userEmail));
                    const userDataRef = onSnapshot(q, (querySnapshot) => {
                        const userData = querySnapshot.docs[0].data();
                        setData(userData);
                        console.log("dataaaaaaa", userData)
                    });

                    return () => {
                        userDataRef();
                    };
                }
            } catch (error) {
                console.error('Error fetching data from Firestore:', error);
            }
        };

        const unsubscribe = userData();

        return () => {
            unsubscribe();
        };

    }, []);

    const handleLogout = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => console.log(error.message))
    }
    console.log("daTAA1: ", data)

    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', marginBottom: 25, marginTop: 5, }}>
                {data.profile ? (
                    <Image
                        source={{ uri: data.profile }}
                        style={{ width: 80, height: 80, marginLeft: 20, borderRadius:100 }}
                    />
                ) : null}

                <View style={{ marginTop: 25, marginLeft: 20, }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', }}>{data.username}</Text>
                </View>
            </View>

            <Pressable style={styles.aboutMe} onPress={() => navigation.navigate('History')}>
                <Text style={{ marginLeft: 25 }}>ประวัติการรีวิว</Text>
                <Text style={{ marginLeft: 185 }}> {'>'} </Text>
            </Pressable>

            <Pressable style={styles.aboutMe} onPress={() => navigation.navigate("Edit")}>
                <Text style={{ marginLeft: 25, }}>แก้ไขข้อมูลส่วนตัว</Text>
                <Text style={{ marginLeft: 165, }}> {'>'} </Text>
            </Pressable>

            <Pressable style={styles.aboutMe} onPress={() => navigation.navigate('Password')}>
                <Text style={{ marginLeft: 25, }}>เปลี่ยนรหัสผ่าน</Text>
                <Text style={{ marginLeft: 185, }}> {'>'} </Text>
            </Pressable>
            
            <Pressable style={styles.aboutMe} onPress={() => navigation.navigate('AddRest')}>
                <Text style={{ marginLeft: 25, }}>สร้างร้านอาหาร</Text>
                <Text style={{ marginLeft: 185, }}> {'>'} </Text>
            </Pressable>

            <Pressable style={styles.buttonLogout} onPress={handleLogout}>
                <Text style={{ color: "red", }}>ออกจากระบบ</Text>
            </Pressable>

        </View>
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
    buttonLogout: {
        backgroundColor: "#FFDBAA",
        marginTop: 100,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ProfileSceen;
