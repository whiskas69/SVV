import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const comment = (props) => {
    console.log("pyt", props)
    const starIcons = [];

    for (let i = 0; i < 5; i++) {

        if (i < props.item.rating) {
            starIcons.push(
                <AntDesign key={i} name="star" size={16} color="orange" />
            );
        }

        else {
            starIcons.push(
                <AntDesign key={i} name="star" size={16} color="grey" />
            )
        }
    }



    return (
        <View style={{ marginVertical: 10}}>
            <View style={styles.container}>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <Image source={{ uri: props.item.imageProfile }} style={[styles.account]} />
                    <View>
                        <Text style={{ fontSize: 16, marginTop: 5, marginLeft: 10 }}>{props.item.name}</Text>
                        <View>
                            <View style={{ flexDirection: "row", marginLeft: 10 }}>{starIcons}</View>
                        </View>
                    </View>
                    <View>
                        <Text style={{ marginLeft: 70, marginTop: 25 }}>{props.item.time}</Text>
                    </View>
                </View>
                <View style={{ borderTopWidth: 1, borderColor: 'gray', marginTop: 20, marginHorizontal: 20 }}>
                </View>
                <View style={styles.account}>
                    <Text style={{ fontSize: 16, marginLeft: 20, marginTop: 20, width:"100%"}}>{props.item.comment}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingBottom: 20
    },
    review: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        margin: 10,
    },
    account: {
        width: responsiveWidth(10),
        height: responsiveWidth(10),
        borderRadius: 50,
        marginLeft: 20,
    },
    content: {
        paddingHorizontal: '19%',
        fontSize: 16,
        fontWeight: 'light',
        textAlign: 'left',
        lineHeight: 20,
        fontFamily: 'Anuphan'

    },
});


export default comment;