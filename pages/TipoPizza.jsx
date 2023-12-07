import { View, Text, StyleSheet, TouchableOpacity ,ScrollView,Image, Dimensions} from "react-native";


let widthScreen = Dimensions.get("window").width;

export default function TipoPizza({navigation, route}){
  let pizza = route.params.pizza;
  let tamanho = route.params.tamanho;
  let darkTheme = route.params.darkTheme;


  const containerStyle = darkTheme
    ? [styles.container, styles.containerDark]
    : [styles.container, styles.containerLight];
 
    const boxStyle = darkTheme
    ? [styles.box, styles.boxDark]
    : [styles.box, styles.boxLight];
  
  const title = darkTheme ? [styles.title, styles.titleDark] : [styles.title, styles.titleLight];

  const text = darkTheme ? [styles.text, styles.textDark] : [styles.text, styles.textLight];

 
 
    return(
    <ScrollView style={containerStyle}>


        <TouchableOpacity style={boxStyle}
        onPress={()=> navigation.navigate("adicionaisPage", {pizza, tamanho, metade: 0, darkTheme})}> 
            <Text style={title}>Pizza inteira</Text>

            <Image style={styles.poster} source={require('../assets/inteira.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={boxStyle}
        onPress={()=> navigation.navigate("MetadePage", {pizza, tamanho, metade: 1, darkTheme})}> 
            <Text style={title}>Pizza Meia a Meia</Text>
            <Image style={styles.poster} source={require('../assets/metade.png')} />
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
  }, boxLight: {
    backgroundColor: "white",
  },
  boxDark: {
    backgroundColor: "#525151",
  },
  container:{
    flex:1,
    padding: 16
  }, containerLight: {
    backgroundColor: "#e0dddc",
  },
  containerDark: {
    backgroundColor: "black",
  },
  poster:{
    width: widthPoster*1.75,
    height:widthPoster*1.75
  },titleLight: {
    color: "black",
  },
  titleDark: {
    color: "white",
  },
  title:{
    fontSize: 35,
    fontWeight: 'bold',
    paddingBottom: 8
  }
})



