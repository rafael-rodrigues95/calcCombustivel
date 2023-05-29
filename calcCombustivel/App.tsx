import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  Button,
  FlatList,
  Text
} from 'react-native';
import Gasolina from './components/Gasolina';
import Alcool from './components/Alcool';
import BtnCalcular from './components/BtnCalcular';
import Resultado from './components/Resultado';
import ImgResultado from './components/ImgResultado';
import { openDatabase } from 'react-native-sqlite-storage';

export default function calcCombustivel() {
  const [gasolina, setGasolina] = useState(0);
  const [alcool, setAlcool] = useState(0);
  const [resultado, setResultado] = useState('');

  const calcular = () => {
    if (!gasolina) {
      alert('Por favor, informe o preço da gasolina!');
      return;
    }
    if (!alcool) {
      alert('Por favor, informe o preço do Etanol!');
      return;
    }
    let res;
    let calc = ((alcool / gasolina) * 100).toFixed(1);
    if (calc > 70) {
      res = 'Gasolina';
    } else {
      res = 'Alcool';
    }
    alert(
      'O Etanol está custando ' +
        calc +
        '% da Gasolina. Portanto é melhor abastecer com ' +
        res,
    );
    setResultado(res);
  };

  const limparResultado = () => {
    setResultado('');
  };

  const setarGasolina = v => {
    limparResultado();
    setGasolina(v);
  };

  const setarAlcool = v => {
    limparResultado();
    setAlcool(v);
  };

  // Manipulação do Banco

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const db = openDatabase({
    name: "rn_sqlite"
  })

  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20))`,
        [],
        (sqlTxn, res) => {
          console.log("table created successfully");
        },
        error => {
          console.log("Error on creating table " + error.message);
        },
      );
    });
  }
  
  const addCategory = () => {
    if (!category){
      alert("Enter category");
      return false;
    }
    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO categories (name) VALUES (?)`,
        [category],
        (sqlTxn, res) => {
          console.log(`${category} category added successfully`);
          getCategories();
          setCategory("");
        },
        error => {
          console.log('error on adding category ' + error.message)
        },
      );
    });
  };

  const getCategories = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM categories ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log("categories retrieve successfully");
          let len = res.rows.length;

          if (len > 0){
            let results = [];
            for (let i =0; i < len; i++){
              let item = res.rows.item(i);
              results.push({ id: item.id, name: item.name});
            }
            setCategories(results);
          }
        },
        error => {
          console.log("error on getting categories " + error.message);
        }
      )
    })
  }

  const renderCategory = ({item}) => {
    return(
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#000"
        }}
      >
        <Text></Text>
        <Text style={{marginRight: 9}}>{item.id}</Text>
        <Text>{item.name}</Text>
      </View>
    )
  }

  useEffect( async () => {
    await createTables();
    await getCategories();
  }, [])

  

  // --------------------

  return (
    <ScrollView style={styles.sectionContainer}>
      <Alcool aoModificar={setarAlcool} />
      <Gasolina aoModificar={setarGasolina} />
      <BtnCalcular aoPressionar={calcular} />
      <Resultado resultado={resultado} />
      <ImgResultado combustivel={resultado.charAt(0)} />

      {/* Manipulação do BD*/}
      <TextInput 
        placeholder="Digite a categoria" 
        value={category}
        onChangeText={setCategory}
      />
      <Button title="Envivar" onPress={addCategory}/>
      <FlatList 
        data={categories}
        renderItem={renderCategory}
        key={cat => cat.id}
      />
    </ScrollView>
    
  );
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
