import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';

let widthScreen = Dimensions.get("window").width;

export default function ListaPizzas({ navigation, route }) {
  let pizza = route.params.params.pizza;
  let tamanho = route.params.params.tamanho;
  let metade = route.params.params.metade;
  let borda = route.params.params.bordaSel;
  let bebidas = route.params.params.bebidasSel || [];
  let valor = 0;
  let valorTamanho = 0;
  let darkTheme = route.params.params.darkTheme;

  if (metade == 1) {
    meia = route.params.params.meia;
    pizza = "1/2 " + pizza + "\n1/2 " + meia;
    }
  switch (tamanho) {
    case 0:
      valorTamanho = 40;
      valor += 40;
      break;
    case 1:
      valorTamanho = 50;
      valor += 50;
      break;
    case 2:
      valorTamanho = 60;
      valor += 60;
      break;
    case 3:
      valorTamanho = 70;
      valor += 70;
      break;
  }
  if (borda.preco != 0) {
    valor += 5;
  }

  const isNumber = (value) => !isNaN(value) && typeof value === 'number';

  bebidas = bebidas.filter(bebida => isNumber(bebida.preco));

  if (bebidas.length > 0) {
    for (let i = 0; i < bebidas.length; i++) {
      if (bebidas[i].preco !== undefined && !isNaN(bebidas[i].preco)) {
        valor += bebidas[i].preco;
      }
    }
  }


  let params = {
    pizza,
    valorTamanho,
    borda,
    bebidas,
    valor,
    darkTheme
  };

  const title = darkTheme ? [styles.title, styles.titleDark] : [styles.title, styles.titleLight];

  const tableData = darkTheme ? [styles.tableData, styles.tableDataDark] : [styles.tableData, styles.tableDataLight];
  const container = darkTheme
    ? [styles.container, styles.containerDark]
    : [styles.container, styles.containerLight];

  const containerBox = darkTheme
    ? [styles.containerBox, styles.containerBoxDark]
    : [styles.containerBox, styles.containerBoxLight];

    const [orderList, setOrderList] = useState([]);


  const addOrderAutomatically = async () => {
    try {
      const order = {
        pizza,
        valorTamanho,
        borda,
        bebidas,
        valor
      };

      const currentOrderList = await AsyncStorage.getItem('orderList');
      let newOrderList = [];

      if (currentOrderList) {
        newOrderList = JSON.parse(currentOrderList);
      }

      newOrderList.push(order);

      await AsyncStorage.setItem('orderList', JSON.stringify(newOrderList));
      setOrderList(newOrderList);
    } catch (error) {
      console.error('Error adding order automatically:', error);
    }
  };

  useEffect(() => {
    addOrderAutomatically();
  }, []);


  const limparListaAsync = async () => {
    try {
      await AsyncStorage.removeItem('orderList');
      console.log('Lista do AsyncStorage removida com sucesso!');
    } catch (error) {
      console.error('Erro ao remover lista do AsyncStorage:', error);
    }
  };
  
  const finalizarCompra = async () => {
    if (totalValue === 0) {
      Alert.alert('Atenção', 'Seu pedido está vazio. Adicione itens antes de finalizar a compra.');
    } else {
      await limparListaAsync(); // Aguarda a limpeza antes de navegar
      navigation.navigate("FinalizarPage", { darkTheme, totalValue, orderList });
    }
  };
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    calculateTotalValue();
  }, [orderList]);

  const calculateTotalValue = () => {
    let total = 0;
    orderList.forEach((item) => {
      total += item.valor;
    });
    setTotalValue(total);
  };

  const removeOrder = (index) => {
    const newOrderList = [...orderList];
    newOrderList.splice(index, 1);
    setOrderList(newOrderList);

    AsyncStorage.setItem('orderList', JSON.stringify(newOrderList))
      .then(() => console.log('Pedido removido com sucesso do AsyncStorage'))
      .catch(error => console.error('Erro ao remover pedido do AsyncStorage:', error));
  };

 


  return (
    <ScrollView style={containerBox}>
      {orderList.map((item, index) => (
        <View key={index} style={styles.tableRow}>
          <View style={container}>
            <Image style={styles.poster} source={require('../assets/icone-pizzaT.png')} />

            <View style={styles.containerPai}>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={title}>{item.pizza}</Text>
                  <Text style={title}>R${item.valorTamanho},00</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={title}>Adicional</Text>
                </View>
                {borda && (
                  <View style={styles.tableRow}>
                    <Text style={tableData}>Borda {item.borda.sabor}</Text>
                    <Text style={tableData}>R${item.borda.preco},00</Text>
                  </View>
                )}
                {item.bebidas.length > 0 &&
                  item.bebidas.map((bebida, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={tableData}>{bebida.sabor}</Text>
                      <Text style={tableData}>R${bebida.preco},00</Text>
                    </View>
                  ))}
                <View style={styles.tableRow}>
                  <Text style={title}>Valor Total:</Text>
                  <Text style={title}>R${item.valor},00</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeOrder(index)}
            >
              <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={container}>
        <Text style={title}>Valor Total do Pedido:      R${totalValue},00</Text>
      </View>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('ListaPizzas')}>
        <Text style={styles.btTitle}>Continuar comprando</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.botao1,
          { backgroundColor: totalValue > 0 ? '#fa8661' : 'gray' },
        ]}
        onPress={async () => {
          if (totalValue === 0) {
            Alert.alert('Atenção', 'Seu pedido está vazio. Adicione itens antes de finalizar a compra.');
          } else {
            finalizarCompra() // Usando a função finalizarCompra
          }
        }}
      >
        <Text style={styles.btTitle}>Finalizar Compra</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
let widthPoster = (widthScreen -64 - 16)/2.5

let styles = StyleSheet.create({
  removeButton: {
    backgroundColor: '#f4511e',
    borderRadius: 10,
    padding: 8,
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  containerBox: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e0dddc',
    width: widthScreen
  }, containerBoxLight: {
    backgroundColor: "#e0dddc",
  },
  containerBoxDark: {
    backgroundColor: "black",
  },
  botao:{
    backgroundColor: '#f4511e',
    borderRadius: 20,
    alignItems: 'center',
    margin: 8,
    marginLeft: 48,
    marginRight: 48,
    height: widthPoster * 0.5,
    justifyContent: "center"
    
  },
  botao1:{
    backgroundColor: '#fa8661',
    borderRadius: 20,
    alignItems: 'center',
    margin: 8,
    marginLeft: 48,
    marginRight: 48,
    height: widthPoster * 0.5,
    justifyContent: "center"
  },
  btTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "white",
    alignItems: 'center',
  },
  table: {
    overflow: 'hidden',
    width: widthPoster * 3.5,
    padding: 8
  },
  tableRow: {
    flexDirection: 'row',

  },
  tableHeader: {
    flex: 1,
    padding: 8,
    fontWeight: 'bold',
    textAlign: "auto",
    fontSize:15
  }, title:{
    flex: 1,
    padding: 8,
    fontWeight: 'bold',
    textAlign: "auto",
    flexWrap: "wrap",
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 8
  }, titleDark: {
    color: "white"
  },
  titleLight: {
    color: "black"
  },
  tableData: {
    flex: 1,
    padding: 8,
    textAlign: 'auto',
    fontSize:13,
    textTransform: "uppercase",
  }, tableDataDark: {
    color: "white"
  },
  tableDataLight: {
    color: "black"
  },
  container:{
    display: "flex",
    padding:16,
    backgroundColor: "white", 
    flexDirection: "column",
    margin: 16,
    borderRadius: 20,
    // alignItems: "center",
    textAlign: "center"
  }, containerDark:{
    backgroundColor: "#525151"
  }, containerLight:{
    backgroundColor: "white"
  }, 
  containerPai:{
    flex:1,
    flexDirection: 'row',
    // justifyContent:'space-between',
    alignItems:'center',
    width: widthPoster*2.4
  },
  
  box:{
    flex:1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding:32, 
    alignItems: 'center',
    marginBottom: 16, 
    flexDirection: "column",
    justifyContent: "space-around"
  },
  poster:{
    width: widthPoster*0.7,
    height:widthPoster*0.7
  }, 
  text:{
    flexWrap: "wrap"
  }
})



