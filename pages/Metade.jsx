import { View, Text, StyleSheet, FlatList} from "react-native";

import pizzas from "../data/pizzas.json"
import Meia from "../components/Meia.jsx"




export default function ListaPizzas({navigation, route}){
    let pizza = route.params.pizza;
    let tamanho = route.params.tamanho;
    let metade = route.params.metade;
    let darkTheme = route.params.darkTheme;

  function Item({item}){
    const params = {
        pizza,
        tamanho,
        metade, 
        darkTheme
      };
    return(

      <Meia item={item} navigation={navigation} params={params}/>
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
  }
})