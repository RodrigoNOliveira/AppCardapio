import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import iconePizza from '../assets/icone-pizzaT.png';


let widthScreen = Dimensions.get("window").width;
let foto = iconePizza;

export default function Pizza({ navigation, route}) {
  let pizza = route.params.pizza;
  let darkTheme = route.params.darkTheme;


  const containerStyle = darkTheme
    ? [styles.container, styles.containerDark]
    : [styles.container, styles.containerLight];

  const title = darkTheme ? [styles.title, styles.titleDark] : [styles.title, styles.titleLight];

  const text = darkTheme ? [styles.text, styles.textDark] : [styles.text, styles.textLight];

  const tamanhoBoxStyle = darkTheme
    ? [styles.tamanhoBox, styles.tamanhoBoxDark]
    : [styles.tamanhoBox, styles.tamanhoBoxLight];

    const containerPaiStyle = darkTheme
    ? [styles.containerPai, styles.containerPaiDark]
    : [styles.containerPai, styles.containerPaiLight];

  return (
    <ScrollView style={containerStyle}>
      <View style={containerPaiStyle}>
        <View style={styles.boxContainer}>
          <View>
            <Image style={styles.poster} source={foto} />
          </View>
          <View style={styles.containerFilho}>
            <Text style={title}>
              {pizza.nome}
            </Text>
          </View>
        </View>
        <Text style={text}>
          Ingredientes: {pizza.ingredientes.join(', ')}
        </Text>
      </View>

      <TouchableOpacity style={tamanhoBoxStyle} onPress={() => navigation.navigate("TipoPizza", { pizza: pizza, tamanho: 0, darkTheme })}>
        <Image style={styles.fatia} source={require('../assets/pizza.png')} />
        <Text style={text}>Tamanho: {pizza.precos[0].fatias}{'\n'} 
          Valor: R${pizza.precos[0].p},00</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tamanhoBoxStyle} onPress={() => navigation.navigate("TipoPizza", { pizza: pizza, tamanho: 1, darkTheme })}>
        <Image style={styles.fatia} source={require('../assets/pizza.png')} />
        <Text style={text}>Tamanho: {pizza.precos[1].fatias}{'\n'} 
          Valor: R${pizza.precos[1].m},00</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tamanhoBoxStyle} onPress={() => navigation.navigate("TipoPizza", { pizza: pizza, tamanho: 2, darkTheme })}>
        <Image style={styles.fatia} source={require('../assets/pizza.png')} />
        <Text style={text}>Tamanho: {pizza.precos[2].fatias}{'\n'} 
          Valor: R${pizza.precos[2].g},00</Text>
      </TouchableOpacity>

      <TouchableOpacity style={tamanhoBoxStyle} onPress={() => navigation.navigate("TipoPizza", { pizza: pizza, tamanho: 3, darkTheme })}>
        <Image style={styles.fatia} source={require('../assets/pizza.png')} />
        <Text style={text}>Tamanho: {pizza.precos[3].fatias}{'\n'} 
          Valor: R${pizza.precos[3].gg},00</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

let widthPoster = (widthScreen - 64 - 16) / 2.5;

let styles = StyleSheet.create({
  itens: {
    flexDirection: 'row',
    margin: 8,
    justifyContent: "flex-end",
    alignItems: 'flex-end'
  },
  tamanhoBox: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  tamanhoBoxLight: {
    backgroundColor: "white",
  },
  tamanhoBoxDark: {
    backgroundColor: "#525151",
  }, 
  
  fatia: {
    width: widthPoster,
    height: widthPoster
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e0dddc',
  }, containerLight: {
    backgroundColor: "e0dddc",
  },
  containerDark: {
    backgroundColor: "black",
  },containerPai: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16
  }, containerPaiLight: {
    backgroundColor: "white",
  },
  containerPaiDark: {
    backgroundColor: "#525151",
  }, valores: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16
  },
  boxContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 32,
    paddingTop: 8,
  },
  containerFilho: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  text: {
    fontSize: 18,
    textAlign: 'auto',
    fontWeight: 'bold'
  },
  textLight: {
    color: "black",
  },
  textDark: {
    color: "white",
  },
  poster: {
    width: widthPoster,
    height: widthPoster * 1.8
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 8
  },titleLight: {
    color: "black",
  },
  titleDark: {
    color: "white",
  },
  botao: {
    height: 40,
    width: 130,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: "#f4511e",
    borderRadius: 20,
    color: "#f4511e"
  },
  btn: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white"
  }
});
