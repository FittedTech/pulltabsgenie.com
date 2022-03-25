import React, { useState } from "react";
import { NativeRouter, Route, Link, Routes } from "react-router-native"; 
import * as WebRouter from "react-router"; 
import { Text, View, Alert, StyleSheet, ImageBackground, SafeAreaView, StatusBar, Platform, Button  } from "react-native";   
import Home from "./routes/Home";
import History from "./routes/History";
import Guide from "./routes/Guide";
import Nav from "./components/Nav"; 
import { Provider } from 'react-redux';
import store from "./redux/store";
 

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none']; 
const pageStyles = StyleSheet.create({ 
  container: { 
      backgroundColor: '#000',
      marginTop: 0,
      padding: 0
  },
  image: { 
      flex: 1,
      justifyContent: "center" 
  },
  header: {
      fontSize: 20
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

const App = () => {     
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(TRANSITIONS[0]);

  const changeStatusBarVisibility = () => setHidden(!hidden);

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  };

  const changeStatusBarTransition = () => {
    const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
    if (transition === TRANSITIONS.length) {
      setStatusBarTransition(TRANSITIONS[0]);
    } else {
      setStatusBarTransition(TRANSITIONS[transition]);
    }
  };
  
  return (
    <Provider store={store}>
      <SafeAreaView style={pageStyles.container}>
        <StatusBar animated={true} backgroundColor="#61dafb" barStyle={statusBarStyle} showHideTransition={statusBarTransition} hidden={hidden} />
          <NativeRouter>
            <View style={pageStyles.container}>     
              <Nav/>
              <Routes>
                <Route exact path="/" element={<Home/>} /> 
                <Route exact path="/history" element={<History/>} /> 
                <Route exact path="/guide" element={<Guide/>} />  
              </Routes>    
            </View>
          </NativeRouter>
      </SafeAreaView>
    </Provider>
  );
}


export default App;