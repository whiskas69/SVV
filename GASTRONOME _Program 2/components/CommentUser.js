import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const comment = (props) => {
    
    const starIcons = [];
  
    for (let i = 0; i < 5; i++) {

        if(i < props.item.rating){
            starIcons.push(
              <AntDesign key={i} name="star" size={24} color="orange" />
            );
        }
        else{
            starIcons.push(
              <AntDesign key={i} name="staro" size={24} color="orange" />
            )
        }
    }
   
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'colum', marginTop: 20 }}>
                <View style={styles.review}>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        {starIcons}
                        <View style={styles.date}>
                            <Text style={{ marginLeft: 90, }}>{props.item.time}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: "center", marginTop: 10, }}>
                        <Text style={{ width: 320, marginBottom: 30 }}>{props.item.comment}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4EEEE",
    },
    review: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        margin: 10,
    },
});


export default comment;