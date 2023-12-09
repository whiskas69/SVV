import React, { Component, useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, FlatList } from "react-native";
import { auth, firebase, firestore } from "../../database/firebaseDB";
import { AntDesign } from "@expo/vector-icons";

import { collection, query, orderBy, getDocs, QuerySnapshot, onSnapshot, where } from 'firebase/firestore';

import ShowProduct from '../../components/ShowProduct';
import RestaurantItem from "../../components/RestaurantfavItem "


const FavoriteSceen = ({ navigation, route }, props) => {
    const [filter, setfilter] = useState("");
    const [datasort, setDatasort] = useState("");
    const [alldata, setalldata] = useState("");
    const [searchText, setSearchText] = useState('');
    const [showView, setShowView] = useState(false);

    //search
    const SearchData = async () => {
        const myemail = auth.currentUser.email;

        const q = query(collection(firebase.firestore(), "favorite"), where("email", '==', myemail));
        const querySnapshot = await getDocs(q);
        const restaurantData = [];
        const restaurantAll = [];
        var i;

        for (i = 0; i < querySnapshot.size; i++) {
            const restaurant = querySnapshot.docs[i].data().category;
            if (restaurant === alldata) {

                const dataPro = querySnapshot.docs[i].data();
                const dataAll = {
                    id: querySnapshot.docs[i].id,
                    email: dataPro.email,
                    name: dataPro.name,
                    detail: dataPro.detail,
                    ProductId: dataPro.ProductId,
                    rating: dataPro.rating,
                    picture: dataPro.picture,
                    review: dataPro.review,
                    telephone: dataPro.telephone,
                    categories_name: dataPro.categories_name
                }
                restaurantData.push(dataAll);
            }

            else {
                const dataPro = querySnapshot.docs[i].data();
                const dataAll = {
                    id: querySnapshot.docs[i].id,
                    email: dataPro.email,
                    name: dataPro.name,
                    detail: dataPro.detail,
                    ProductId: dataPro.ProductId,
                    rating: dataPro.rating,
                    picture: dataPro.picture,
                    review: dataPro.review,
                    telephone: dataPro.telephone,
                    categories_name: dataPro.categories_name
                }
                restaurantAll.push(dataAll)
            }
        }


        if (restaurantAll.length == querySnapshot.size) {
            const filteredData = restaurantAll.filter(item =>
                item.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setfilter(filteredData)
        }

        else {
            const filteredData = restaurantData.filter(item =>
                item.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setfilter(filteredData)
        }

        console.log('filter', filter);
        console.log('searchtext', searchText)

        if (filter == "" || searchText == "") {
            console.log("1")
            setShowView(false);
        } else if (filter != "") {
            setShowView(true);
            console.log("2")
        }
    }

    useEffect(() => {
        const myemail = auth.currentUser.email;

        const n = query(collection(firebase.firestore(), 'favorite'), where("email", '==', myemail));
        // Create a real-time listener to fetch and update data
        const unsubscribe = onSnapshot(n, (snapshot) => {
            const restaurantData = [];
            const restaurantAll = [];

            snapshot.forEach((doc) => {
                const dataPro = doc.data();
                const dataAll = {
                    id: doc.id,
                    email:dataPro.email,
                    name: dataPro.name,
                    detail: dataPro.detail,
                    ProductId: dataPro.ProductId,
                    rating: dataPro.rating,
                    picture: dataPro.picture,
                    review: dataPro.review,
                    telephone: dataPro.telephone,
                    categories_name: dataPro.categories_name
                };
                if (dataPro.category === alldata) {
                    restaurantData.push(dataAll);
                } else {
                    restaurantAll.push(dataAll);
                }
            });

            if (restaurantAll.length === snapshot.size) {
                setDatasort(restaurantAll);
            } else {
                setDatasort(restaurantData);
            }
        });

        return () => {
            // Unsubscribe from the real-time listener when the component unmounts
            unsubscribe();
        };

    }, [alldata])

    console.log("------------        fav pls        ----------------")
    console.log("data", alldata);

    const renderedItem = (itemData) => {
        return (
            <RestaurantItem
                title={itemData.item.name}
                pic={itemData.item.picture}
                review={itemData.item.review}
                categories_name={itemData.item.categories_name}
                telephone={itemData.item.telephone}

                onSelectProduct={() => {
                    navigation.navigate("Detail", { title: itemData.item.name, pic: itemData.item.picture, detail: itemData.item.detail, id: itemData.item.id, rating: itemData.item.rating, review: itemData.item.review, categories_name: itemData.item.categories_name, telephone: itemData.item.telephone, has: "ไม่อยากมี" });
                }}
            />
        );
    }

    const rendersearch = (itemData) => {
        return (
            <ShowProduct
                title={itemData.item.name}
                pic={itemData.item.picture}
                review={itemData.item.review}
                categories_name={itemData.item.categories_name}
                telephone={itemData.item.telephone}

                onSelectProduct={() => {
                    navigation.navigate("Detail", { title: itemData.item.name, pic: itemData.item.picture, detail: itemData.item.detail, id: itemData.item.id, rating: itemData.item.rating, review: itemData.item.review, categories_name: itemData.item.categories_name, telephone: itemData.item.telephone, has: "ไม่อยากมี" });
                }}
            />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.input} >
                <TextInput style={{ width: '100%' }} placeholder="ค้นหา" onChangeText={text => setSearchText(text)} value={searchText} />
                <AntDesign style={styles.searchIcon} name="search1" size={26} color={'gray'} onPress={() => SearchData(alldata)} />
            </View>
            <ScrollView>
                {showView && ( // สร้าง View จาก showView ถ้าค่าเป็น true
                    <FlatList
                        data={filter}
                        renderItem={rendersearch}
                    />
                )}
                <ScrollView>
                    <FlatList
                        data={datasort}
                        renderItem={renderedItem}

                    />
                </ScrollView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4EEEE',
        marginRight: 10,
        marginLeft: 10
    },
    input: {
        width: "100%",
        borderRadius: 20,
        marginVertical: 10,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
    },
    searchIcon: {
        padding: 5,
        position: 'absolute',
        top: 0,
        right: 5,
    },
    containercard: {
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    card: {
        width: 370,
        height: 180,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
    },
    Imagebox: {
        width: 370,
        height: 120,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden'
    },
    Image: {
        width: 370,
        height: 120,
        resizeMode: 'cover'
    },
    cardContainer: {
        marginLeft: 12,
        marginBottom: 10
    }
});

export default FavoriteSceen;