import React, {useEffect} from 'react';
import { Text, View, ImageBackground, StyleSheet, Alert, TextInput, ScrollView, Pressable } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { useNavigate, Link } from 'react-router-native'; 
import { useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveWizardDetails } from '../redux/actions/wizardActions';
import { FontAwesome } from '@fortawesome/fontawesome-svg-core';
import patternImg from './../assets/bgPattern.png';   
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faCalculator,faCircle } from '@fortawesome/free-solid-svg-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';


const pageStyles = StyleSheet.create({
  container: {
    marginTop: 0,  
    height: '100vh'
  }, 
  image: { 
    flex: 1,
    justifyContent: "center",
    flexDirection: 'row',
    padding: '2.5%'
  },
  text: {
      color: '#333',
      fontSize: 18,
      margin: '1%',
      padding: '2.5%', 
      borderRadius: '5px'
  },
  wizardStepTitleWrapper: { 
    color: '#fff',
    backgroundColor: '#333',
    padding: 5
  },
  wizardStepTitle: {
    color: '#FFF',
    paddingLeft: 5, 
    fontSize: 20,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: "center",
    justifyContent: 'space-between',
  },
  pageTitle: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
      paddingTop: 5,
      paddingBottom: 5,
      display: 'flex',
      alignItems: "center",
      justifyContent: 'center',
      backgroundColor: '#333',
  },
  buttonText: {
      color: '#012847'
  },      
  inputLabel: {
      color: '#000',
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
      color: '#000',
      backgroundColor: '#FFFFFF',
      borderRadius: 10
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
  const dispatch = useDispatch();
  const navigate = useNavigate();   
  const [stepNumber, setStepNumber] = React.useState(0);
  const [totalWindows, setTotalWindows] = React.useState(0);
  const [totalTickets, setTotalTickets] = React.useState(0); 
  const [takenWindows, setTakenWindows] = React.useState(0);
  const [moneyIn, setMoneyIn] = React.useState('');
  const [ticketCost, setCostPerTicket] = React.useState('');
   
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

      if(!window || !window.navigator || !window.navigator.userAgent) {
        handleIntro();
      }
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

  const getLastStep = () => {
    setStepNumber(stepNumber - 1);
  }

  const handleReset = () => {
        // record teh entry
        dispatch(saveWizardDetails({
            id: history.length,
            dt_tm: Date.now(),
            totalWindows,
            totalTickets,
            ticketCost,
            moneyIn,
            takenWindows
        }));

        // Reset the step inputs
        setTotalWindows(0);
        setTotalTickets(0); 
        setTakenWindows(0);
        setMoneyIn('');
        setCostPerTicket('');
        // Reset the step wizard stage
        setStepNumber(0);
  }

  return (
    <View style={pageStyles.container}>  
        <ImageBackground source={patternImg} resizeMode="cover" style={pageStyles.image}>
            <ScrollView style={pageStyles.container} contentContainerStyle={{ flex: 1, justifyContent: 'center'}}>  
                <View style={[pageStyles.wizardStepWrapper, getWizardStyling(0)]}>  
                    <Text style={pageStyles.pageTitle}> <span className="fa-layers fa-fw"> <FontAwesomeIcon icon={faCircle} size='1x'  style={{color: '#907ad6ff'}}/> <FontAwesomeIcon icon={faCalculator} size='1x' style={{color: '#fff', fontSize: 16}}/></span><span>Odds Calculator</span> </Text> 
                    <Text style={pageStyles.text}>To figure out the best game to play, use the calculator below. If you haven't <Link to="/guide"><a href='#' style={{color: '#56cbf9ff'}}>read the game guide</a></Link>, we strongly suggest doing so before playing Pull-Tabs for the first time.</Text> 
                     <Button
                        onPress={() => getNextStep()}
                        title="Get Started"
                        bgColor='#8cc63e'
                        color="#FFF" 
                        accessibilityLabel="Learn more about this purple button"
                        /> 
                </View> 
                <View style={[pageStyles.wizardStepWrapper, getWizardStyling(1)]}> 
                    <View style={pageStyles.wizardStepTitleWrapper}><Text style={pageStyles.wizardStepTitle}><FontAwesomeIcon onClick={getLastStep} icon={faArrowCircleLeft} size='2x' style={{color: '#fff', fontSize: 16}}/> Step 1</Text> </View>
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
                        <MultiSlider values={[0, 10000]}/>
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
                <View style={pageStyles.wizardStepTitleWrapper}><Text style={pageStyles.wizardStepTitle}><FontAwesomeIcon onClick={getLastStep} icon={faArrowCircleLeft} size='2x' style={{color: '#fff', fontSize: 16}}/> Step 2</Text> </View>
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
                <View style={pageStyles.wizardStepTitleWrapper}> <Text style={pageStyles.wizardStepTitle}><FontAwesomeIcon onClick={getLastStep} icon={faArrowCircleLeft} size='2x' style={{color: '#fff', fontSize: 16}}/> Step 3</Text> </View>
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
                <View style={pageStyles.wizardStepTitleWrapper}> <Text style={pageStyles.wizardStepTitle}><FontAwesomeIcon onClick={getLastStep} icon={faArrowCircleLeft} size='2x' style={{color: '#fff', fontSize: 16}}/> Step 4</Text></View>
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
                <View style={pageStyles.wizardStepTitleWrapper}> <Text style={pageStyles.wizardStepTitle}><FontAwesomeIcon onClick={getLastStep} icon={faArrowCircleLeft} size='2x' style={{color: '#fff', fontSize: 16}}/> Step 5</Text></View>
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
                <View style={pageStyles.wizardStepTitleWrapper}> <Text style={pageStyles.wizardStepTitle}><FontAwesomeIcon onClick={getLastStep} icon={faArrowCircleLeft} size='2x' style={{color: '#fff', fontSize: 16}}/> Step 6</Text> </View>
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