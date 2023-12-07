import { View, Text, StyleSheet, TouchableOpacity ,ScrollView,Image, Dimensions} from "react-native";

import pizzas from "../data/pizzas.json"
import PizzaItem from "../components/PizzaItem.jsx"

let widthScreen = Dimensions.get("window").width;

export default function ListaPizzas({navigation}){

  function Item({item}){
    return(
      <PizzaItem item={item} navigation={navigation}/>
    )
  }



  return(
    <ScrollView style={styles.container}>


<TouchableOpacity style={styles.tamanhoBox}
        onPress={()=> navigation.navigate("ListaPizzas", {var: 0})}> 
          <Image style={styles.fatia} source={require('../assets/pizza.png')} />
          <Text style={styles.text}>Tamanho: {pizzas.precos[0].fatias}{'\n'} 
          Valor: R${pizza.precos[0].p},00</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.tamanhoBox}
        onPress={()=> navigation.navigate("ListaPizzas", {var: 1})}> 
          <Image style={styles.fatia} source={require('../assets/pizza.png')} />
          <Text style={styles.text}>Tamanho: {pizzas.precos[1].fatias}{'\n'} 
          Valor: R${pizza.precos[1].m},00</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.tamanhoBox}
        onPress={()=> navigation.navigate("ListaPizzas", {var: 2})}> 
          <Image style={styles.fatia} source={require('../assets/pizza.png')} />
          <Text style={styles.text}>Tamanho: {pizzas.precos[2].fatias}{'\n'} 
          Valor: R${pizza.precos[2].g},00</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.tamanhoBox}
        onPress={()=> navigation.navigate("ListaPizzas", {var: 3})}> 
          <Image style={styles.fatia} source={require('../assets/pizza.png')} />
          <Text style={styles.text}>Tamanho: {pizzas.precos[3].fatias}{'\n'} 
          Valor: R${pizza.precos[3].gg},00</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

let widthPoster = (widthScreen -64 - 16)/2.5

let styles = StyleSheet.create({
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
  container:{
    flex:1,
    padding: 16
  },
  poster:{
    width: widthPoster*1.75,
    height:widthPoster*1.75
  }, 
  title:{
    fontSize: 35,
    fontWeight: 'bold',
    paddingBottom: 8
  }
})



