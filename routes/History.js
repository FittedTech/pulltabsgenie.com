import React, { Component} from "react";
import { NativeRouter, Route, Link } from "react-router-native"; 
import { Text, View, ImageBackground, StyleSheet, Alert, TextInput, ScrollView, Pressable } from 'react-native';  
import store from "./../redux/store";
import { useNavigate } from "react-router-native";
import { useDispatch } from "react-redux";

import patternImg from './../assets/bgPattern.png';  
const pageStyles = StyleSheet.create({
  container: {
    marginTop: 0, 
    minHeight: '100%',
    height: 'auto'
  }, 
  image: { 
    flex: 1,
    justifyContent: "center",
    flexDirection: 'row',
    padding: '2.5%'
  },
  text: {
      color: '#FFF'
  },
  wizardStepTitle: {
    color: '#8cc63e',
    fontSize: 20,
    fontWeight: 'bold'
  },
  pageTitle: {
      color: '#8cc63e',
      fontSize: 24,
      fontWeight: 'bold'
  },
  buttonText: {
      color: '#012847'
  },
  inputLabel: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 20
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
      backgroundColor: '#8cc63e',
      padding: '2%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      borderRadius: 2.5
  },
  input: {
    height: 40,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#FFF'
  },
  wizardStepWrapper: { 
  },
  wizardStepContent: { 
    padding: '1%'
  }
});

const Separator = () => (
    <View style={pageStyles.separator} />
);

const Button = (props) => {
    const { onPress, title = 'Save' } = props;
    return (
      <Pressable style={[pageStyles.button, {backgroundColor: props.bgColor, color: props.color}]} onPress={onPress}>
        <Text style={pageStyles.buttonText}>{title}</Text>
      </Pressable>
    );
}

const History = () => {     
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let storeState = store.getState();

  const goToCalculator = () => {
    navigate('/');
  };

  const goToGuide = () => {
    navigate('/guide');
  };

  const getHistoricalEntries = () => {
    const jsx = [];

    if(storeState.wizard.history.length === 0) {
      return (
        <>
        <Text style={pageStyles.text}>Looks like you have not used the calculator yet. What are you waiting for?</Text> 
        <Button  
          onPress={() => goToCalculator()} 
          bgColor='#8cc63e'
          color="#FFF"   
          title="Go To Calculator"/> 
          <Button 
          
            onPress={() => goToGuide()} 
            bgColor='#e74c3c'
            color="#FFF"  
            title="Learn More"/>
        </> 
      )
    }else {
      storeState.wizard.history.forEach(entry => {
        jsx.push(
          <View style={{ display: 'flex', flexDirection: 'column' }}> 
            <View><Text style={pageStyles.wizardStepTitle}>Entry #{entry.id} - {Date(entry.dt_tm).toString()}</Text></View>
          <View style={{
            padding: '5%',
            backgroundColor: '#333'
          }}> 
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}> 
              <View><Text style={[pageStyles.wizardStepTitle, { padding: '2.5%', width: '50%' }]}>Total Tickets</Text></View>
              <View><Text style={[pageStyles.wizardStepTitle, { padding: '2.5%' }]}>{entry.totalTickets}</Text></View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%'  }}> 
              <View><Text style={[pageStyles.wizardStepTitle, { padding: '2.5%', width: '50%' }]}>Cost Per Ticket</Text></View>
              <View><Text style={[pageStyles.wizardStepTitle, { padding: '2.5%' }]}>{entry.ticketCost}</Text></View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%'  }}> 
              <View><Text style={[pageStyles.wizardStepTitle, { padding: '2.5%', width: '50%' }]}>Total Money In</Text></View>
              <View><Text style={[pageStyles.wizardStepTitle, { padding: '2.5%' }]}>{entry.moneyIn}</Text></View>
            </View> 
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%'  }}> 
              <View><Text style={[pageStyles.wizardStepTitle, { padding: '2.5%', width: '50%' }]}>Total Windows</Text></View>
              <View><Text style={[pageStyles.wizardStepTitle, { padding: '2.5%' }]}>{entry.totalWindows}</Text></View>
            </View> 
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%'  }}> 
              <View><Text style={[pageStyles.wizardStepTitle, { padding: '2.5%', width: '50%' }]}>Taken Windows</Text></View>
              <View><Text style={[pageStyles.wizardStepTitle, { padding: '2.5%' }]}>{entry.takenWindows}</Text></View>
            </View> 
            </View> 
          </View>

        );
      })
    }

    return jsx;
  };
  return (
    <View style={pageStyles.container}>  
        <ImageBackground source={patternImg} resizeMode="cover" style={pageStyles.image}>
            <ScrollView style={pageStyles.container}>  
                <View style={[pageStyles.wizardStepWrapper]}>  
                    <Text style={pageStyles.pageTitle}>History</Text> 
                    <Text style={pageStyles.text}>Keep a running summary of games that you've calculated odds on, chances are there are more than one game that looks good!</Text> 
                    <Separator/> 
                    {getHistoricalEntries()}
                </View>  
            </ScrollView>
        </ImageBackground>
    </View>
  );
};


export default History;
  