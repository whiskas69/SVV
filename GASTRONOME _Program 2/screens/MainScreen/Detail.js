import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { FontAwesome, Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { auth, firebase, firestore } from "../../database/firebaseDB";

import { collection, query, where, getDocs, addDoc, onSnapshot, orderBy } from 'firebase/firestore';

import comment from "../../components/Comments";
import { Alert } from "react-native";

const DetailScreen = ({ navigation, route }) => {
    const [addComment, setAddComment] = useState('');
    const [getComments, setComments] = useState([]);
    const [store, setStore] = useState([]);

    console.log("route", route.params);

    const getStore = async () => {
        const q = query(collection(firebase.firestore(), 'user'), where('email', '==', route.params?.mail));
        const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs[0].data();
        setStore(userData)
    };

    const [defaultRating, setdefaultRating] = useState(0);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])
    const starImgFilled = 'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true'
    const starImgCorner = 'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true'

    const starIcons = [];

    for (let i = 0; i < 5; i++) {

        if (i < route.params.rating) {
            starIcons.push(
                <AntDesign key={i} name="star" size={25} color="orange" />
            );
        }

        else {
            starIcons.push(
                <AntDesign key={i} name="star" size={25} color="grey" />
            )
        }
    }


    //star
    const CustomRatingBar = () => {
        return (
            <View style={styles.customRatingBarStyle}>
                {
                    maxRating.map((item, key) => {
                        return (
                            <TouchableOpacity activeOpacity={0.7} key={item} onPress={() => setdefaultRating(item)} >
                                <Image source={item <= defaultRating ? { uri: starImgFilled } : { uri: starImgCorner }} style={styles.starImgStyle} />
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

        )
    }

    const queryRating = () => {
        const qComments = query(collection(firebase.firestore(), "comments"));

        const unsubscribe = onSnapshot(qComments, (querySnapshotComments) => {
            let rate = 0;
            let num = 0;

            querySnapshotComments.forEach((doc) => {
                const commentData = doc.data();
                if (commentData.RestaurantId === route.params.id) {
                    rate += commentData.rating;
                    num += 1;
                }
            });

            const meanRate = num > 0 ? Math.floor(rate / num) : 0;

            const productRef = firebase.firestore().collection('Restaurant').doc(route.params.id);
            productRef.update({
                rating: meanRate,
            })
                .then(() => {
                    console.log('Document updated successfully.');
                })
                .catch(error => {
                    console.error('Error updating document:', error);
                });
        });

        return unsubscribe; // To stop listening when the component unmounts
    };


    //addComment
    const AddComment = async () => {
        console.log("AddComment")
        const userEmail = auth.currentUser?.email;
        const q = query(collection(firebase.firestore(), 'user'), where('email', '==', userEmail));

        console.log(q)

        const querySnapshot = await getDocs(q);

        const userData = querySnapshot.docs[0].data();

        console.log("userData", userData);

        const name = userData.username;

        const currentDate = new Date(); // Get the current date and time

        // Create an array of month names for formatting
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Format the date and time
        const formattedDate = `${currentDate.getDate()}-${monthNames[currentDate.getMonth()]}-${currentDate.getFullYear()} ${currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

        const data = {
            id: auth.currentUser.uid,
            name: name,
            comment: addComment,
            time: formattedDate,
            RestaurantId: route.params.id,
            rating: defaultRating,
            imageProfile: userData.profile,
            email: userEmail
        };

        console.log("data", data);
        addDoc(collection(firestore, 'comments'), data)
            .then(() => {
                console.log('User data added to Firestore');
            })
            .catch(error => {
                console.error('Error adding user data to Firestore:', error);
            });

        queryRating();
        setAddComment("")
        setdefaultRating(0);
    }

    const addfav = async () => {
        const userEmail = auth.currentUser?.email;
        const q = query(collection(firebase.firestore(), 'user'), where('email', '==', userEmail));

        console.log(q)
        const querySnapshot = await getDocs(q);

        const userData = querySnapshot.docs[0].data();

        if (route.params.has === "ไม่อยากมี" || route.params.has == "มีแล้ว") {
            const delfav = firebase.firestore()
                .collection("favorite")
                .doc(route.params.id);
            delfav.delete().then(() => {
                Alert.alert(
                    "Delete Complete"
                )
            })
        } else if (typeof route.params.has === "undefined") {
            const data = {
                id: auth.currentUser.uid,
                email:auth.currentUser.email,
                name: route.params.title,
                detail: route.params.detail,
                RestaurantId: route.params.id,
                rating: defaultRating,
                picture: route.params.pic,
                review: route.params.review,
                telephone: route.params.telephone,
                categories_name: route.params.categories_name,
                has: 'มีแล้ว'
            };

            console.log("data fav", data);

            addDoc(collection(firestore, 'favorite'), data)
                .then(() => {
                    console.log('User fav added to Firestore');

                    alert("Add favorite secces")
                })
                .catch(error => {
                    alert('error');
                    console.error('Error adding user data to Firestore:', error);
                });
        }

    }

    const listenForRatingChanges = () => {
        const qComments = query(collection(firebase.firestore(), 'comments'));

        const unsubscribe = onSnapshot(qComments, (querySnapshotComments) => {
            let i = 0;
            let rate = 0;
            let num = 0;
            var meanRate = 0;

            for (i; i < querySnapshotComments.size; i++) {
                const commentId = querySnapshotComments.docs[i].data().RestaurantId;
                if (route.params.id === commentId) {
                    rate += querySnapshotComments.docs[i].data().rating;
                    num += 1;
                }
            }
            if (rate == 0) {
                meanRate = 0
            }

            else {
                meanRate = Math.floor(rate / num);
            }

            route.params.rating = meanRate;
            route.params.review = num;


        });

        return unsubscribe; // To stop listening when the component unmounts
    };

    useEffect(() => {
        const fetchData = async () => {
            console.log(route.params);

            const readRating = listenForRatingChanges();
            const commentsRef = query(collection(firebase.firestore(), 'comments'), orderBy('time', 'desc'));

            const unsubscribe = onSnapshot(commentsRef, (querySnapshot) => {
                const allRestaurant = [];

                querySnapshot.forEach((doc) => {
                    const commentData = doc.data();

                    if (commentData.RestaurantId === route.params.id) {
                        allRestaurant.push(commentData);
                    }
                });
                setComments(allRestaurant);
            });

            getStore();
            return () => {
                queryRating();
                if (readRating) {
                    readRating()
                }
                if (unsubscribe) {
                    unsubscribe()
                }
            };
        };

        fetchData(); // Call the async function



    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image source={{ uri: route.params.pic }} style={styles.picture} />
                <Text style={styles.name}>{route.params.title}</Text>
                <View style={styles.rating}>
                    <View style={styles.star}>
                        <Text style={{ color: 'white', textAlign: "center" }}>{route.params.rating}</Text>
                        <FontAwesome name="star" size={15} color="white" />
                    </View>

                    <Text>{route.params.review} รีวิว</Text>
                    <Pressable style={styles.fav} onPress={addfav}>
                        <Fontisto name="favorite" size={24} color="black" onPress={addfav} />
                        <Text>ชื่นชอบ</Text>
                    </Pressable>

                </View>
                <Text style={{ marginTop: 10, color: "gray" }}>{route.params.categories_name}</Text>
                <Text style={{ fontWeight: "bold", marginTop: 10 }}>รายละเอียด</Text>
                <Text style={{ marginTop: 10 }}>{route.params.detail}</Text>
                <Text>โทร : {route.params.telephone} </Text>
                <View style={{ borderTopWidth: 1, borderColor: 'gray', marginTop: 20, marginHorizontal: 20 }}>
                </View>

                <Text style={styles.comment}>เพิ่มความคิดเห็น</Text>

                {/* comments */}

                <View style={styles.addComment}>
                    <CustomRatingBar />

                    <View>
                        <TextInput style={[styles.input, {
                            flex: 1,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41,
                            elevation: 2,
                            paddingLeft: 20
                        }]}
                            multiline
                            numberOfLines={3}
                            maxLength={100000}
                            placeholder='พิมพ์ความคิดเห็นที่นี้'
                            onChangeText={text => setAddComment(text)} value={addComment} />

                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Pressable style={styles.submit} onPress={AddComment} disabled={addComment == ""}>
                                <Text>ส่งความคิดเห็น</Text>
                            </Pressable>
                        </View>
                    </View>

                </View>

                <FlatList
                    data={getComments}
                    renderItem={comment}
                    numColumns={1}
                    keyExtractor={(item, index) => `${item.RestaurantId}_${index}`}

                    style={{ marginBottom: 20 }}
                />

            </ScrollView >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        backgroundColor: "#F4EEEE",
    },
    picture: {
        width: "100%",
        height: 150,
        resizeMode: "cover"
    },
    name: {
        fontWeight: "bold",
        marginTop: 10,
        fontSize: 20
    },
    star: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        backgroundColor: "red",
        borderRadius: 5,
        padding: 5
    },
    rating: {
        flexDirection: "row",
        marginTop: 10,
        gap: 10,
        alignItems: "center"
    },
    fav: {
        flexDirection: "row",
        left: 170,
        gap: 10,
        alignItems: "center"
    },
    input: {
        borderColor: "gray",
        width: "90%",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5,
        backgroundColor: '#eee',
        fontSize: 16,
        height: responsiveHeight(10),
        marginHorizontal: '5%',
        fontFamily: 'Anuphan'
    },
    customRatingBarStyle: {
        marginLeft: 20,
        marginBottom: 10,
        flexDirection: 'row',

    },
    starImgStyle: {
        width: 25,
        height: 25,
        resizeMode: 'cover'
    },
    name: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 20
    },
    menurec: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: "bold"
    },
    comment: {
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    addComment: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        width: "100%",
    },
    submit: {
        backgroundColor: "#FFDBAA",
        borderRadius: 10,
        width: "90%",
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
    }
});

export default DetailScreen;