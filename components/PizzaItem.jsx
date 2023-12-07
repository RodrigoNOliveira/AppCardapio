import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";

export default function PizzaItem({ item, navigation, darkTheme }) {
  const containerStyle = darkTheme
    ? [styles.container, styles.containerDark]
    : [styles.container, styles.containerLight];

  const titleStyle = darkTheme ? [styles.title, styles.titleDark] : [styles.title, styles.titleLight];

  const textStyle = darkTheme ? [styles.text, styles.textDark] : [styles.text, styles.textLight];



  const ingredientesStyle = darkTheme
    ? [styles.ingredientes, styles.ingredientesDark]
    : [styles.ingredientes, styles.ingredientesLight];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={() => navigation.navigate("PizzaPage", { pizza: item, darkTheme})}
    >
      <View style={styles.containerPai}>
        <View>
          <Image style={styles.poster} source={require('../assets/icone-pizzaT.png')} />
        </View>
        <View>
          <Text style={titleStyle}>{item.nome}</Text>
          <Text style={textStyle}>
            Valores: R${item.precos[0].p} a R${item.precos[3].gg}
          </Text>
        </View>
      </View>

      <Text style={ingredientesStyle}>Ingredientes: {item.ingredientes.join(', ')}</Text>
    </TouchableOpacity>
  );
}

let widthScreen = Dimensions.get("window").width;
let widthPoster = (widthScreen - 32 - 24) / 3;

let styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 16,
    flexDirection: "column",
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 10,
  },
  containerLight: {
    backgroundColor: "white",
  },
  containerDark: {
    backgroundColor: "#525151",
  },
  containerPai: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    paddingTop: 8,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: "justify",
    textTransform: "capitalize",
  },
  titleLight: {
    color: "black",
  },
  titleDark: {
    color: "white",
  },
  text: {
    paddingTop: 8,
    fontSize: 20,
    textAlign: "justify",
  },
  textLight: {
    color: "black",
  },
  textDark: {
    color: "white",
  },
  ingredientes: {
    fontSize: 15,
    textAlign: 'auto',
    fontWeight: 'bold',
    padding: 16,
  },
  ingredientesLight: {
    color: "black",
  },
  ingredientesDark: {
    color: "white",
  },
  poster: {
    width: widthPoster * 1.2,
    height: widthPoster * 1.2,
  },
});
