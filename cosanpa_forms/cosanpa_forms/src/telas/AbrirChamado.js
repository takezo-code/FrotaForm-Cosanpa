// src/telas/AbrirChamado.js
import React, { useState, useContext, useEffect } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  View
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ChamadosContext } from '../contexto/ChamadosContext';
import { styles } from '../estilos/estilos';
import formatarCPF from '../utils/formatarCPF';
import BotaoCombustivel from '../componentes/BotaoCombustivel';

export default function AbrirChamado({ navigation }) {
  const { adicionarChamado } = useContext(ChamadosContext);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [combustivel, setCombustivel] = useState('');
  const [kmInicial, setKmInicial] = useState('');
  const [fotoKmInicial, setFotoKmInicial] = useState(null);
  const [valido, setValido] = useState(false);

  useEffect(() => {
    setValido(
      nome &&
      cpf.length === 14 &&
      placa &&
      marca &&
      modelo &&
      combustivel &&
      kmInicial &&
      fotoKmInicial
    );
  }, [nome, cpf, placa, marca, modelo, combustivel, kmInicial, fotoKmInicial]);

  const tirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir o uso da câmera.');
      return;
    }
    const res = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.5 });
    if (!res.canceled) setFotoKmInicial(res.assets[0].uri);
  };

  const handleEnviar = () => {
    const chamado = {
      id: Date.now(),
      nome,
      cpf,
      placa,
      marca,
      modelo,
      combustivel,
      kmInicial,
      fotoKmInicial,
      finalizado: false,
    };
    adicionarChamado(chamado);
    navigation.navigate('Chamados Abertos');
  };

  const tipos = ['Gasolina', 'Etanol', 'Diesel', 'GNV'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Abrir Chamado</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        placeholder="Digite seu nome"
        onChangeText={(texto) => {
          const textoFiltrado = texto.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
          setNome(textoFiltrado);
        }}
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        value={cpf}
        placeholder="Digite seu CPF"
        onChangeText={(t) => setCpf(formatarCPF(t))}
        keyboardType="numeric"
        maxLength={14}
      />

      <Text style={styles.label}>Placa</Text>
      <TextInput style={styles.input} value={placa} onChangeText={setPlaca} 
      placeholder="Digite a placa do veículo"
      />
      
      <Text style={styles.label}>Marca</Text>
      <TextInput style={styles.input} value={marca} onChangeText={setMarca} 
      placeholder="Digite a marca do veículo"
      />

      <Text style={styles.label}>Modelo</Text>
      <TextInput style={styles.input} value={modelo} onChangeText={setModelo} 
      placeholder="Digite o modelo do veículo"
      />

      <Text style={styles.sectionTitle}>Combustível</Text>
      <View style={styles.fuelContainer}>
        {tipos.map((tipo) => (
          <BotaoCombustivel
            key={tipo}
            tipo={tipo}
            selecionado={combustivel === tipo}
            aoSelecionar={setCombustivel}
          />
        ))}
      </View>

      <Text style={styles.label}>KM Inicial</Text>
      <TextInput
        style={styles.input}
        value={kmInicial}
        onChangeText={setKmInicial}
        keyboardType="numeric"
        placeholder="Digite o KM INICIAL"
      />

      <Button title="Tirar Foto KM Inicial" onPress={tirarFoto} color="#0249e3" />
      {fotoKmInicial && <Image source={{ uri: fotoKmInicial }} style={styles.imagePreview} />}

      <TouchableOpacity
        onPress={handleEnviar}
        disabled={!valido}
        style={{
          marginTop: 20,
          backgroundColor: valido ? '#0249e3' : '#ccc',
          padding: 15,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
