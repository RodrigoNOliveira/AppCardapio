import { View, Text, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import React, { useState, useEffect } from 'react';
import pizzas from "../data/pizzas.json"
import PizzaItem from "../components/PizzaItem.jsx"
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function ListaPizzas({navigation}){

  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = async () => {
    try {
      const newTheme = !darkTheme;
      setDarkTheme(newTheme);
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };
  
  const initializeTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setDarkTheme(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error initializing theme:', error);
    }
  }; 
  

  useEffect(() => {
    initializeTheme();
  }, []);

  function Item({item}){
    return(
      <PizzaItem item={item} navigation={navigation} darkTheme={darkTheme}/>
    )
  }



  return(
    <View style={darkTheme ? styles.containerDark : styles.containerLight}>
      <FlatList
      data={pizzas[0].pizza}
      keyExtractor={item => item.nome}
      renderItem={Item}
      numColumns={1}
      />
        <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
        <Text style={styles.buttonText}>Trocar Tema</Text>
      </TouchableOpacity>
    </View>


  )
}



let styles = StyleSheet.create({
  containerLight:{
    flex:1,
    padding: 16,
    backgroundColor: '#e0dddc',
  },containerDark:{
    flex:1,
    padding: 16,
    backgroundColor: 'black',
  },
  title:{
    fontSize:20,
    fontWeight: 'bold'
  },
  themeButton: {
    backgroundColor: '#f4511e',
    borderRadius: 20,
    alignItems: 'center',
    margin: 8,
    marginLeft: 48,
    marginRight: 48,
    height: 40,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
})