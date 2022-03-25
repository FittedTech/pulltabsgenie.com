import React, { Component} from "react";
import { NativeRouter, Route, Link, Routes, useLocation } from "react-router-native"; 
import { Text, View, Alert, StyleSheet } from "react-native";   


const styles = StyleSheet.create({ 
    container: { 
        marginTop: 25,
        padding: 10
    },
    header: {
        fontSize: 20
    },
    nav: { 
        flexDirection: "row",
        justifyContent: "space-around", 
        borderBottomColor: '#333',  
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#76d7c4',
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowRadius: 1,
        shadowOffset: {
            width: 2,
            height: 2
        }
    },
    text: { 
    },  
    navItem: {
        flex: 1,
        alignItems: "center",
        padding: 10
    },
    subNavItem: {
        padding: 5
    },
    topic: {
        textAlign: "center",
        fontSize: 15
    }
});


const Nav = () => {
    let location = useLocation();  

    const getNavLinkStyling = (routeName) => {  
        const onNavPage = routeName === location.pathname;
        const styleObj = {
            backgroundColor: '#012847'
        };
        if(onNavPage) {
            styleObj.backgroundColor = "#28a9e2"; 
            styleObj.borderBottomColor = "#8cc63e";
            styleObj.borderBottomWidth = 2;
        }else {
            styleObj.borderBottomColor = "#012847";  
            styleObj.borderBottomWidth = 2;
        }

        return styleObj;
    } 

    const getNavBtnTextStyle = (routeName) => {  
        const onNavPage = routeName === location.pathname;
        const styleObj = {
            color: '#FFF'
        };

        if(onNavPage) {
           // styleObj.color = "#000"; 
        }  

        return styleObj;
    } 

    return (
        <View style={styles.nav}>
            <Link to="/" style={Object.assign({}, styles.navItem, getNavLinkStyling('/'))}>
                <Text style={Object.assign({}, styles.text, getNavBtnTextStyle('/'))}>
                    Calculator
                </Text>
            </Link> 
            <Link to="/history" style={Object.assign({}, styles.navItem, getNavLinkStyling('history'))}>
                <Text style={Object.assign({}, styles.text, getNavBtnTextStyle('history'))}>
                    History
                </Text>
            </Link> 
            <Link to="/guide" style={Object.assign({}, styles.navItem, getNavLinkStyling('guide'))}>
                <Text style={Object.assign({}, styles.text, getNavBtnTextStyle('guide'))}>Guide</Text>
            </Link>
        </View>
    );
}; 


export default Nav;