import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Gasolina from './components/Gasolina'
import Alcool from './components/Alcool'
import BtnCalcular from './components/BtnCalcular';
import Resultado from './components/Resultado';
import ImgResultado from './components/ImgResultado';

export default function calcCombustivel() {

  const [gasolina, setGasolina]=useState(0)
  const [alcool, setAlcool]=useState(0)
  const [resultado, setResultado]=useState('')

  const calcular = () => {
    if(!gasolina){
      alert('Por favor, informe o preço da gasolina!')
      return
    }
    if(!alcool){
      alert('Por favor, informe o preço do Etanol!')
      return
    }
    let res;
    let calc=((alcool/gasolina)*100).toFixed(1);
    if (calc > 70){
      res="Gasolina";
    }else{
      res="Alcool";
    }
    alert('O Etanol está custando ' + calc + '% da Gasolina. Portanto é melhor abastecer com ' + res);
    setResultado(res)
  }

  const limparResultado = () => {
    setResultado('');
  }

  const setarGasolina = (v) => {
    limparResultado();
    setGasolina(v);
  }

  const setarAlcool = (v) => {
    limparResultado();
    setAlcool(v);
  }
  
  return(
    <SafeAreaView style={styles.sectionContainer}>
      <Alcool aoModificar={setarAlcool}/>
      <Gasolina aoModificar={setarGasolina}/>
      <BtnCalcular aoPressionar={calcular}/>
      <Resultado resultado={resultado}/>
      <ImgResultado combustivel={resultado.charAt(0)}/>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


