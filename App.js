import { Text, SafeAreaView, StyleSheet } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from  "@react-navigation/stack";


import ListaPizzas from "./pages/ListaPizzas.jsx"
import Pizza from "./pages/Pizza.jsx"
import TipoPizza from "./pages/TipoPizza.jsx"
import TamanhosPizzas from "./pages/Tamanhos.jsx"
import Adicionais from "./pages/Adicionais.jsx"
import Metade from "./pages/Metade.jsx"
import Meia from "./components/Meia.jsx"
import Carrinho from "./pages/Carrinho.jsx"
import Finalizar from "./pages/Finalizar.jsx"


let Stack = createStackNavigator();

 export default function App() {
   return(

    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaPizzas">

      <Stack.Screen 
          name="TipoPizza"
          component={TipoPizza}
          options={{
            title:"Tipo da Pizza",
            headerStyle:{
              backgroundColor: "#f4511e"
            },
            headerTintColor:"#fff",
            headerTitleStyle:{
              fontWeight: "bold"
            },
            headerIconColor:"#ff2"
          }}
        />
        <Stack.Screen 
          name="carrinhoPage"
          component={Carrinho}
          options={{
            title:"Carrinho",
            headerStyle:{
              backgroundColor: "#f4511e"
            },
            headerTintColor:"#fff",
            headerTitleStyle:{
              fontWeight: "bold"
            },
            headerIconColor:"#ff2",
            headerLeft: () => null,
          }}
        />


        <Stack.Screen 
          name="adicionaisPage"
          component={Adicionais}
          options={{
            title:"Adicionais",
            headerStyle:{
              backgroundColor: "#f4511e"
            },
            headerTintColor:"#fff",
            headerTitleStyle:{
              fontWeight: "bold"
            },
            headerIconColor:"#ff2"
          }}
        />


        <Stack.Screen 
          name="ListaPizzas"
          component={ListaPizzas}
          options={{
            title:"Pizzas",
            headerStyle:{
              backgroundColor: "#f4511e"
            },
            headerTintColor:"#fff",
            headerTitleStyle:{
              fontWeight: "bold"
            },
            headerIconColor:"#ff2"
          }}
        />

      

        <Stack.Screen 
          name="MetadePage"
          component={Metade}
          options={{
            title:"Selecione o Segundo Sabor",
            headerStyle:{
              backgroundColor: "#f4511e"
            },
            headerTintColor:"#fff",
            headerTitleStyle:{
              fontWeight: "bold"
            },
            headerIconColor:"#ff2"
          }}
        />

        <Stack.Screen 
          name="FinalizarPage"
          component={Finalizar}
          options={{
            title:"Finalizar",
            headerStyle:{
              backgroundColor: "#f4511e"
            },
            headerTintColor:"#fff",
            headerTitleStyle:{
              fontWeight: "bold"
            },
            headerIconColor:"#ff2"
          }}
        />


        <Stack.Screen 
          name="tamanhosPage"
          component={TamanhosPizzas}
          options={{
            title:"Tamanho da Pizza",
            headerStyle:{
              backgroundColor: "#f4511e"
            },
            headerTintColor:"#fff",
            headerTitleStyle:{
              fontWeight: "bold"
            },
            headerIconColor:"#ff2"
          }}
        />

         <Stack.Screen 
          name="PizzaPage"
          component={Pizza}
          options={{
            title:"Pizza",
            headerStyle:{
              backgroundColor: "#f4511e"
            },
            headerTintColor:"#fff",
            headerTitleStyle:{
              fontWeight: "bold"
            },
            headerIconColor:"#ff2"
          }}
        />

        <Stack.Screen 
          name="Meia"
          component={Meia}
          options={{
            title:"Pizza",
            headerStyle:{
              backgroundColor: "#f4511e"
            },
            headerTintColor:"#fff",
            headerTitleStyle:{
              fontWeight: "bold"
            },
            headerIconColor:"#ff2"
          }}
        />


      </Stack.Navigator>
    </NavigationContainer>
    //  <SafeAreaView style={{flex:1}}>
    //     <FirstPage/>
    //  </SafeAreaView>
   )
 }

/*
   <Stack.Screen 
          name="ElencoPage"
          component={Elenco}
          options={{
            title:"Elenco",
            headerStyle:{
              backgroundColor: "#f4511e"
            },
            headerTintColor:"#fff",
            headerTitleStyle:{
              fontWeight: "bold"
            },
            headerIconColor:"#ff2"
          }}
        />*/