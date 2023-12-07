import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import pizzas from "../data/pizzas.json";
import PizzaItem from "../components/PizzaItem.jsx";

let widthScreen = Dimensions.get("window").width; 
let bordaSel = null;
let bebidasSel = null;

export default function Adicionais({ navigation, route }) {
  let pizza = route.params.pizza.nome;
  let tamanho = route.params.tamanho;
  let metade = route.params.metade;
  let meia;
  let darkTheme = route.params.darkTheme;
  
  let params = {
    pizza,
    tamanho,
    metade, 
    bordaSel,
    bebidasSel,
    darkTheme
  };

  if(metade == 1){
    meia = route.params.meia.nome;
    params = {
      pizza,
      tamanho,
      metade, 
      bordaSel,
      bebidasSel,
      meia,
      darkTheme
    }
  }

  const [selectedBorda, setSelectedBorda] = useState(null);
  const [selectedBebidas, setSelectedBebidas] = useState(Array(pizzas[0]?.bebidas?.length).fill(false));
  const [selectedBebidasQuantidade, setSelectedBebidasQuantidade] = useState(Array(pizzas[0]?.bebidas?.length).fill(0));
  
  const resetBebidasState = () => {
    setSelectedBebidasQuantidade((pizzas[0]?.bebidas?.map(() => 0) || []).slice());
    setSelectedBebidas((pizzas[0]?.bebidas?.map(() => false) || []).slice());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      resetBebidasState();
    });
  
    return unsubscribe;
  }, [navigation]);

  const handleSelect = (index) => {
    const borda = pizzas[0]?.borda?.[0];
    
    if (borda && borda.recheios && borda.recheios[index]) {
      const recheio = borda.recheios[index];
      const sabor = recheio.sabor;
      const preco = recheio.preco;
  
      setSelectedBorda(index);
      bordaSel = { sabor, preco };
    } else {
      console.error("Borda ou recheio não definidos corretamente.");
    }
  };

  const handleSelectBebida = (index, quantidade) => {
    if (pizzas[0]?.bebidas && Array.isArray(pizzas[0]?.bebidas) && pizzas[0]?.bebidas[0]?.sabores) {
      const newSelectedBebidas = [...selectedBebidas];
      const newQuantidade = [...selectedBebidasQuantidade];
  
      const selectedIndex = newSelectedBebidas.indexOf(index);
  
      if (selectedIndex !== -1) {
        newSelectedBebidas.splice(selectedIndex, 1);
      }
  
      for (let i = 0; i < quantidade; i++) {
        newSelectedBebidas.push(index);
      }
  
      setSelectedBebidas(newSelectedBebidas);
  
      const selectedBebidasDetails = newSelectedBebidas.map((saborIndex) => {
        const sabor = pizzas[0]?.bebidas?.[0]?.sabores?.[saborIndex]?.sabor;
        const preco = pizzas[0]?.bebidas?.[0]?.sabores?.[saborIndex]?.preco;
        const bebidaQuantidade = newQuantidade[saborIndex] || 0;
  
        return { sabor, preco, quantidade: bebidaQuantidade };
      });
  
      bebidasSel = selectedBebidasDetails.length > 0 ? selectedBebidasDetails : null;
    }
  };

  const handleIncrementBebida = (index) => {
    const newQuantidade = [...selectedBebidasQuantidade];
    newQuantidade[index] = (newQuantidade[index] || 0) + 1;
    setSelectedBebidasQuantidade(newQuantidade);
    handleSelectBebida(index, newQuantidade[index]);
  };

  const handleDecrementBebida = (index) => {
    const newQuantidade = [...selectedBebidasQuantidade];
    newQuantidade[index] = Math.max((newQuantidade[index] || 0) - 1, 0);
    setSelectedBebidasQuantidade(newQuantidade);
    handleSelectBebida(index);
  };
  const containerPaiStyle = darkTheme
  ? [styles.containerPai, styles.containerPaiDark]
  : [styles.containerPai, styles.containerPaiLight];


  const containerStyle = darkTheme
  ? [styles.container, styles.containerDark]
  : [styles.container, styles.containerLight];
  const radioButtonContainerS = darkTheme
  ? [styles.radioButtonContainer, styles.radioButtonContainerDark]
  : [styles.radioButtonContainer, styles.radioButtonContainerLight];


  const title = darkTheme ? [styles.title, styles.titleDark] : [styles.title, styles.titleLight];

  const text = darkTheme ? [styles.text, styles.textDark] : [styles.text, styles.textLight];
  const bebidaQuantidadeS = darkTheme ? [styles.bebidaQuantidade, styles.bebidaQuantidadeDark] : [styles.bebidaQuantidade, styles.bebidaQuantidadeLight];


  return (
    <ScrollView style={containerPaiStyle}>
      <View style={containerStyle}>
        <Text style={title}>Bordas</Text>
        {pizzas[0]?.borda?.map((borda, bordaIndex) => (
          <View key={bordaIndex}>
            {borda.recheios.map((recheio, recheioIndex) => (
              <TouchableOpacity
                key={recheioIndex}
                style={radioButtonContainerS}
                onPress={() => handleSelect(recheioIndex)}
              >
                <Text style={text}>
                  {recheio.sabor}: R${recheio.preco},00
                </Text>
                <FontAwesome
                  style={styles.label}
                  name={selectedBorda === recheioIndex ? 'dot-circle-o' : 'circle-o'}
                  size={24}
                  color={selectedBorda === recheioIndex ? '#f4511e' : 'gray'}
                />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <View style={containerStyle}>
        <Text style={title}>Bebidas</Text>
        {pizzas[0]?.bebidas?.map((bebidas, bebidasIndex) => (
          <View key={bebidasIndex}>
            {bebidas.sabores.map((sabor, saborIndex) => (
              <View key={saborIndex} style={styles.bebidaContainer}>
                <Text style={text}>
                {sabor.sabor}: R${sabor.preco},00
                </Text>
                <View style={styles.bebidaButtonsContainer}>
                  <TouchableOpacity
                    style={styles.bebidaButton}
                    onPress={() => handleDecrementBebida(saborIndex)}
                  >
                    <FontAwesome name="minus" size={18} color="#f4511e" />
                  </TouchableOpacity>
                  <Text style={bebidaQuantidadeS}>
                    {selectedBebidasQuantidade[saborIndex] || 0}
                  </Text>
                  <TouchableOpacity
                    style={styles.bebidaButton}
                    onPress={() => handleIncrementBebida(saborIndex)}
                  >
                    <FontAwesome name="plus" size={18} color="#f4511e" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: selectedBorda !== null ? '#f4511e' : 'gray' }]}
        onPress={() => {
          if (selectedBorda === null) {
            Alert.alert('Escolha uma borda', 'Por favor, escolha uma borda antes de adicionar ao carrinho.');
          } else {
            resetBebidasState();
            bebidasSel = null;
            navigation.navigate("carrinhoPage", { params });
          }
        }}
      > 
        <Text style={styles.btTitle}>Adicionar ao carrinho</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

let widthPoster = (widthScreen - 64 - 16) / 2.5;

let styles = StyleSheet.create({
  containerPai: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e0dddc',
  }, containerPaiLight: {
    backgroundColor: "#e0dddc",
  },
  containerPaiDark: {
    backgroundColor: "black",
  },
  botao:{
    backgroundColor: '#f4511e',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    margin: 16,
  },btTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 8,
    color: "white"
  },
  container: {
    flex: 1,
    padding: 16,
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "white",
    alignItems: "center",
    margin: 16,
    borderRadius: 20
  },containerLight: {
    backgroundColor: "white",
  },
  containerDark: {
    backgroundColor: "#525151",
  },
  poster: {
    width: widthPoster * 1.75,
    height: widthPoster * 1.75
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    paddingBottom: 8
  },titleLight: {
    color: "black",
  },
  titleDark: {
    color: "white",
  },
  text: {
    fontSize: 15,
    textAlign: "auto",
    fontWeight: 'bold',
    textTransform: "capitalize"
  },textLight: {
    color: "black",
  },
  textDark: {
    color: "white",
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#F0F0F0",
    padding: 16,
    margin: 16,
    height: widthPoster * 0.5,
    borderRadius: 20
  },radioButtonContainerDark: {
    backgroundColor: "black",
  },radioButtonContainerLight: {
    backgroundColor: "#F0F0F0",
  },
  label: {
    marginLeft: 18,
    fontSize: 25,
  },
  bebidaButtonsContainer:{
    flexDirection: 'row',
    padding: 8,
  }, bebidaContainer:{
    flexDirection: 'row',
    padding: 8,
    alignItems: "center"
  },
  bebidaButton:{
    padding:8
  }, bebidaQuantidade:{
    fontSize: 15,
    textAlign: "auto",
    fontWeight: 'bold',
    padding:8
  },bebidaQuantidadeLight: {
    color: "black",
  },
  bebidaQuantidadeDark: {
    color: "white",
  },
});
