import React, { Component} from "react";
import { NativeRouter, Route, Link } from "react-router-native"; 
import {
  Text,
  View,
  Alert 
} from "react-native";  
import styles from "../config/StyleSheet";

export default class About extends Component{     
  render() { 
        return (
        <View style={styles.container}> 
          <Text>
            About page!
          </Text>
       </View> 
    );
  }
}
  