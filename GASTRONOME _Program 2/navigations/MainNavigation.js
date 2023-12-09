import React, { useState, useEffect } from "react";
import { firebase } from "../database/firebaseDB";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import BeforeScreen from "../screens/LoginScreen/BeforeScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegisterScreen from "../screens/LoginScreen/RegisterScreen";
import HomeScreen from "../screens/MainScreen/HomeScreen";
import Recommend from "../screens/RestaurantScreen/RecommendScreen"
import Interest from "../screens/RestaurantScreen/InterestScreen";
import New from "../screens/RestaurantScreen/NewScreen";
import ProfileSceen from "../screens/ProfileScreen/ProfileScreen";
import ReviewHistoryScreen from "../screens/ProfileScreen/ReviewHisScreen"
import EditProfileScreen from "../screens/ProfileScreen/EditProfileScreen"
import ChangPassword from "../screens/ProfileScreen/ChangePasswordScreen"
import DetailSceen from "../screens/MainScreen/Detail";
import Categories from "../screens/MainScreen/CategoryScreen";
import AddRestScreen from "../screens/ProfileScreen/AddRestScreen";
import FavoriteSceen from "../screens/MainScreen/FavoritScreen";
import CookedToOrder from "../screens/RestaurantScreen/CookedToOrder"
import Drink from "../screens/RestaurantScreen/Drink";
import Noodle from "../screens/RestaurantScreen/Noodle";
import PorkPanAndShabu from "../screens/RestaurantScreen/PorkPanAndShabu";
import Snack from "../screens/RestaurantScreen/Snack.js";
import Sweet from "../screens/RestaurantScreen/Sweet.js";

const HomeNavigator = createNativeStackNavigator();
const CategoryNavigator = createNativeStackNavigator();
const FavoriteNavigator = createNativeStackNavigator();
const ProfileNavigator = createNativeStackNavigator();
const BottomNavigator = createBottomTabNavigator();
const LoginNavigator = createNativeStackNavigator();

function LoginNavigation() {
    return (
        <NavigationContainer>
            <LoginNavigator.Navigator
                initialRouteName="Before"
                screenOptions={{
                    headerStyle: { backgroundColor: "#3F2305" },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    headerShown: false,
                    tabBarShowLabel: false
                }}>
                <LoginNavigator.Screen
                    name="Before"
                    component={BeforeScreen}
                    options={{ headerShown: false }}
                />
                <LoginNavigator.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <LoginNavigator.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />
                <LoginNavigator.Screen
                    name="Home"
                    component={BottomNavigation}
                />
            </LoginNavigator.Navigator>
        </NavigationContainer>
    );
}

function HomeNavigation() {
    return (
        <HomeNavigator.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerStyle: { backgroundColor: "#3F2305" },
                headerTintColor: "white",
                headerTitleAlign: "center"
            }}>
            <HomeNavigator.Screen
                name="Main"
                component={HomeScreen}
                options={{
                    title: "หน้าหลัก"
                }} />
            <HomeNavigator.Screen
                name="Recommend"
                component={Recommend}
                options={{
                    title: "ร้านอาหารยอดนิยม"
                }} />
            <HomeNavigator.Screen
                name="Interest"
                component={Interest}
                options={{
                    title: "ร้านอาหารน่าสนใจ"
                }} />
            <HomeNavigator.Screen
                name="New"
                component={New}
                options={{
                    title: "ร้านอาหารใหม่"
                }} />
            <HomeNavigator.Screen
                name="Detail"
                component={DetailSceen}
                options={{
                    title: "Detail"
                }} />
        </HomeNavigator.Navigator>
    );
}

function CategoryNavigation() {
    return (
        <CategoryNavigator.Navigator
            initialRouteName="CategoryScreen"
            screenOptions={{
                headerStyle: { backgroundColor: "#3F2305" },
                headerTintColor: "white",
                headerTitleAlign: "center"
            }}>
            <CategoryNavigator.Screen
                name="Category"
                component={Categories}
                options={{
                    title: "หมวดหมู่"
                }} />

            <CategoryNavigator.Screen
                name="CookedToOrder"
                component={CookedToOrder}
                options={{
                    title: "อาหารตามสั่ง"
                }} 
            />
            <CategoryNavigator.Screen
                name="Drink"
                component={Drink}
                options={{
                    title: "เครื่องดื่ม"
                }} 
            />
            <CategoryNavigator.Screen
                name="Noodle"
                component={Noodle}
                options={{
                    title: "ก๋วยเตี๋ยว"
                }} 
            />
            <CategoryNavigator.Screen
                name="PorkPanAndShabu"
                component={PorkPanAndShabu}
                options={{
                    title: "หมูกะทะ และชาบู"
                }} 
            />
            <CategoryNavigator.Screen
                name="Snack"
                component={Snack}
                options={{
                    title: "ของกินเล่น"
                }} 
            />
            <CategoryNavigator.Screen
                name="Sweet"
                component={Sweet}
                options={{
                    title: "ของหวาน"
                }} 
            />
        </CategoryNavigator.Navigator>
    );
}

function FavoriteNavigation() {
    return (
        <FavoriteNavigator.Navigator
            initialRouteName="FavoriteScreen"
            screenOptions={{
                headerStyle: { backgroundColor: "#3F2305" },
                headerTintColor: "white",
                headerTitleAlign: "center"
            }}>
            <FavoriteNavigator.Screen
                name="Favorite"
                component={FavoriteSceen}
                options={{
                    title: "ร้านที่ชื่นชอบ"
                }} />
            <FavoriteNavigator.Screen
            name="Detail"
            component={DetailSceen}
            options={{
                title: "รายละเอียด"
            }}/>
        </FavoriteNavigator.Navigator>
    )
}

function ProfileNavigation() {
    return (
        <ProfileNavigator.Navigator
            initialRouteName="ProfileScreen"
            screenOptions={{
                headerStyle: { backgroundColor: "#3F2305" },
                headerTintColor: "white",
                headerTitleAlign: "center"
            }}
        >
            <ProfileNavigator.Screen
                name="Profile"
                component={ProfileSceen}
                options={{
                    title: "ฉัน"
                }} />

            <ProfileNavigator.Screen
                name="History"
                component={ReviewHistoryScreen}
                options={{
                    title: "ประวัติการรีวิว"
                }} />

            <ProfileNavigator.Screen
                name="Edit"
                component={EditProfileScreen}
                options={{
                    title: "แก้ไขข้อมูลส่วนตัว"
                }} />

            <ProfileNavigator.Screen
                name="Password"
                component={ChangPassword}
                options={{
                    title: "แก้ไขรหัสผ่าน"
                }} />
            <ProfileNavigator.Screen
                name="AddRest"
                component={AddRestScreen}
                options={{
                    title: "สร้างร้านอาหาร"
                }} />

        </ProfileNavigator.Navigator>
    )
}

function BottomNavigation() {
    return (
        <BottomNavigator.Navigator
            screenOptions={{
                tabBarActiveTintColor: "darkblue",
                tabBarStyle: { backgroundColor: "#3F2305" },
                headerShown: false,
                tabBarShowLabel: false
            }}>
            <BottomNavigator.Screen
                name="FirstScreen"
                component={HomeNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <AntDesign name="home" size={30} color="white" />
                    }
                }}
            />
            <BottomNavigator.Screen
                name="CategoryScreen"
                component={CategoryNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="grid-outline" size={30} color="white" />
                    }
                }}
            />
            <BottomNavigator.Screen
                name="FanoriteScreen"
                component={FavoriteNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialIcons name="favorite-border" size={30} color="white" />
                    }
                }} />
            <BottomNavigator.Screen
                name="ProfileScreen"
                component={ProfileNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome5 name="user" size={30} color="white" />
                    }
                }} />
        </BottomNavigator.Navigator>
    );
}

export default function MainNavigatoion() {
    return (
        <LoginNavigation />
    );
}