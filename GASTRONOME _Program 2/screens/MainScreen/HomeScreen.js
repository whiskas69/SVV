import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView, Button, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

import { firebase, auth, firestore } from '../../database/firebaseDB';
import { collection, query, orderBy, getDocs, QuerySnapshot, onSnapshot } from 'firebase/firestore';

import ShowProduct from '../../components/ShowProduct';
import Carousel from '../../components/RestaurantCarousel';

const HomeScreen = ({ navigation, route }, props) => {
    const [filter, setFilter] = useState("");
    const [datarec, setDatarec] = useState("");
    const [datanew, setDatanew] = useState("");
    const [datasort, setDatasort] = useState("");
    const [alldata, setalldata] = useState("");
    const [searchText, setSearchText] = useState('');
    const [showView, setShowView] = useState(false);

    //search
    const SearchData = async () => {

        const q = query(collection(firebase.firestore(), "Restaurant"));
        const querySnapshot = await getDocs(q);
        const restaurantData = [];
        const restaurantAll = [];
        var i;

        for (i = 0; i < querySnapshot.size; i++) {
            const restaurant = querySnapshot.docs[i].data().category;
            if (restaurant === alldata) {

                const dataPro = querySnapshot.docs[i].data();
                const dataAll = {
                    name: dataPro.name,
                    id: querySnapshot.docs[i].id,
                    detail: dataPro.detail,
                    picture: dataPro.picture,
                    rating: dataPro.rating,
                    review: dataPro.review,
                    telephone: dataPro.telephone,
                    categories_name: dataPro.categories_name
                }
                restaurantData.push(dataAll);
            }

            else {
                const dataPro = querySnapshot.docs[i].data();
                const dataAll = {
                    name: dataPro.name,
                    id: querySnapshot.docs[i].id,
                    detail: dataPro.detail,
                    picture: dataPro.picture,
                    rating: dataPro.rating,
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
            setFilter(filteredData)
        }

        else {
            const filteredData = restaurantData.filter(item =>
                item.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilter(filteredData)
        }

        console.log('filter', filter);
        console.log('searchtext', searchText)

        if (filter == "" || searchText == "") {
            setShowView(false);
        } else if (filter != "") {
            setShowView(true);
        }
    }

    useEffect(() => {
        console.log("cate", alldata);

        const q = query(collection(firebase.firestore(), 'Restaurant'), orderBy('rating', 'desc'));
        // Create a real-time listener to fetch and update data
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const restaurantData = [];
            const restaurantAll = [];

            snapshot.forEach((doc) => {
                const dataPro = doc.data();
                const dataAll = {
                    name: dataPro.name,
                    id: doc.id,
                    detail: dataPro.detail,
                    picture: dataPro.picture,
                    rating: dataPro.rating,
                    review: dataPro.review,
                    telephone: dataPro.telephone,
                    categories_name: dataPro.categories_name,
                };
                if (dataPro.category === alldata) {
                    restaurantData.push(dataAll);
                } else {
                    restaurantAll.push(dataAll);
                }
            });

            if (restaurantAll.length === snapshot.size) {
                setDatarec(restaurantAll);
            } else {
                setDatarec(restaurantData);
            }
        });

        const m = query(collection(firebase.firestore(), 'Restaurant'));
        // Create a real-time listener to fetch and update data
        const unsubscribe2 = onSnapshot(m, (snapshot) => {
            const restaurantData = [];
            const restaurantAll = [];

            snapshot.forEach((doc) => {
                const dataPro = doc.data();
                const dataAll = {
                    name: dataPro.name,
                    id: doc.id,
                    detail: dataPro.detail,
                    picture: dataPro.picture,
                    rating: dataPro.rating,
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
                setDatanew(restaurantAll);
            } else {
                setDatanew(restaurantData);
            }
        });

        const n = query(collection(firebase.firestore(), 'Restaurant'), orderBy('name', 'asc'));
        // Create a real-time listener to fetch and update data
        const unsubscribe3 = onSnapshot(n, (snapshot) => {
            const restaurantData = [];
            const restaurantAll = [];

            snapshot.forEach((doc) => {
                const dataPro = doc.data();
                const dataAll = {
                    name: dataPro.name,
                    id: doc.id,
                    detail: dataPro.detail,
                    picture: dataPro.picture,
                    rating: dataPro.rating,
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
            unsubscribe();
            unsubscribe2();
            unsubscribe3();
        };

    }, [alldata])


    const renderedItem = (itemData) => {
        return (
            <Carousel
                title={itemData.item.name}
                pic={itemData.item.picture}
                rating={itemData.item.rating}
                categories_name={itemData.item.categories_name}
                telephone={itemData.item.telephone}

                onSelectProduct={() => {
                    navigation.navigate("Detail", { title: itemData.item.name, pic: itemData.item.picture, detail: itemData.item.detail, id: itemData.item.id, rating: itemData.item.rating, review: itemData.item.review, categories_name: itemData.item.categories_name, telephone: itemData.item.telephone });
                }}
            />
        );
    }

    const rendersearch = (itemData) => {
        return (
            <ShowProduct
                title={itemData.item.name}
                pic={itemData.item.picture}
                rating={itemData.item.rating}
                categories_name={itemData.item.categories_name}
                telephone={itemData.item.telephone}

                onSelectProduct={() => {
                    navigation.navigate("Detail", { title: itemData.item.name, pic: itemData.item.picture, detail: itemData.item.detail, id: itemData.item.id, rating: itemData.item.rating, review: itemData.item.review, categories_name: itemData.item.categories_name, telephone: itemData.item.telephone,has: "มีแล้ว"    });
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

                <Text style={styles.textmain} onPress={() => { navigation.navigate("Recommend") }} >ร้านอาหารยอดนิยม {'>'}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FlatList
                        data={datarec}
                        renderItem={renderedItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </ScrollView>

                <Text style={styles.textmain} onPress={() => { navigation.navigate("New") }} >ร้านอาหารใหม่ {'>'}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FlatList
                        data={datanew}
                        renderItem={renderedItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </ScrollView>

                <Text style={styles.textmain} onPress={() => { navigation.navigate("Interest") }} >ร้านอาหารตามตัวอักษร {'>'}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FlatList
                        data={datasort}
                        renderItem={renderedItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
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
    textmain: {
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20
    },
    cat: {
        alignItems: 'center',
        marginRight: 10
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    catagory: {
        width: 40,
        height: 40,
        borderRadius: 10,

    },
    catTitle: {
        fontSize: 14,
        fontWeight: 'light',
        marginHorizontal: 10,
        marginTop: 5
    },
});


export default HomeScreen;