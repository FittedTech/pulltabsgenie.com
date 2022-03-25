import React from 'react';
import { Text, View, ImageBackground, StyleSheet, Image, ScrollView } from 'react-native';
import styles from "../config/StyleSheet";

import winnerImg from './../assets/winners.png';   
import patternImg from './../assets/bgPattern.png';   
const pageStyles = StyleSheet.create({
  container: {
    marginTop: 0, 
    padding: '2.5%',
    minHeight: '100%'
  },
  text: {
    color: "#FFF"
  },
  image: {
    flex: 1,
    justifyContent: "flex-start",  
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  scrollView: { 
    marginHorizontal: 20,
  },
});


const Guide = () => {
  return ( 
    <View style={pageStyles.container}>  
      <ImageBackground source={patternImg} resizeMode="cover" style={pageStyles.image}> 
        <ScrollView style={[styles.scrollView, { }]}>
          <Text style={Object.assign({}, pageStyles.text, {color: '#8cc63e', fontWeight: 'bold', fontSize: 24})}>What are pulltabs!</Text>  
          <Text style={pageStyles.text}>A pull-tab is a gambling ticket for a pull-tab game. Other names for the game include Break-Opens, Nevada Tickets, Cherry Bells, Lucky 7s, Pickle Cards, Instant Bingo, Bowl Games, or Popp-Opens.</Text>     
          <Text style={Object.assign({}, pageStyles.text, {color: '#8cc63e', fontWeight: 'bold', fontSize: 24})}>How do pulltabs work?</Text>  
          <Text style={pageStyles.text}>The game manager operates the game by selling tickets and distributing prizes. The tickets may be provided by mechanical pull-tab dispensers or counted by hand. Several different games may be offered for sale at any one time; each may have different prices and payouts. Pull-tabs are typically sold for 25¢, 50¢, $1, $2, $3, and $5 and have prizes as high as $5,000.</Text>
          <Text style={pageStyles.text}>Pull tab games are relatively unique among wagering games in that each game, when new, has a predetermined quantity of tickets/chances, which can range from 5,000 to 50,000 total, among which are a predetermined and fixed quantity of winning chances each of which rewards a predetermined prize value.</Text>
          <Text style={pageStyles.text}>In many setups, a potential player can see through the transparent box roughly how many chances remain and they can view on the associated tally sheet how many major winners remain at any given time. When several major winners remain among a few chances, players buy as many as they can at a time. When no major winners remain among unsold tickets, the organization takes the game out of play or retires that deal and replaces it with a brand new deal. No other finite-probability based game provides more information to players about the status of the game.</Text>
          <Text style={pageStyles.text}>The key attributes that make something a pull tab—electronic or paper—is the finite probability basis of having a predetermined quantity of chances among which there are a predetermined quantity of winners that pay a fixed and predetermined value of prize. Redemption of one losing chance actually does mean one chance closer to a winner. This opposed to, for instance, slots that operate on near-continuum probability premises, where each event is a separate activity without bearing on the next outcome and without having been influenced from past events. </Text>   
          <Text style={Object.assign({}, pageStyles.text, {color: '#8cc63e', fontWeight: 'bold', fontSize: 24, marginTop: '2.5%'})}>What does a winner look like?</Text>  
          <Text style={pageStyles.text}>Winners typically have a strike through them or a dollar amount listed. Depending on the game you play, you may find a 'window'. A window is a ticket that allows you to choose a symbol which will contain one of the listed prizes.</Text>   
          <Image source={winnerImg} resizeMode="cover"/>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

export default Guide;