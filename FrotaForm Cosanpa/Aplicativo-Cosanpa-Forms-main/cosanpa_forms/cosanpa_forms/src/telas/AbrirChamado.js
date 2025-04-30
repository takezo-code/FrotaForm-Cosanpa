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

export default function AbrirChamado({ navigation }) {
  const { adicionarChamado } = useContext(ChamadosContext);

  const [matricula, setMatricula] = useState('');
  const [nome, setNome] = useState('');
  const [vinculo, setVinculo] = useState('');
  const [placa, setPlaca] = useState('');
  const [tipoVeiculo, setTipoVeiculo] = useState('');
  const [modelo, setModelo] = useState('');
  const [fabricante, setFabricante] = useState('');
  const [contrato, setContrato] = useState('');
  const [tipoFrota, setTipoFrota] = useState('');
  const [kmInicial, setKmInicial] = useState('');
  const [fotoKmInicial, setFotoKmInicial] = useState(null);
  const [valido, setValido] = useState(false);

  const tiposDeFrota = ['Locada', 'Própria'];

  useEffect(() => {
    setValido(
      matricula &&
      nome &&
      vinculo &&
      placa &&
      tipoVeiculo &&
      modelo &&
      fabricante &&
      contrato &&
      tipoFrota &&
      kmInicial &&
      fotoKmInicial
    );
  }, [
    matricula, nome, vinculo, placa, tipoVeiculo, modelo,
    fabricante, contrato, tipoFrota, kmInicial, fotoKmInicial
  ]);

  const tirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir o uso da câmera.');
      return;
    }
    const res = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });
    if (!res.canceled) {
      setFotoKmInicial(res.assets[0].uri);
    }
  };

  const handleEnviar = () => {
    const chamado = {
      id: Date.now(),
      matricula,
      nome,
      vinculo,
      placa,
      tipoVeiculo,
      modelo,
      fabricante,
      contrato,
      tipoFrota,
      kmInicial,
      fotoKmInicial,
      finalizado: false,
    };
    adicionarChamado(chamado);
    navigation.navigate('Chamados Abertos');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulário 📝</Text>

      {/* Informações Pessoais */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Informações Pessoais🧑🏼</Text>

        <Text style={styles.label}>Matrícula</Text>
        <TextInput
          style={styles.input}
          value={matricula}
          placeholder="Digite sua matrícula"
          onChangeText={setMatricula}
        />

        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={styles.input}
          value={nome}
          placeholder="Digite seu nome completo"
          onChangeText={(texto) => setNome(texto.replace(/[^A-Za-zÀ-ÿ\s]/g, ''))}
        />

        <Text style={styles.label}>Vínculo</Text>
        <TextInput
          style={styles.input}
          value={vinculo}
          placeholder="Digite seu vínculo"
          onChangeText={setVinculo}
        />
      </View>

      {/* Veículo e Viagem */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Veículo e Viagem 🚙🧳</Text>

        <Text style={styles.label}>Placa</Text>
        <TextInput
          style={styles.input}
          value={placa}
          placeholder="Digite a placa do veículo"
          onChangeText={setPlaca}
        />

        <Text style={styles.label}>Tipo de Veículo</Text>
        <TextInput
          style={styles.input}
          value={tipoVeiculo}
          placeholder="Digite o tipo de veículo"
          onChangeText={setTipoVeiculo}
        />

        <Text style={styles.label}>Modelo</Text>
        <TextInput
          style={styles.input}
          value={modelo}
          placeholder="Digite o modelo do veículo"
          onChangeText={setModelo}
        />

        <Text style={styles.label}>Fabricante</Text>
        <TextInput
          style={styles.input}
          value={fabricante}
          placeholder="Digite o fabricante do veículo"
          onChangeText={setFabricante}
        />

        <Text style={styles.label}>Contrato</Text>
        <TextInput
          style={styles.input}
          value={contrato}
          placeholder="Digite o contrato"
          onChangeText={setContrato}
        />
      </View>

      {/* Tipo de Frota */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Tipo de Frota 🛣️</Text>
        <View style={styles.fuelContainer}>
          {tiposDeFrota.map((tipo) => (
            <TouchableOpacity
              key={tipo}
              onPress={() => setTipoFrota(tipo)}
              style={{
                backgroundColor: tipoFrota === tipo ? '#0249e3' : '#ccc',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 20,
                margin: 5,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>{tipo}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quilometragem */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Quilometragem ⏱️</Text>

        <Text style={styles.label}>Quilometragem Inicial</Text>
        <TextInput
          style={styles.input}
          value={kmInicial}
          placeholder="Digite a quilometragem inicial"
          onChangeText={setKmInicial}
          keyboardType="numeric"
        />

        <Button title="Tirar Foto KM Inicial" onPress={tirarFoto} color="#0249e3" />
        {fotoKmInicial && <Image source={{ uri: fotoKmInicial }} style={styles.imagePreview} />}
      </View>

      {/* Botão Enviar */}
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
