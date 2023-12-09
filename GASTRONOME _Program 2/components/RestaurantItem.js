import React from "react";
import { Alert ,View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const RestaurantItem = (props) => {
    return (
            <TouchableOpacity style={styles.cardContainer} onPress={props.onSelectProduct}>
                <View style={styles.card}>
                    <View style={styles.Imagebox}>
                        <Image source={{ uri: props.pic }}
                            style={styles.Image}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <View style={styles.maintext}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 10 }}>{props.title}</Text>
                            <Text style={{ fontSize: 13, color: 'gray', marginLeft: 10 }}>{props.categories_name}</Text>
                        </View>
                        <Text style={{ fontSize: 15, height: 30, width: 60, alignItems: 'center' }}>เรตติ้ง {props.rating}</Text>
                    </View>
                </View>
            </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    card: {
        width: "100%",
        height: 180,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,

    },
    Imagebox: {
        width: "100%",
        height: 120,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden'
    },
    Image: {
        width: "100%",
        height: 120,
        resizeMode: 'cover'
    },
    cardContainer: {
        marginBottom: 10
    }
});

export default RestaurantItem;