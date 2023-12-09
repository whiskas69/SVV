import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Alert, Input, ScrollView } from 'react-native';
import { firebase, storage } from '../../database/firebaseDB';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc, } from "firebase/firestore";

const EditUser = ({ navigation }) => {
    console.log("############################### editUser page ###############################")
    const [id, setid] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [data, setData] = useState([]);
    const [profile, setProfile] = useState(null);
    const [isImageError, setIsImageError] = useState(false);
    const user = firebase.auth().currentUser;

    const fetchData = () => {
        const collectionRef = firebase.firestore().collection("user");
        collectionRef.get()
            .then((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((res) => {
                    let info = res.data();
                    if (info.email === user.email) {
                        items.push({
                            key: res.id,
                            username: info.username,
                            email: info.email,
                            profile: info.profile
                        });
                        setid(res.id)
                        setUsername(info.username)
                        setEmail(info.email)
                        setProfile({ uri: info.profile })
                    }
                });
                setData(items);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                console.log("finally")
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

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

        setProfile(source);
        if (source == "") {
            setIsImageError(true)
        }
    }

    console.log("setProfile", profile)

    console.log("data ::::::", data);
    const updateUser = async () => {
        console.log(id)
        const blob = await fetch(profile.uri).then((response) => response.blob());
        const filename = Date.now() + '.jpg';
        const imageRef = ref(storage, filename);

        await uploadBytes(imageRef, blob);

        const downloadURL = await getDownloadURL(imageRef);
        try {
            const userRef = doc(firebase.firestore(), "user", id);
            await updateDoc(userRef, {
                id: id,
                username: username,
                email: email,
                profile: downloadURL
            });
            await user.updateProfile({
                profile: downloadURL,
            });
            console.log("อัปเดตข้อมูลเรียบร้อยแล้ว");
            Alert.alert(
                "Update Success",
                "New information was updated!!",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.navigate('Profile');
                        },
                    },
                ]
            );
        } catch (e) {
            console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", e);
        }
    };
    return (
        <ScrollView style={{ height: '100%', backgroundColor: '#F4EEEE'}}>
            <View style={styles.container}>
            <ImageBackground
                        source={profile ? { uri: profile.uri } : null}
                        style={{ resizeMode: 'cover', marginLeft: 20, marginTop: 100, width: 200, height: 200,  }}
                        >
                        <TouchableOpacity style={[styles.selectImage, { marginTop: 20, marginBottom: 10, }]}onPress={pickImage}></TouchableOpacity>
                    </ImageBackground>

                    <Text style={{ color: "#176B87", fontSize: 16, marginTop: 20, marginBottom: 20 }}>คลิกที่รูปเพื่อแก้ไข</Text>
                
             
            <TextInput style={styles.input} placeholder='Username'
                    value={username}
                    onChangeText={(val) => setUsername(val)} />
                
                <TextInput
                    multiline
                    style={[styles.input,]}
                    placeholder='Email'
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                    editable={false} />

                <TouchableOpacity style={styles.confirm} onPress={updateUser}>
                    <Text style={styles.buttonText}>ยืนยัน</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#F4EEEE',
    },
    input: {
        fontSize: 18,
        width: "80%",
        borderBottomWidth: 1,
        padding: 5,
        paddingVertical: 10,
        marginBottom: 15,
    },
    confirm: {
        backgroundColor: "#FFDBAA",
        marginTop: 100,
        height: 50,
        width: '90%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectImage: {
        padding: 50,
        marginBottom: 15,
        justifyContent: "center",
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});


export default EditUser;

