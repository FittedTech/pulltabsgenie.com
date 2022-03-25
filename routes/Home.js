import React, {useEffect} from 'react';
import { Text, View, ImageBackground, StyleSheet, Alert, TextInput, ScrollView, Pressable } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { useNavigate } from 'react-router-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Home = () => {
  const navigate = useNavigate();  
  const history = []; 
  const [stepNumber, setStepNumber] = React.useState(0);
  const [totalWindows, setTotalWindows] = React.useState(0);
  const [totalTickets, setTotalTickets] = React.useState(0);
  const [moneyIn, setMoneyIn] = React.useState(0);
  const [ticketCost, setCostPerTicket] = React.useState(0);
  const [takenWindows, setTakenWindows] = React.useState(0);
   
  useEffect(() => { 
      async function handleIntro() {
        const firstTime = await AsyncStorage.getItem("isFirstTime") 
      
        if(firstTime != null) { 
          // It is not first time use  
          await AsyncStorage.setItem("isFirstTime", 'true'); 
        } else {
          // It is first time 
          navigate('/guide'); 
        }
      } 

      handleIntro();
  }, []);


  const getWizardStyling = (stepNum) => {
    if(stepNumber !== stepNum) {
        return {
            display: 'none'
        }
    }
  };
  const handleCalc = () => {
    Alert.alert('Calculating odds', 'please hold tight!');
    setStepNumber(stepNumber + 1);
  }

  const getNextStep = () => {
    setStepNumber(stepNumber + 1);
  }

  const handleReset = () => {
        // record teh entry
        history.push({
            id: history.length + 1,
            totalWindows,
            totalTickets,
            ticketCost,
            moneyIn,
            takenWindows
        });
        // Reset the step inputs
        setTotalWindows(0);
        setTotalTickets(0);
        setMoneyIn(0);
        setCostPerTicket(0);
        setTakenWindows(0);
        // Reset the step wizard stage
        setStepNumber(0);
  }

  return (
    <View style={pageStyles.container}>  
        <ImageBackground source={patternImg} resizeMode="cover" style={pageStyles.image}>
            <ScrollView style={pageStyles.container}>  
                <View style={[pageStyles.wizardStepWrapper, getWizardStyling(0)]}>  
                    <Text style={pageStyles.pageTitle}>Odds Calculator</Text> 
                    <Text style={pageStyles.text}>To figure out the best game to play, use the calculator below. If you haven't read the game guide, we strongly suggest doing so before playing Pull-Tabs for the first time.</Text> 
                     <Button
                        onPress={() => getNextStep()}
                        title="Get Started"
                        bgColor='#8cc63e'
                        color="#FFF" 
                        accessibilityLabel="Learn more about this purple button"
                        /> 
                </View> 
                <View style={[pageStyles.wizardStepWrapper, getWizardStyling(1)]}> 
                    <Text style={pageStyles.wizardStepTitle}>Step 1</Text> 
                    <Text style={pageStyles.text}>Find the total ticket count of the Pull-Tabs game. This is the maximum number of tickets in the game, regardless of how much money has been put into the game.</Text> 
                    <Separator/>
                    <View style={pageStyles.wizardStepContent}> 
                        <Text style={pageStyles.inputLabel}>Total Tickets</Text>  
                        <TextInput
                            style={pageStyles.input} 
                            onChangeText={setTotalTickets}
                            value={totalTickets} 
                            placeholder=""
                            keyboardType="numeric"
                        />
                        <Button
                        onPress={() => getNextStep()}
                        title="Next Step"
                        bgColor='#8cc63e'
                        color="#FFF" 
                        accessibilityLabel="Learn more about this purple button"
                        /> 
                    </View>
                </View>
                <View style={[pageStyles.wizardStepWrapper, getWizardStyling(2)]}> 
                    <Text style={pageStyles.wizardStepTitle}>Step 2</Text> 
                    <Text style={pageStyles.text}>Find the amount of money played into the game. Most venues will have a 'ticket printout' that you can request with a running tally.</Text> 
                    <Separator/>
                    <Text style={pageStyles.inputLabel}>Total Money In</Text> 
                    <CurrencyInput
                        style={pageStyles.input}
                        value={moneyIn}
                        onChangeValue={setMoneyIn}
                        prefix="$"
                        delimiter=","
                        separator="."
                        precision={2}
                        onChangeText={(formattedValue) => {
                            console.log(formattedValue); // $2,310.46
                        }}
                    /> 
                    <Button
                        onPress={() => getNextStep()}
                        title="Next Step"
                        bgColor='#8cc63e'
                        color="#FFF" 
                        accessibilityLabel="Learn more about this purple button"
                    /> 
                </View>
                <View style={[pageStyles.wizardStepWrapper, getWizardStyling(3)]}> 
                    <Text style={pageStyles.wizardStepTitle}>Step 3</Text> 
                    <Text style={pageStyles.text}>How much does a ticket cost? Usually the ticket prices range between $0.25-$2.</Text> 
                    <Separator/>
                    <Text style={pageStyles.inputLabel}>Cost Per Ticket</Text> 
                    <CurrencyInput
                        style={pageStyles.input}
                        value={ticketCost}
                        onChangeValue={setCostPerTicket}
                        prefix="$"
                        delimiter=","
                        separator="."
                        precision={2}
                        onChangeText={(formattedValue) => {
                            console.log(formattedValue); // $2,310.46
                        }}
                    />  
                    <Button
                        onPress={() => getNextStep()}
                        title="Next Step"
                        bgColor='#8cc63e'
                        color="#FFF" 
                        accessibilityLabel="Learn more about this purple button"
                    /> 
                </View>
                <View style={[pageStyles.wizardStepWrapper, getWizardStyling(4)]}>  
                    <Text style={pageStyles.wizardStepTitle}>Step 4</Text> 
                    <Text style={pageStyles.text}>How many total windows are there?</Text> 
                    <Separator/>
                    <Text style={pageStyles.inputLabel}>Total Windows</Text> 
                    <TextInput
                        style={pageStyles.input} 
                        onChangeText={setTotalWindows}
                        value={totalWindows} 
                        placeholder=""
                        keyboardType="numeric"
                    />
                    <Button
                        onPress={() => getNextStep()}
                        title="Next Step"
                        bgColor='#8cc63e'
                        color="#FFF" 
                        accessibilityLabel="Learn more about this purple button"
                    /> 
                </View>
                <View style={[pageStyles.wizardStepWrapper, getWizardStyling(5)]}> 
                    <Text style={pageStyles.wizardStepTitle}>Step 5</Text> 
                    <Text style={pageStyles.text}>How many windows have been claimed?</Text> 
                    <Separator/>
                    <Text style={pageStyles.inputLabel}>Windows Taken</Text> 
                    <TextInput
                        style={pageStyles.input} 
                        onChangeText={setTakenWindows}
                        value={takenWindows} 
                        placeholder=""
                        keyboardType="numeric"
                    />
                    <Button
                        onPress={() => getNextStep()}
                        title="Next Step"
                        bgColor='#8cc63e'
                        color="#FFF" 
                        accessibilityLabel="Learn more about this purple button"
                    /> 
                </View> 
                <View style={[pageStyles.wizardStepWrapper, getWizardStyling(6)]}> 
                    <Text style={pageStyles.wizardStepTitle}>Step 6</Text> 
                    <Text style={pageStyles.text}>That's it! If you are satisified with your selections, press the calculation button below and get the results.</Text> 
                    <Separator/>
                        <Text style={[pageStyles.text, {fontWeight: 'bold'}]}>Total Tickets: {totalTickets}</Text> 
                        <Text style={[pageStyles.text, {fontWeight: 'bold'}]}>Total Money In: {moneyIn}</Text> 
                        <Text style={[pageStyles.text, {fontWeight: 'bold'}]}>Cost Per Ticket: {ticketCost}</Text> 
                        <Text style={[pageStyles.text, {fontWeight: 'bold'}]}>Total Windows: {totalWindows}</Text> 
                        <Text style={[pageStyles.text, {fontWeight: 'bold'}]}>Taken Windows: {takenWindows}</Text> 
                    <Separator/>
                     <Button
                        onPress={() => handleCalc()}
                        title="Calculate Odds"
                        bgColor='#8cc63e'
                        color="#FFF" 
                        accessibilityLabel="Learn more about this purple button"
                        /> 
                </View> 
                <View style={[pageStyles.wizardStepWrapper, getWizardStyling(7)]}> 
                    <Text style={pageStyles.wizardStepTitle}>Odds</Text> 
                    <Text style={pageStyles.text}>XYZ</Text> 
                    <Separator/>
                     <Button
                        onPress={() => handleReset()}
                        title="Calculate Another Game"
                        bgColor='#8cc63e'
                        color="#FFF" 
                        accessibilityLabel="Learn more about this purple button"
                        /> 
                </View> 
                 
            </ScrollView>
        </ImageBackground>
    </View>
  );
}

export default Home;