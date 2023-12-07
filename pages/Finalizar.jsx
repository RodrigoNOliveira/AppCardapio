import { View, Text, StyleSheet, TouchableOpacity ,ScrollView,Image, Dimensions, TextInput, KeyboardAvoidingView, Platform} from "react-native";
import React, {useState, useEffect } from 'react';
import * as Linking from 'expo-linking';
import { cpf } from 'cpf-cnpj-validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

let widthScreen = Dimensions.get("window").width;

export default function ListaPizzas({navigation, route}){
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [numeroCasa, setNumeroCasa] = useState('');
    const [complemento, setComplemento] = useState('');
    const [referencia, setReferencia] = useState('');
    const [isButtonEnabled, setButtonEnabled] = useState(false);
    let listaPedido = route.params.orderList;
    let tamanhoNome= '';
    let totalValue = route.params.totalValue;
    let darkTheme = route.params.darkTheme;
    const [cpfT, setCpf] = useState('');
    const mainNavigation = useNavigation();


    const saveUserData = async () => {
      try {
        const userData = {
          nome,
          cpfT,
          telefone,
          endereco,
          bairro,
          numeroCasa,
          complemento,
          referencia,
        };
  
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    };


    const loadUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userData');
  
        if (storedData) {
          const userData = JSON.parse(storedData);
          setNome(userData.nome);
          setCpf(userData.cpfT);
          setTelefone(userData.telefone);
          setEndereco(userData.endereco);
          setBairro(userData.bairro);
          setNumeroCasa(userData.numeroCasa);
          setComplemento(userData.complemento);
          setReferencia(userData.referencia);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
  
    useEffect(() => {
      loadUserData();
    }, []);
  

const formatCpf = (text) => {
    const cleanedText = text.replace(/\D/g, '');
    const formattedCpf = cleanedText.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    setCpf(formattedCpf);
};

const formatarTelefone = (input) => {
    const numericInput = input.replace(/\D/g, '');
    
    if (numericInput.length <= 10) {
      return numericInput.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      return numericInput.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
};
const handleTelefoneChange = (text) => {
    const formattedTelefone = formatarTelefone(text);
    setTelefone(formattedTelefone);
    
};



const sendWhatsAppMessage = () => {
    const phoneNumber = '5534998138165'; // Substitua pelo número de telefone desejado, incluindo o código do país (por exemplo, 55 para o Brasil)
    let message = `*Olá, quero fazer um pedido:*\n\n*Nome:* ${nome}\n*CPF:* ${cpfT}\n*Telefone:* ${telefone}\n*Endereço:* ${endereco}\n*Bairro:* ${bairro}\n*Número da casa:* ${numeroCasa}\n*Complemento:* ${complemento}\n*Referência:* ${referencia}\n\n`;
    listaPedido.forEach((item, index) => {
      let bebidasText = '';
      
      if (item.bebidas.length > 0) {
        bebidasText = item.bebidas.map((bebida) => `\n- ${bebida.sabor}`).join('');
      } else {
        bebidasText = '\n- Nenhuma bebida adicionada';
      }
  
      switch (item.valorTamanho) {
        case 40:
          tamanhoNome = 'Pequena';
          break;
        case 50:
          tamanhoNome = 'Média';
          break;
        case 60:
          tamanhoNome = 'Grande';
          break;
        case 70:
          tamanhoNome = 'Gigante';
          break;
      }
  
      message += `\n*Pedido ${index + 1}:*\n\n*Sabor:* ${item.pizza}\n*Tamanho:* ${tamanhoNome}\n*Borda:* ${item.borda.sabor}\n*Bebidas:* ${bebidasText}\n*Valor:* ${item.valor},00.\n\n\n`;
    });

    message += `*Valor Total:* R$${totalValue},00`

    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.openURL(url)
      .then((data) => {
        console.log('WhatsApp Aberto:', data);
      })
      .catch(() => {
        console.log('Erro ao abrir o WhatsApp');
      });
  };


  const areRequiredFieldsFilled = () => {
    // Adicione os campos obrigatórios aqui (exceto complemento)
    return nome.trim() !== '' && cpfT.trim() !== '' && telefone.trim() !== '' && endereco.trim() !== '' && bairro.trim() !== '' && numeroCasa.trim() !== '';
  };

  const handleContinue = () => {
    if (!areRequiredFieldsFilled()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      setButtonEnabled(false);
      return;
    }

    if (!cpf.isValid(cpfT)) {
      alert('Por favor, forneça um CPF válido.');
      setButtonEnabled(false);
      return;
    }


    setButtonEnabled(true);
    sendWhatsAppMessage();
    saveUserData();
    mainNavigation.reset({
      index: 0,
      routes: [{ name: 'ListaPizzas' }],
  });
  };
  useEffect(() => {
    setButtonEnabled(areRequiredFieldsFilled() && cpf.isValid(cpfT));
  }, [nome, telefone, endereco, bairro, numeroCasa, cpfT]);



const container = darkTheme
? [styles.container, styles.containerDark]
: [styles.container, styles.containerLight];


    const containerBox = darkTheme
    ? [styles.containerBox, styles.containerBoxDark]
    : [styles.containerBox, styles.containerBoxLight];

    const title = darkTheme ? [styles.title, styles.titleDark] : [styles.title, styles.titleLight];
    const textBox = darkTheme ? [styles.textBox, styles.textBoxDark] : [styles.textBox, styles.textBoxLight];

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
    <ScrollView keyboardShouldPersistTaps="handled" style={containerBox}>
      <View style={container}>
      <Image style={styles.poster} source={require('../assets/icone-pizzaT.png')} />
      
        <View style={styles.containerPai}>
        <View style={styles.container}>
            <Text style={title}>Insira os seus Dados </Text>
            <View style={styles.box}>
              <Text style={title}>Nome: <Text style={styles.requiredIndicator}>*</Text></Text>
              <TextInput
                style={textBox}
                placeholder="Fulano de Tal"
                onChangeText={newText => setNome(newText)}
                placeholderTextColor="white"
                value={nome}
              />
            </View>
            <View style={styles.box}>
              <Text style={title}>CPF: <Text style={styles.requiredIndicator}>*</Text></Text>
              <TextInput
                style={textBox}
                keyboardType="numeric"
                placeholder="000.000.000-00"
                value={cpfT}
                onChangeText={formatCpf}
                maxLength={14} 
                placeholderTextColor="white"
              />
            </View>
            <View style={styles.box}>
              <Text style={title}>Telefone: <Text style={styles.requiredIndicator}>*</Text></Text>
              <TextInput
                style={textBox}
                placeholder="(XX)X XXXX-XXXX"
                keyboardType="numeric"
                value={telefone}
                onChangeText={handleTelefoneChange}
                placeholderTextColor="white"
              />
            </View>
            <View style={styles.box}>
              <Text style={title}>Endereço: <Text style={styles.requiredIndicator}>*</Text></Text>
              <TextInput
                style={textBox}
                placeholder="Ex: Avenida das Rosas"
                onChangeText={newText => setEndereco(newText)}
                value={endereco}
                placeholderTextColor="white"
              />
            </View>
            <View style={styles.box}>
              <Text style={title}>Bairro: <Text style={styles.requiredIndicator}>*</Text></Text>
              <TextInput
                style={textBox}
                placeholder="Ex: Centro"
                onChangeText={newText => setBairro(newText)}
                value={bairro}
                placeholderTextColor="white"
              />
            </View>
            <View style={styles.box}>
              <Text style={title}>Número da Casa: <Text style={styles.requiredIndicator}>*</Text></Text>
              <TextInput
                style={textBox}
                placeholder="Ex: 1358"
                onChangeText={newText => setNumeroCasa(newText)}
                value={numeroCasa}
                placeholderTextColor="white"
              />
            </View>
            <View style={styles.box}>
              <Text style={title}>Complemento: </Text>
              <TextInput
                style={textBox}
                placeholder="Ex: Apartamento 2"
                onChangeText={newText => setComplemento(newText)}
                value={complemento}
                placeholderTextColor="white"
              />
            </View>
            <View style={styles.box}>
              <Text style={title}>Referência: </Text>
              <TextInput
                style={textBox}
                placeholder="Ex: Perto do Hospital"
                onChangeText={newText => setReferencia(newText)}
                value={referencia}
                placeholderTextColor="white"
              />
            </View>
        </View>
        </View>
      </View> 

      <TouchableOpacity
            style={[
              styles.botao,
              { backgroundColor: isButtonEnabled ? '#f4511e' : 'gray' },
            ]}
            onPress={handleContinue}
          >
            <Text style={styles.btTitle}>Finalizar Compra</Text>
          </TouchableOpacity>

    


    </ScrollView>
    </KeyboardAvoidingView>
  )
}

let widthPoster = (widthScreen -64 - 16)/2.5

let styles = StyleSheet.create({
  containerBox: {
    flex: 1,
    padding: 8,
    backgroundColor: '#e0dddc',
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
  requiredIndicator: {
    color: 'red',
    marginRight: 20, // Ajuste conforme necessário
  },
  textBox:{
    fontSize: 18,
    color: "white",
    textAlign: "auto",
    width: widthPoster*1.5,
    marginLeft: 8
  },
  botao1:{
    backgroundColor: '#faae96',
    borderRadius: 20,
    alignItems: 'center',
    margin: 8,
    marginLeft: 48,
    marginRight: 48,
    height: widthPoster * 0.5,
    justifyContent: "center"
  },titleDark: {
    color: "white"
  },
  titleLight: {
    color: "black"
  },
  btTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "white",
    alignItems: 'center',
  },
  container:{
    display: "flex",
    padding:16,

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
    flexDirection: 'column',
    // justifyContent:'space-between',
    alignItems:'center',
    textAlign: "auto"
  },
  
  box:{
    marginTop:16,
    flex:1,
    backgroundColor: '#faae96',
    borderRadius: 20,
    padding:16, 
    alignItems: 'center',
    marginBottom: 8, 
    flexDirection: "row",
    justifyContent: "flex-start",
    width: widthPoster*2.5
  },
  poster:{
    width: widthPoster*0.5,
    height:widthPoster*0.5
  }, 
  title:{
    flexWrap: "wrap",
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: "auto"
  },
  text:{
    flexWrap: "wrap"
  }
})