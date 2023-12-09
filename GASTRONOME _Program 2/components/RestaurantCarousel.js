import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { FontAwesome, Fontisto } from '@expo/vector-icons';

const Carousel = (props) => {
    return (
        <TouchableOpacity style={{ marginLeft: 5, marginRight: 5 }} onPress={props.onSelectProduct}>
            <View style={styles.card}>
                <View style={styles.imageBox}>
                    <Image source={{ uri: props.pic }} style={styles.image} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, flexWrap: 'wrap' }}>
                    <View style={styles.maintext}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 10 }}>{props.title}</Text>
                        <Text style={{ fontSize: 11, color: 'gray', marginLeft: 10 }}>{props.categories_name}</Text>
                    </View>
                    <Text style={styles.review}>
                        เรตติ้ง {props.rating}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 200,
        backgroundColor: "#ffff",
        borderRadius: 5,
        marginBottom: 5
    },
    imageBox: {
        width: 150,
        height: 113,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        overflow: "hidden"
    },
    image: {
        width: 150,
        height: 113,
        resizeMode: "cover"
    },
    review: {
        fontSize: 11,
        position: 'absolute',
        right: 10,
        bottom: -1
    }
});

export default Carousel;